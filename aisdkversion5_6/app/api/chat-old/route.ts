import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from "ai";
import z from "zod";
import { da } from "zod/locales";
import { describe } from "zod/v4/core";
export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();
  const result = streamText({
    model: openai("gpt-4o"),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    system: `You are a helpful assistant that can answer questions and provide information. You have access to a weather tool that can provide the current weather for a given location. and always  Thank you! for asking me to help you with your questions. for every response.`,
    tools: {
      weather: tool({
        description: "get the weather of a given location (fahrenheit)",
        inputSchema: z.object({
          location: z.string().describe("the laction to get the weather for."),
        }),
//         
//             `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.WEATHER_API}`
//           );

//           const data = await response.json();
//         //   console.log("data weather", data);
//            if (!data.length) {
//             throw new Error("Location not found");
//           }
//           const lat = data[0].lat
//           const lon = data[0].lon

// // get the weather data 
//  const weatherResponse = await fetch(
//   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}&units=imperial`
// );
//     const weatherData = await weatherResponse.json()
//   console.log("weather data" , weatherData);
//         return {
//             location: data[0].name,
//             temperature: weatherData.current.temp,
//             feelsLike: weatherData.current.feels_like,
//             humidity: weatherData.current.humidity,
//             description:
//               weatherData.current.weather[0].description,
//           };
//         },
 execute: async ({ location }) => {
        const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API}&units=metric`
);

const data = await response.json();

console.log(data);
          return {
            location,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            describe: data.weather[0].description,
          };
        },

      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
