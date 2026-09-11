import openai from "./openai.js";

// generate article

 export async function generateArticle(topic) {
    const response = await  openai.responses.create({
        model: 'gpt-4o',
        input: `
        Write a friendly article about:
         ${topic}
         Requirements:

- Create a clear title
- Write an introduction
- Create 4 main sections
- Explain each section clearly
- Write a conclusion
- Use simple English
- Around 300 words
        `
    })

    return {
      
     text: response?.output_text,
     usage: response?.usage
    }
    
}


// Generate Summary
export async function generateSummary(article) {

  const response = await openai.responses.create({
   model: 'gpt-4o',

    input: `
Summarize the following article.

Give me 5 important points.

Article:

${article}
`
  });

  return response.output_text;
}


// Generate Social Post
export async function generateSocialPost(article) {

  const response = await openai.responses.create({
 model: 'gpt-4o',

    input: `
Create an engaging social media post
from the following article.

Requirements:

- Start with an interesting sentence
- Keep it short
- Mention 3 important points
- Add a call to action
- Add 3 hashtags

Article:

${article}
`
  });

  return response.output_text;
}