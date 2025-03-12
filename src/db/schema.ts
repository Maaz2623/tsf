import { sql } from "drizzle-orm";
import {
  date,
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

export const roleType = pgEnum("role_enum", ["admin", "moderator", "user"]);
export const festType = pgEnum("fest_enum", ["elysian", "solaris"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").unique().notNull().defaultRandom().primaryKey(),
    email: text("email").unique().notNull(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    role: roleType().notNull().default("user"),
    phoneNumber: text("phone_number"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]
);

export const tickets = pgTable("tickets", {
  ticketId: uuid("id").unique().notNull().defaultRandom().primaryKey(),
  status: ticketStatus().notNull(),
  paymentScreentshotUrl: text("payment_screenshot_url").notNull().default(""),
  events: jsonb("events").notNull().$type<EventType[]>(),
  festType: festType().notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  collegeName: text("college_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contingents = pgTable("contingents", {
  id: uuid("id").unique().notNull().defaultRandom().primaryKey(),
  status: ticketStatus().notNull(),
  validTill: date()
    .default(sql`CURRENT_DATE + INTERVAL '1 year'`)
    .notNull(),
  collegeName: text("college_name").notNull(),
  paymentScreentshotUrl: text("payment_screenshot_url").notNull().default(""),
  events: jsonb("events").notNull().$type<EventType[]>(),
  festType: festType().notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
