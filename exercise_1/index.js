import OpenAI from 'openai'
import dotenv from 'dotenv'
 import readline from 'readline';
dotenv.config()


// connect openAi Api key client

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
})

// Create terminal input for take topic and question

const inputTake = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Ask the user for a topic

inputTake.question("Enter your topic" , async(topic) =>{
    try {
       console.log(" Generating blog outline...\n");
        
         const stream = await openai.responses.create({
            model: 'gpt-4',
            input: `create simple blog post
             topic: ${topic}
             Include: 
             - A title 
             - Introduction 
             - 5 main sections
            `,
            stream: true
         })
//  console.log("stream " , stream);
        //  saving autline
        let outline = ""

        for await ( const chunks of stream){
            if(chunks.type === "response.output_text.delta"){
                process.stdout.write(chunks.delta)
                outline += chunks.delta
            }
        }

        // summarize topic
        console.log("\n\n Creating  summary...\n");
        const summarizeTopic = await openai.responses.create({
            model: 'gpt-4',
            input: ` summarize this topic in 2 sentenceses: ${outline}`
        })
        console.log(summarizeTopic.output_text);


        // Ask follow-up question
        inputTake.question("ask a question this topic?" , async (question) =>{
              try {
                const answer = await openai.responses.create({
                    model: 'gpt-4',
                    input: ` topic ${topic}, outline: ${outline}, question: ${question} answer the question simple and clearly.`
                })
                console.log("\n💡 Answer:"); 
                console.log(answer.output_text);

                inputTake.close()
              } catch (error) {
                console.log("Something went wrong:", error.message);
                inputTake.close()
              }
        })
    } catch (error) {
        console.log("Error", error.message);
    }
})