import { OpenAI } from "langchain/llms/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "langchain/prompts"
import { z } from "zod"

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('make a short summary of the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z.boolean().describe('is the journal entry negative? (i.e does it contains negative emotions?).'),
    color: z.string().describe('a hexadecimal color code that represents the mood of the journal entry. For example #ffff00 for yellow, representing happiness'),
  })
)

const getPrompt = async (content) => {
  const formatted_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{ formatted_instructions }\n{ entry }',
    inputVariables: ["entry"],
    partialVariables: { formatted_instructions: formatted_instructions },
  })

  const input = await prompt.format({
    formatted_instructions: formatted_instructions,
    entry: content
  })

  return input
}

export const analyze = async (content) => {
  const prompt = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.invoke(prompt)

  try {
    return parser.parse(result)
  } catch (err) {
    console.log(err)
  }

}
