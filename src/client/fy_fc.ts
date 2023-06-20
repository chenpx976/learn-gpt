import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

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
        'content': `translate to chinese: """${prompt}"""`,
      },
    ],
    'functions': [
      {
        'name': 'print_translation',
        'description': 'a function that prints the translation of the prompt',
        'parameters': zodToJsonSchema(
          z.object({
            // 翻译的结果
            translation: z.string(),
          })
        ),
      },
    ],
    function_call: {
      name: 'print_translation',
    },
  });
  return response.data.choices[0].message?.function_call?.arguments;
};

chat(`
Couldn't beat her smile, it stirred up all the media
Secret side, I wanna know it
So mysterious
Even that elusive side, part of her controlled area
Complete and perfect
All you say is a bunch of lies

Dear miss genius idol, unmatched

What did you eat today？
What book do you love？
Whenever you go out for fun, tell me, where do you go？
Haven't eaten anything
It's a secret, unknown
Any questions you're facing, always acting so vaguely

`).then((response) => {
  console.log('custom-debug:response', response);
});
