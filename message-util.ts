import { IMessage } from "react-native-gifted-chat";

export function getPromptsFromMessages(messages: IMessage[], prevPrompt: string = "") {
    console.log(messages)
    let prompt = prevPrompt
    for (const message of messages) {
        if (message.user.name === 'user') {
            if (!prompt) {
                prompt += `<start_of_turn>user\n`
            }
            prompt += `${message.text}<end_of_turn>\n`
            prompt += `<start_of_turn>model\n`
        } else {
            if (!prompt) {
                prompt += `<start_of_turn>model\n`
            }
            prompt += `${message.text}<end_of_turn>\n`
            prompt += `<start_of_turn>user\n`
        }
    }
    return prompt
}
