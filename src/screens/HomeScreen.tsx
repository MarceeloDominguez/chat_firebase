import { signOut } from "firebase/auth/react-native";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../context/authContext";
import { auth } from "../firebase/firebase.config";

export default function HomeScreen() {
  const { userLogged } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <Text>{userLogged?.displayName}</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
}

const styles = StyleSheet.create({});
