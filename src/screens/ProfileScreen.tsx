import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../firebase/firebase.config";
import { getAuth, updateProfile } from "firebase/auth";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/authContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from "../components/Loading";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "LoginScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {
  const { name, handleChange } = useForm({ name: "" });
  const { userLogged } = useAuth();
  const [_, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(userLogged?.photoURL);

  const onReload = () => setReload((prevState) => !prevState);

  const takePhotoFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.canceled) return;

    uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri: string) => {
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${userLogged?.uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();
    updateProfile(auth.currentUser!, { photoURL: imageUrl });

    setAvatar(imageUrl);
    setLoading(false);
  };

  const handleUpdatedName = async () => {
    try {
      if (name !== "") {
        await updateProfile(auth.currentUser!, {
          displayName: name,
        });
        onReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={-141}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor="#FAF7F0" barStyle="dark-content" />
        <View style={styles.wrapContent}>
          <View>
            <Text style={styles.title}>complete profile</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containerAvatar}
              onPress={takePhotoFromGallery}
            >
              {avatar !== null ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <Image
                  source={require("../../assets/avatar.png")}
                  style={styles.avatar}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.nameUser}>
              {" "}
              {userLogged?.displayName !== null
                ? userLogged?.displayName
                : "name"}
            </Text>
            <TextInput
              placeholder="New name"
              style={styles.input}
              value={name}
              onChangeText={(value) => handleChange(value, "name")}
              onSubmitEditing={handleUpdatedName}
            />
            <TouchableOpacity
              style={styles.containerButtonUpdatedName}
              activeOpacity={0.8}
              onPress={() => handleUpdatedName()}
            >
              <Text style={styles.textButtonUpdatedName}>Update name</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.containerNext}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.next}>skip step</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF7F0",
    flexGrow: 1,
  },
  wrapContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.4,
    textTransform: "capitalize",
  },
  containerAvatar: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 10,
    width: 150,
    height: 150,
    backgroundColor: "#FAF7F0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: "#25D366",
  },
  avatar: {
    width: 138,
    height: 138,
    borderRadius: 138 / 2,
  },
  nameUser: {
    textAlign: "center",
    fontSize: 15,
    letterSpacing: 0.4,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  input: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 30,
  },
  containerButtonUpdatedName: {
    backgroundColor: "#25D366",
    marginHorizontal: 20,
    marginTop: 30,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonUpdatedName: {
    fontSize: 13,
    letterSpacing: 0.4,
    color: "#202020",
    fontWeight: "bold",
  },
  containerNext: {
    backgroundColor: "#25D366",
    marginBottom: 40,
    height: 45,
    width: 130,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 10,
  },
  next: {
    fontSize: 13,
    letterSpacing: 0.4,
    color: "#202020",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
