"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat();

  console.log("messages:", messages);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="text-center py-6 border-b">
        <h1 className="text-3xl font-bold mb-2">AI Database Chat</h1>

        <p className="text-gray-600">MongoDB + AI SDK</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-900  break-words  overflow-wrap-anywhere "
                }`}
              >
                {message.parts.map((part, index) => {
                  switch (part.type) {
                    // AI text
                    case "text":
                      return <span key={index}>{part.text}</span>;

                    // Database tool
                    case "tool-database":
                      return null;

                    // Movie data tool  
                    case "tool-movieData":
                      return  null;
case "tool-joke":
  return null;
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!input.trim()) return;

            sendMessage({
              text: input,
            });

            setInput("");
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex space-x-2">
            <input
              className="flex-1 p-3 border rounded-lg"
              value={input}
              placeholder="Ask about movies or users..."
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              className="px-4 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
