import { Hono } from "hono";
declare const app: Hono<
  {
    Bindings: CloudflareBindings;
  },
  import("hono/types").BlankSchema,
  "/"
>;
declare const routes: import("hono/hono-base").HonoBase<
  {
    Bindings: CloudflareBindings;
  },
  | import("hono/types").BlankSchema
  | import("hono/types").MergeSchemaPath<
      {
        "/": {
          $get: {
            input: {};
            output: {
              status: "success" | "error";
              message: string;
              databaseMetricRow?: string | undefined;
            };
            outputFormat: "json";
            status: 200 | 500;
          };
        };
      },
      "/api/skeleton"
    >,
  "/",
  "/"
>;
export type AppType = typeof routes;
export default app;
