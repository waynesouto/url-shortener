import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const fetchUrl = new Elysia().get(
  "/:uniqueId",
  async ({ params, set }) => {
    const { uniqueId } = params;

    console.log("test");

    const url = await db.query.urls.findFirst({
      where(fields, { eq }) {
        return eq(fields.uniqueId, uniqueId);
      },
    });

    if (!url) {
      set.status = 404;
      return {
        message: "Page not found",
      };
    }

    set.status = 301;
    set.redirect = url.longUrl;
  },
  {
    params: t.Object({
      uniqueId: t.String(),
    }),
  }
);
