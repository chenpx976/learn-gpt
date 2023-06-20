import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const getSchema = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']),
});
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chat = async (prompt: any) => {
  const response = await openai.createChatCompletion({
    'model': 'gpt-3.5-turbo-0613',
    'messages': [
      {
        'role': 'user',
        'content': prompt,
      },
    ],
    'functions': [
      {
        'name': 'print_sentiment',
        'description': 'a function that prints the sentiment of the prompt',
        'parameters': zodToJsonSchema(getSchema),
      },
    ],
    function_call: {
      name: 'print_sentiment',
    },
  });
  return response.data.choices[0].message?.function_call?.arguments;
};

chat('I am happy').then((response) => {
  console.log('custom-debug:response', response);
});
