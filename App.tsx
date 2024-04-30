import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { setModelOptions } from "react-native-local-gen-ai";
import { Chat } from "./Chat";

function App() {
  useEffect(() => {
    setModelOptions({ modelPath: "/data/local/tmp/llm/gemma-2b-it-cpu-int4.bin" });
  }, []);

  return (
    <View style={styles.container}>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    marginTop: 10,
    color: "#111",
  },
});

export default App;
