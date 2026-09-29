import { loadChat, saveChat, updateConversionTitle } from "@/lib/chat";
import { getUserInfo } from "@/server/user";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, createIdGenerator, streamText, UIMessage, validateUIMessages } from "ai";
import { title } from "process";

export const maxDuration = 30;

// create conversion title 
function createConversationTitle(text: string) {
  const title = text.trim();

  if (!title) {
    return "New conversation";
  }

  if (title.length > 40) {
    return title.substring(0, 40) + "...";
  }

  return title;
}
export async function POST(request: Request) {
  //   check if user exist
  const user = await getUserInfo()
  if(!user){
    return Response.json({error: "unautharizen"} , {status: 401})
  }

// fetch body Data 

try {
    const body = await request.json()
const {messages , message: singleMessage , id: conversionId, } = body

let allMessage: UIMessage[]

if(singleMessage){
    const previosMessages =  await loadChat(conversionId)
    allMessage = [...previosMessages , singleMessage]

    // create  first  only message
    if(previosMessages.length === 0 ){
        const textPart = singleMessage.parts.find((part: any) => part.type === 'text')
        if(textPart?.text){
          const  title = createConversationTitle(textPart.text)
           await updateConversionTitle( conversionId , user.user.id , title)
        }
    }
    
} else if(messages){
    allMessage = messages
}else{
    return Response.json({error: "message are Required"} , {status: 400})
}

// validate messages
let validateMessages:  UIMessage[]
try {
    validateMessages = await validateUIMessages({
        messages: allMessage
    })
    
} catch (error) {
     return Response.json({error: "invalid Message"}, {status: 400})
}

// stream response

const result = streamText({
model  : openai('gpt-4o'),
messages:  await convertToModelMessages(validateMessages),
})

// consome respone

result.consumeStream()

return result.toUIMessageStreamResponse({
    originalMessages: validateMessages,
    generateMessageId: createIdGenerator({
        prefix : 'msg_',
        size: 16
    }),
    onFinish: async ({messages}) =>{
       try {
         await saveChat({chatId: conversionId , messages})
    } catch (error) {
        console.log("error save Chat", error);
       }
} })

} catch (error) {
    console.log("server error " , error);
    return Response.json({error: "server error "  } , {status: 500})
}
}

