import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type RootStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
