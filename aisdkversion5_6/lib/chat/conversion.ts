//  create conversion

import { db } from "@/db/drizzle";
import { conversion } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function createConversion(userId: string, title?: string) {
  const conversionId = nanoid();

  await db.insert(conversion).values({
    id: conversionId,
    title: title || "new conversion",
    userId: userId,
  });
  return conversionId;
}

// get all conversion by userId
export async function getAllConversionByUserId(userId: string) {
  return await db
    .select()
    .from(conversion)
    .where(eq(conversion.userId, userId))
    .orderBy(desc(conversion.createdAt));
}

// get conversion by id
export async function getConversionById(conversionId: string, userId: string) {
  const conversionData = await db
    .select()
    .from(conversion)
    .where(and(eq(conversion.id, conversionId), eq(conversion.userId, userId)))
    .limit(1);

  const result = conversionData[0];
  console.log("result", result);

  // No conversion found
  if (!result) {
    return null;
  }

  return result;
}

export async function updateConversionTitle(conversionId: string,userId: string,  title: string,) {
  await db
    .update(conversion)
    .set({
      title: title,
    })
    .where(and(eq(conversion.id, conversionId), eq(conversion.userId, userId)));
}
