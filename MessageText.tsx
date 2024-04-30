import React from "react";
import { View, StyleSheet } from "react-native";
import { IMessage, MessageTextProps } from "react-native-gifted-chat";
import Markdown from "react-native-markdown-display";
function MessageText(props: MessageTextProps<IMessage>) {
  const { currentMessage } = props;
  const { text, user } = currentMessage || { text: "", user: {} };
  const isUser = user._id === 1;
  const markdownStyles = isUser ? { body: { color: "#fff" } } : { body: { color: "#111", padding: 10 } };
  return (
    <View
      style={[
        styles.bubbleContainer,
        !isUser && { display: "flex" },
      ]}
    >
      <Markdown style={markdownStyles}>{text}</Markdown>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  bubbleContainerUser: {
    color: "#fff",
  },
});

export default React.memo(
  MessageText,
  (prevProps, currentProps) =>
    prevProps.currentMessage?._id === currentProps.currentMessage?._id
);
