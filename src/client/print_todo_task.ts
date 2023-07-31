import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import dayjs from 'dayjs';
/**
tell application "Reminders"
    tell list "Reminders"
        make new reminder with properties {name:"New reminder", due date:(current date)}
    end tell
end tell
 */
const getSchema = z.object({
  taskName: z.string(),
  taskDate: z.date(),
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
        'name': 'print_taskName_taskDate',
        'description': `a function that prints the taskName and taskDate(YYYY-MM-DD HH:mm) of the prompt, now is ${dayjs().format('YYYY-MM-DD HH:mm')}`,
        'parameters': zodToJsonSchema(getSchema),
      },
    ],
    function_call: {
      name: 'print_taskName_taskDate',
    },
  });
  return response.data.choices[0].message?.function_call?.arguments;
};

chat('周三上午和 XX 对接数据需求的实现').then((response) => {
  console.log('custom-debug:response', response);
});
