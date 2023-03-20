import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import { useForm } from "../hooks/useForm";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth/react-native";
import { auth } from "../firebase/firebase.config";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "RegisterScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  const { email, password, name, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleRegister = async () => {
    setLoading(true);
    try {
      if (email !== "" && password !== "" && name !== "") {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser!, {
          displayName: name,
        });
        setLoading(false);
        navigation.navigate("ChatScreen");
      } else {
        Alert.alert("Error", "Name, Email and password are required", [
          { text: "Ok" },
        ]);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "The email or password are incorrect", [
        { text: "Ok" },
      ]);
      setLoading(false);
      console.log(error);
    }
  };

  if (loading) return <Loading />;

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
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="John Doe"
            style={styles.input}
            placeholderTextColor="#7E7474"
            value={name}
            onChangeText={(value) => handleChange(value, "name")}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email@gmail.com"
            style={styles.input}
            placeholderTextColor="#7E7474"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => handleChange(value, "email")}
          />
          <Text style={styles.label}>Password</Text>
          <View>
            <TextInput
              placeholder="*******"
              style={styles.input}
              placeholderTextColor="#7E7474"
              secureTextEntry={eye}
              value={password}
              onChangeText={(value) => handleChange(value, "password")}
              onSubmitEditing={handleRegister}
            />
            <Icon
              name={eye ? "eye-off-outline" : "eye-outline"}
              size={18}
              style={styles.eyeIcon}
              onPress={() => setEye(!eye)}
            />
          </View>
          <TouchableOpacity
            style={styles.containerButton}
            activeOpacity={0.9}
            onPress={() => handleRegister()}
          >
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
    backgroundColor: "#FAF7F0",
  },
  containerGradient: {
    width: width,
    height: height * 0.5,
    paddingHorizontal: 20,
    position: "absolute",
  },
  title: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: "#202020",
    marginBottom: 20,
  },
  wrapInputs: {
    backgroundColor: "#FAF7F0",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
  },
  input: {
    backgroundColor: "#EEEEEE",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
    fontWeight: "bold",
  },
  label: {
    marginHorizontal: 12,
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.4,
    textTransform: "capitalize",
    color: "#202020",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    bottom: 25,
    color: "#7E7474",
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
