import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  longUrl: text("long_url").notNull(),
  shortUrl: text("short_url").notNull(),
  uniqueId: text("unique_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
