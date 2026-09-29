"use client";

import { useSession } from "@/lib/auth-client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {Streamdown} from 'streamdown'
import { code } from "@streamdown/code";

interface props {
  initialMessages?: UIMessage[];
  conversionId: string;
  conversationTitle?: string;
}
const Chat = ({ initialMessages, conversionId, conversationTitle }: props) => {
  const router = useRouter();
  const { data: session } = useSession();

 const messageEndRef = useRef<HTMLDivElement> (null)
  const [input , setInput] = useState('')
  const { messages, sendMessage, status, error, stop } = useChat({
    id: conversionId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",

      prepareSendMessagesRequest({ messages, id }) {
        return {
          body: {
            message: messages[messages.length - 1],
            id,
          },
        };
      },
    }),
  });


  const  scrollToButton = ( ) =>{
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }


  useEffect(()=> {
scrollToButton()
  } , [messages , status ])


  // refresh title after updated
  useEffect(() => {
  if (status === "ready") {
    router.refresh();
  }
}, [status, router]);
  if (!session) {
    return null;
  }
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-rose-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-9 w-9 ">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback className=" bg-rose-500 text-white-500 font-medium ">
                {session.user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {conversationTitle || "AI Chat"}
              </h1>
              <p className="text-sm text-rose-500">Chat with AI Assistant</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="border-rose-200 text-rose-600 hover:bg-rose-50"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

{/* messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-500">
                Ask me anything! I'm here to help.
              </p>
            </div>
          )}

          {/* message map */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-2xl ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Avatar className="h-7 w-7 flex-shrink-0">
                  {message.role === "user" ? (
                    <>
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback className="bg-rose-500 text-white text-xs">
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-rose-100">
                      <Bot className="h-3 w-3 text-rose-500" />
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* message content */}

                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-rose-500 text-white"
                      : "bg-gray-50 text-gray-900 border border-gray-100"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {message.parts.map((part , i) => {
                       switch (part.type){
                        case  'text' :
                             return message.role === "assistant" ? (
                              <Streamdown  
                                 plugins={{ code: code }}
                                 parseIncompleteMarkdown= {true}
                                 >
                                {part.text}
                                
                              </Streamdown>
                             ) : (<span>{part.text} </span>)
                       }
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={messageEndRef}/>
      </div>

      {/* input form */}
        <div className="bg-white border-t border-rose-100 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && status === 'ready') {
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex space-x-3">
            <input
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== 'ready'}
            />
            <Button 
              type="submit" 
              disabled={status !== 'ready' || !input.trim()}
              className="px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
