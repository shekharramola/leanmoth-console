import { Hono } from "hono";
declare const app: Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
declare const skeletonRoutes: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/api/skeleton": {
        $get: {
            output: {
                status: string;
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
            input: {};
        };
    };
}, "/", "/api/skeleton">;
export type AppType = typeof skeletonRoutes;
export default app;
