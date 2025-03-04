import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const ticketStatus = pgEnum("ticket_status", [
  "pending",
  "processing",
  "verified",
  "rejected",
]);

export const tickets = pgTable(
  "tickets",
  {
    ticketId: uuid("id").unique().notNull().defaultRandom().primaryKey(),
    status: ticketStatus().notNull().default("pending"),
    paymentScreentshotUrl: text("payment_screenshot_url").notNull().default(""),
    events: jsonb("events").notNull().$type<EventType[]>(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("email_id_idx").on(t.email)]
);
