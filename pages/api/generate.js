import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.input),
    temperature: 0.4,
    max_tokens: 500,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(title, input) {

  return `Schrijf een verhaal met de titel: '${title}', over: ${input} in het Nederlands`
;
}


