import cors from "@elysiajs/cors";
import * as dotenv from "dotenv";
import Elysia from "elysia";
import { fetchUrl } from "./routes/fetch-url";
import { shortenUrl } from "./routes/shorten-url";
import { env } from "@/env";
dotenv.config();

const app = new Elysia()
  .use(
    cors({
      origin: "*",
    })
  )
  .use(shortenUrl)
  .use(fetchUrl)
  .get("/health", () => "health check")
  .onError(({ code, error, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status;

        console.log({ error });

        return error.toResponse();
      }
      case "NOT_FOUND": {
        return new Response(null, { status: 404 });
      }
      default: {
        console.error(error);

        return new Response(null, { status: 500 });
      }
    }
  });

app.listen(
  env.PORT || 3000,
  () => console.log(`🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`)
);
