import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import { useForm } from "../hooks/useForm";

const { width, height } = Dimensions.get("window");

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "RegisterScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const { email, password, handleChange } = useForm({
    email: "",
    password: "",
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#25D366", "transparent"]}
        style={styles.containerGradient}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.wrapInputs}>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            placeholderTextColor="#7E7474"
            value={email}
            onChangeText={(value) => handleChange(value, "email")}
          />
          <TextInput
            placeholder="*******"
            style={styles.input}
            placeholderTextColor="#7E7474"
            value={password}
            onChangeText={(value) => handleChange(value, "password")}
          />
          <TouchableOpacity style={styles.containerButton} activeOpacity={0.9}>
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
          <View style={styles.containerLine}>
            <View style={styles.line} />
            <Text style={styles.textDividir}>Or Register with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.wrapIconSocialMedia}>
            <Icon name="logo-google" size={32} color="#DB4437" />
            <Icon name="logo-facebook" size={32} color="#4267B2" />
            <Icon name="logo-twitter" size={32} color="#00acee" />
          </View>
        </View>
        <View style={styles.containerRegister}>
          <Text style={styles.textRegister}>You already have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={[styles.textRegister, { fontWeight: "bold" }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  containerGradient: {
    width: width,
    height: height * 0.5,
    paddingHorizontal: 20,
    position: "absolute",
  },
  title: {
    marginTop: height * 0.1,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: "#202020",
    marginBottom: 20,
  },
  wrapInputs: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
  },
  input: {
    backgroundColor: "#EEEEEE",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
    fontWeight: "bold",
  },
  containerButton: {
    backgroundColor: "#25D366",
    height: 45,
    marginTop: 47,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textButton: {
    fontWeight: "bold",
    letterSpacing: 0.4,
    fontSize: 13,
    color: "#202020",
  },
  containerLine: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  line: {
    height: 1,
    width: width * 0.5 - 95,
    backgroundColor: "#D8D8D8",
  },
  textDividir: {
    width: 120,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "#202020",
  },
  wrapIconSocialMedia: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    gap: 5,
    marginBottom: 20,
  },
  textRegister: {
    fontSize: 13,
    letterSpacing: 0.4,
    color: "#202020",
  },
});
