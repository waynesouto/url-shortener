import { db } from "@/db/connection";
import { urls } from "@/db/schema";
import Elysia, { t } from "elysia";
import { nanoid } from "nanoid";

export const shortenUrl = new Elysia().post(
  "/shorten",
  async ({ body }) => {
    const { longUrl } = body;

    const urlExists = await db.query.urls.findFirst({
      where(fields, { eq }) {
        return eq(fields.longUrl, longUrl);
      },
    });

    if (urlExists) {
      return {
        shortUrl: urlExists.shortUrl,
      };
    }

    const baseURL = process.env.BASE_URL;

    const uniqueId = nanoid(10);

    const shortUrl = `${baseURL}/${uniqueId}`;

    await db.insert(urls).values({
      shortUrl,
      longUrl,
      uniqueId,
    });

    return {
      shortUrl: shortUrl,
    };
  },
  {
    body: t.Object({
      longUrl: t.String({
        format: "uri",
      }),
    }),
  }
);
