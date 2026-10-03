import express from "express";
import helmet from "helmet";
const app = express();

app.use(helmet());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "API IS WOKING FINE",
  });
});

export default app;
