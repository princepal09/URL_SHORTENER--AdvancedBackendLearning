import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodString;
    PORT: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
//# sourceMappingURL=env.config.d.ts.map