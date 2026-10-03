import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();
const parsePort = (value) => {
    const port = Number(value ?? 4000);
    if (!Number.isInteger(port) || port <= 0 || port > 65535) {
        throw new Error("PORT must be a number between 1 and 65535.");
    }
    return port;
};
const port = parsePort(process.env.PORT);
const server = app.listen(port, () => {
    console.log(`URL shortener API is running on http://localhost:${port}`);
});
const shutdown = (signal) => {
    console.log(`${signal} received. Closing server...`);
    server.close((error) => {
        if (error) {
            console.error("Failed to close server cleanly:", error);
            process.exit(1);
        }
        process.exit(0);
    });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
//# sourceMappingURL=index.js.map