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
[00:00.000]Idol - YOASOBI
[00:00.227]Composed by：Ayase/Konnie Aoki
[00:00.659]Couldn't beat her smile it stirred up all the media
[00:03.386]Secret side I wanna know it
[00:05.035]So mysterious
[00:06.095]Even that elusive side part of her controlled area
[00:09.377]Complete and perfect
[00:10.388]All you say is a bunch of lies
[00:11.952]Dear miss genius idol unmatched
[00:17.246]What did you eat today
[00:18.950]What book do you love
[00:20.436]Whenever you go out for fun tell me where do you go
[00:23.307]Haven't eaten anything
[00:24.697]It's a secret unknown
[00:26.173]Any questions you're facing always acting so vaguely
[00:28.769]So unconcerned although you brightly glow
[00:31.627]Any seemingly unveiled secrets are as sweet as honey
[00:34.547]Confusing why why why
[00:35.914]Essential lie lie lie
[00:37.354]So what is your type of guy
[00:38.609]Any partner
[00:39.252]So now answer this
[00:40.451]I don't have any idea how I could love anyone
[00:44.115]I don't seem to know what it signifies
[00:46.311]Cannot find out if it's true or it's a lie
[00:49.067]Once again there's somebody who's fallen for the words and cues
[00:52.909]Made him lose his head over you
[00:54.918]That emotion melts all hearts all eyes on you
[00:57.820]Cause you are perfect the most ultimate idol
[01:01.101]Unrivaled will not appear again
[01:03.596]It's the brightest star reborn yes indeed
[01:07.327]Using that smiling face
[01:08.753]That I love you again
[01:10.111]Now everybody is lured and captivated by you
[01:13.143]The pupil that you got
[01:14.583]The words you vocalize
[01:15.609]Even when untrue it's your perfected Ai
[01:18.758]Right right we all know she's very special yes
[01:21.682]We had lost the fight before it started so impressed
[01:24.216]Miss I'm such a star
[01:25.099]We're serving as support to her grace
[01:27.410]Cannot tell me everything was because of her
[01:29.408]No it's not right
[01:30.376]Out of line
[01:31.033]How can we not feel jealous while being around
[01:33.274]It's not a joke you know right
[01:34.217]So I cannot forgive you for that
[01:35.430]Completely deny
[01:36.512]Imperfect you that I sight
[01:37.423]Myself no pardon allowed
[01:38.663]I won't allow anyone if it's not you strongest of all
[01:41.245]That emotion seized all hearts worshiping you
[01:44.078]Yes indeed
[01:44.816]So strong it's you unrivaled idol
[01:47.397]There cannot be weaknesses to find
[01:49.845]The brightest star is residing in you
[01:52.957]The gaps and shortcomings don't show'em
[01:55.278]Dammit dammit
[01:55.897]Parts nobody wants to know should remain hidden
[01:58.882]One and only
[02:00.170]If it's different no way no way
[02:01.754]Such a true love it's the realest Ai
[02:05.049]Showing this smile my own weapon
[02:06.529]Boiling media
[02:08.269]Keeping everything about my secret deep inside
[02:11.097]I'm in love with you my career is built on such a lie
[02:14.739]It's the way I know to show my love without a doubt
[02:17.870]Running down my sweat is flowing
[02:19.514]Cleanest aqua right
[02:21.102]Ruby hidden under my eyelids where it resides
[02:23.905]I sing and dance around
[02:25.478]Look at me I'm Maria
[02:27.366]So lying surely is the greatest kind of love
[02:31.468]I recall no one that loved me whole before
[02:34.505]And I've not been in love with anybody before
[02:37.560]Now the lies I'm making up
[02:39.577]I'm hoping that a day comes when they all become true
[02:42.996]And I keep wishing they do
[02:44.999]One day I will hold everything that I pursue
[02:48.061]Yes I am so greedy true voracious idol
[02:51.295]So sincerely what I'm wishing for
[02:53.698]Is to love each of you with all my heart
[02:56.684]And so today I lie again
[02:59.002]The words I vocalize inside of me
[03:01.238]I'm wishing that one day they come true
[03:03.298]Up to this day I've not been able to let you
[03:05.860]And you hear me saying those meaningful words
[03:09.180]I said it at last
[03:10.560]I know it's not a lie as I'm voicing these words
[03:13.161]I love you
`).then((response) => {
  console.log('custom-debug:response', response);
});
