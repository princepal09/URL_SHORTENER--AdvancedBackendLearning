import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
export const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number()
});
//# sourceMappingURL=env.config.js.map