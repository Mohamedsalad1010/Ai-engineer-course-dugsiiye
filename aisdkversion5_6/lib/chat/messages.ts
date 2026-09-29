// loading aspecific conversion

import { db } from "@/db/drizzle";
import {  conversion, message } from "@/db/schema";
import { UIMessage } from "ai";
import { eq } from "drizzle-orm";

export async function loadChat(conversionId:string) : Promise<UIMessage[]> {
      const messages = await db
      .select()
      .from(message)
      .where(eq(message.conversionId , conversionId ))

      return messages.map((message) =>( {
         id: message.id,
         role: message.role as "user" | "assistant",
         parts: [{type: 'text' , text: message.content}],
      } ))
}


// saveChat to database

export async function saveChat({chatId, messages}: { chatId: string, messages: UIMessage[] }) {

      // get conversionId from userId
      const conv = await db
      .select({userId: conversion.userId})
      .from(conversion)
      .where(eq(conversion.id , chatId))
      .limit(1)
     
     if (!conv || conv.length === 0) {
        throw new Error("Conversion not found");
     }

//      get existing messages from database
     const existingMessages = await db
     .select()
     .from(message)
     .where(eq(message.conversionId , chatId))

     const existingMessageIds = existingMessages.map((msg) => msg.id);
     const newMessages = messages.filter((msg) => !existingMessageIds.includes(msg.id));

   if (newMessages.length > 0) {
       const newMessageData = newMessages.map((msg) => {
       const textpart = msg.parts.find((part) => part.type === 'text');
       const content = textpart ? textpart.text : '';
       return {
          id: msg.id,
          role: msg.role,
          content: content,
          userId: conv[0].userId,
          conversionId: chatId
       };
    })
    await db.insert(message).values(newMessageData);
   }

      
}