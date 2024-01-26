import OpenAI from "openai";

let openAIKey = "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";
const openai = new OpenAI({
  apiKey: openAIKey,
  dangerouslyAllowBrowser: true,
});

let commandInput =
  "Generate a choose your own adventure type story in the follow format for the given genre";
let dataFormat = `{
    "story": {
      "start": {
        "story_segment": "[story segment here]",
        "branch_1": "[option 1]",
        "branch_2": "[option 2]"
      },
      "branch_1": {
        "story_segment": "[story segment here]",
        "branch_3": "[option 3]",
        "branch_4": "[option 4]"
      },
      "branch_2": {
        "story_segment": "[story segment here]",
        "branch_5": "[option 5]",
        "branch_6": "[option 6]"
      }
      // Add more branches as needed
    }
  }`;

const GenerateStory = (genere: string, extraInfo: string):any => {
  console.log('generating story')
  console.log(extraInfo)
  let gptCompletion = openai.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: commandInput + dataFormat + `Genre : ${genere}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return gptCompletion;
};

export default GenerateStory;
