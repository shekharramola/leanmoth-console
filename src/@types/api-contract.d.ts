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
        "/request-link": {
          $post:
            | {
                input: {};
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 400;
              }
            | {
                input: {};
                output: {
                  sent: true;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
              };
        };
      } & {
        "/verify": {
          $get:
            | {
                input: {};
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 400;
              }
            | {
                input: {};
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 401;
              }
            | {
                input: {};
                output: undefined;
                outputFormat: "redirect";
                status: 302;
              };
        };
      } & {
        "/account/delete": {
          $post: {
            input: {};
            output: {
              deleted: true;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
          };
        };
      } & {
        "/logout": {
          $post: {
            input: {};
            output: {
              loggedOut: true;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
          };
        };
      } & {
        "/me": {
          $get: {
            input: {};
            output: {
              userId: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
          };
        };
      },
      "/api/auth"
    >
  | import("hono/types").MergeSchemaPath<
      {
        "/": {
          $post:
            | {
                input: {};
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 400;
              }
            | {
                input: {};
                output: {
                  reportId: string;
                  awsTotalVolumeGb: number;
                  potentialMonthlySavingsUsd: number;
                  reportPriceInPaise: number;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
              };
        };
      },
      "/api/analyze"
    >
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
    >
  | import("hono/types").MergeSchemaPath<
      {
        "/:id": {
          $get:
            | {
                input: {
                  param: {
                    id: string;
                  };
                };
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 404;
              }
            | {
                input: {
                  param: {
                    id: string;
                  };
                };
                output:
                  | {
                      status: "unpaid";
                      awsTotalVolumeGb: number;
                      potentialMonthlySavingsUsd: number;
                    }
                  | {
                      status: "paid";
                      awsTotalVolumeGb: number;
                      potentialMonthlySavingsUsd: number;
                      findings: {
                        label: string;
                        estimatedMonthlyCostUsd: number;
                        detail: string;
                      }[];
                      comparison:
                        | {
                            label: string;
                            previousReportMonthlyCostUsd: number;
                            currentReportMonthlyCostUsd: number;
                          }[]
                        | null;
                    };
                outputFormat: "json";
                status: 200;
              };
        };
      } & {
        "/": {
          $get: {
            input: {};
            output: {
              reports: {
                id: string;
                paymentStatus: "pending" | "paid";
                awsTotalVolumeGb: number;
                potentialMonthlySavingsUsd: number;
                createdAt: string;
              }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
          };
        };
      },
      "/api/reports"
    >
  | import("hono/types").MergeSchemaPath<
      {
        "/reports/:id/checkout": {
          $post:
            | {
                input: {
                  param: {
                    id: string;
                  };
                };
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 404;
              }
            | {
                input: {
                  param: {
                    id: string;
                  };
                };
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 400;
              }
            | {
                input: {
                  param: {
                    id: string;
                  };
                };
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 502;
              }
            | {
                input: {
                  param: {
                    id: string;
                  };
                };
                output: {
                  checkoutUrl: string;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
              };
        };
      } & {
        "/webhook/razorpay": {
          $post:
            | {
                input: {};
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 400;
              }
            | {
                input: {};
                output: {
                  error: string;
                };
                outputFormat: "json";
                status: 401;
              }
            | {
                input: {};
                output: {
                  received: true;
                };
                outputFormat: "json";
                status: import("hono/utils/http-status").ContentfulStatusCode;
              };
        };
      },
      "/api"
    >,
  "/",
  "/"
>;
export type AppType = typeof routes;
export default app;
