import { Hono } from "hono";
import { healthRoutes } from "./routes/health";

export const app = new Hono();

app.onError((error, c) => {
  console.error(error);

  return c.json(
    {
      error: "Internal Server Error",
    },
    500,
  );
});

app.notFound((c) => {
  return c.json(
    {
      error: "Not Found",
    },
    404,
  );
});

app.route("/api/health", healthRoutes);
