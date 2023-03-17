import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/authContext";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
