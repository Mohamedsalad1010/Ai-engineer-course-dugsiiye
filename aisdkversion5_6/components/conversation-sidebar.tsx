"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface conversation {
  id: string;
  title: string;
}

interface ConversationSidebarProps {
  conversations: conversation[];
}

export default function ConversationSidebar({
  conversations,
}: ConversationSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">
          {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">
          Conversations
        </h2>
      </div>
      {/* new chat */}
      <div className="p-3">
        <Link href="/chat">
          <Button className="w-full bg-rose-500 hover:bg-rose-600">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </Link>
      </div>

{/* conversions */}
       <div className="flex-1 overflow-y-auto px-2">
  
        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500 p-3">
            No conversations yet.
          </p>
        ) :(
            <div className="space-y-1">
               {
                conversations.map((conversation) =>{
                      const isActive =  pathname === `/chat/${conversation.id}`

                      return(
                        <Link href={`/chat/${conversation.id} `} key={conversation.id}  className={`
                    flex items-center gap-3
                    px-3 py-2
                    rounded-lg
                    text-sm
                    transition
                    ${
                      isActive
                        ? "bg-rose-100 text-rose-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}>

                    <MessageSquare
                    className="w-4 h-4 shrink-0"
                  />
                  <span className="truncate">
                    {conversation.title}
                  </span>

                        </Link>
                      )
                })
               }
            </div>
        )
    }

       </div>
    </aside>
  );
}
