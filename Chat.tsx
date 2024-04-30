import React, { useState, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import MessageText from "./MessageText";
import { chatWithLLM } from "react-native-local-gen-ai";
import { ActivityIndicator, StyleSheet } from "react-native";
import { getPromptsFromMessages } from "./message-util";

const llmUser = {
  _id: 2,
  name: "model",
};

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatPrompt, setChatPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setChatPrompt(getPromptsFromMessages([...messages].reverse()))
  }, [messages])

  useEffect(() => {
    console.log(chatPrompt)
  }, [chatPrompt])

  async function onSend(messages: IMessage[] = []) {
    try {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      setIsLoading(true);
      //const prompt = getPromptsFromMessages(messages, chatPrompt)
      const response = await chatWithLLM(messages[0].text);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [{
          _id: Math.round(Math.random() * 1000000),
          text: response,
          createdAt: new Date(),
          user: llmUser,
        }])
      );
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {isLoading && <ActivityIndicator size="large" color="#007bff" />}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderMessageText={(props) => <MessageText {...props} />}
        user={{
          _id: 1,
          name: "user",
        }}
      />
    </>
  );
}
