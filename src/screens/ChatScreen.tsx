import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import {
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { auth, database } from "../firebase/firebase.config";
import { useAuth } from "../context/authContext";
import Icon from "@expo/vector-icons/Ionicons";
import { QuickReplies } from "react-native-gifted-chat/lib/QuickReplies";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import { signOut } from "firebase/auth";

interface User {
  _id: string | number;
  avatar: string;
  name: string;
}

interface Mensaje {
  _id: string | number;
  createdAt: Date | number;
  text: string;
  user: User;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "ChatScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ChatScreen({ navigation }: Props) {
  const [messages, setMessages] = useState<Mensaje[]>([]);
  const { userLogged } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#FAF7F0" },
      headerTitle: () => (
        <Text style={styles.nameUser}>
          {userLogged?.displayName !== null ? userLogged?.displayName : "name"}
        </Text>
      ),
      headerTitleAlign: "center",
      headerBackVisible: false,

      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.containerAvatar}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          {userLogged?.photoURL !== null ? (
            <Image
              source={{ uri: userLogged?.photoURL! }}
              style={styles.avatar}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/avatar.png")}
              style={styles.avatar}
            />
          )}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Icon
          name="log-out-outline"
          size={24}
          color="#202020"
          onPress={() => handleLogout()}
        />
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, [messages]);

  const onSend = useCallback((messages = [] as Mensaje[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={{ flexGrow: 1 }}>
      <StatusBar backgroundColor="#FAF7F0" barStyle="dark-content" />
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/fondo-chat.jpg")}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userLogged?.uid!,
            avatar: userLogged?.photoURL!,
            name: userLogged?.displayName!,
          }}
          renderUsernameOnMessage={true}
          renderInputToolbar={(props) => MessengerBarContainer(props)}
          renderSend={(props) => (
            <Send {...props}>
              <Icon name="send-outline" size={24} color="#25D366" />
            </Send>
          )}
          renderBubble={renderBubble}
          placeholder="Write a message"
          renderQuickReplies={(props) => (
            <QuickReplies color="red" {...props} />
          )}
          renderDay={(props) => (
            <Day {...props} textStyle={{ color: "#202020" }} />
          )}
        />
      </ImageBackground>
    </View>
  );
}

const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: "#202020",
        },
        left: {
          color: "#202020",
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: "#9DC08B",
        },
        left: {
          backgroundColor: "#fff",
        },
      }}
    />
  );
};

const MessengerBarContainer = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#FAF7F0",
        alignContent: "center",
        justifyContent: "center",
        borderWidth: 0,
        marginHorizontal: 6,
        borderRadius: 10,
        borderTopColor: "transparent",
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: null!,
    height: null!,
    paddingBottom: 20,
  },
  containerAvatar: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 38 / 2,
    borderWidth: 2,
    borderColor: "#25D366",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  nameUser: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.4,
    textTransform: "capitalize",
    color: "#202020",
  },
});
