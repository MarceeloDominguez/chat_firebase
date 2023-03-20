import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuth } from "../context/authContext";
import Loading from "../components/Loading";
import ChatScreen from "../screens/ChatScreen";

export type RootStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProfileScreen: undefined;
  ChatScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const StackAuthApp = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const StackHomeApp = () => {
  return (
    <Stack.Navigator
      screenOptions={{ animation: "none" }}
      initialRouteName="ChatScreen"
    >
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShadowVisible: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  const { userLogged, isLogged } = useAuth();

  if (isLogged) return <Loading />;

  return <>{userLogged !== null ? <StackHomeApp /> : <StackAuthApp />}</>;
}
