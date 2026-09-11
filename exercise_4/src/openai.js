import OPENAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const Openai = new OPENAI({
    apiKey: process.env.OPEN_AI_KEY
})

export default  Openai