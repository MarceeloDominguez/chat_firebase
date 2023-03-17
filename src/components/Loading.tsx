import React from "react";
import { View, StyleSheet, ActivityIndicator, StatusBar } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FAF7F0" barStyle="dark-content" />
      <ActivityIndicator size={30} color="#25D366" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF7F0",
  },
});
