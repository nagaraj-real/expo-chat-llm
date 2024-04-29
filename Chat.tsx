import React, { useState, useCallback } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import MessageText from "./MessageText";
import { chatWithLLM } from "react-native-local-gen-ai";
import { ActivityIndicator } from "react-native";

const llmUser = {
  _id: 2,
  name: "System",
};

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    try {
      console.log(messages);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      setIsLoading(true);
      const response = await chatWithLLM(messages[0].text);
      console.log(response);
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
  }, []);

  return (
    <>
      {isLoading && <ActivityIndicator size="large" color="#007bff" />}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderMessageText={(props) => <MessageText {...props} />}
        user={{
          _id: 1,
          name: "User",
        }}
      />
    </>
  );
}
