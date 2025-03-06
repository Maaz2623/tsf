"use server";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function generateUniqueHex(): Promise<string> {
  while (true) {
    const hex = crypto.randomBytes(3).toString("hex");

    const exists = await db
      .select()
      .from(tickets)
      .where(eq(tickets.orderId, hex))
      .limit(1);

    if (exists.length === 0) {
      return hex.toLocaleUpperCase(); // Unique hex found
    }
  }
}
