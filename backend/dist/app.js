import crypto from "node:crypto";
import express from "express";
import { z } from "zod";
const urls = new Map();
const createUrlSchema = z.object({
    url: z.string().url("Enter a valid URL."),
    customCode: z
        .string()
        .trim()
        .min(3, "Custom code must be at least 3 characters.")
        .max(32, "Custom code must be 32 characters or fewer.")
        .regex(/^[a-zA-Z0-9_-]+$/, "Use only letters, numbers, hyphens, or underscores.")
        .optional(),
});
export const app = express();
app.set("trust proxy", true);
app.use(express.json({ limit: "10kb" }));
const generateCode = () => crypto.randomBytes(4).toString("base64url");
const buildShortUrl = (req, code) => `${req.protocol}://${req.get("host")}/${code}`;
const healthHandler = (_req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};
const createShortUrlHandler = (req, res) => {
    const parsed = createUrlSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            message: "Invalid request body.",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const code = parsed.data.customCode ?? generateCode();
    if (urls.has(code)) {
        res.status(409).json({ message: "Short code already exists." });
        return;
    }
    const record = {
        code,
        originalUrl: parsed.data.url,
        createdAt: new Date(),
        clicks: 0,
    };
    urls.set(code, record);
    res.status(201).json({
        code,
        originalUrl: record.originalUrl,
        shortUrl: buildShortUrl(req, code),
        createdAt: record.createdAt.toISOString(),
    });
};
const getUrlStatsHandler = (req, res) => {
    const record = urls.get(req.params.code);
    if (!record) {
        res.status(404).json({ message: "Short URL not found." });
        return;
    }
    res.status(200).json({
        code: record.code,
        originalUrl: record.originalUrl,
        shortUrl: buildShortUrl(req, record.code),
        clicks: record.clicks,
        createdAt: record.createdAt.toISOString(),
    });
};
const redirectHandler = (req, res) => {
    const record = urls.get(req.params.code);
    if (!record) {
        res.status(404).json({ message: "Short URL not found." });
        return;
    }
    record.clicks += 1;
    res.redirect(record.originalUrl);
};
const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: `Route ${req.method} ${req.path} not found.`,
    });
};
const errorHandler = (error, _req, res, _next) => {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    res.status(500).json({
        message,
    });
};
app.get("/health", healthHandler);
app.post("/api/shorten", createShortUrlHandler);
app.get("/api/urls/:code", getUrlStatsHandler);
app.get("/:code", redirectHandler);
app.use(notFoundHandler);
app.use(errorHandler);
//# sourceMappingURL=app.js.map