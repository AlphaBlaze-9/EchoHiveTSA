import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const API_KEY = "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"; // Replace with your OpenAI API key
const BASE_URL = "https://api.openai.com/v1/chat/completions";

const ChatbotScreen = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: userInput },
    ];
    setMessages(updatedMessages);
    setUserInput("");

    try {
      const response = await axios.post(
        BASE_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a plant health assistant. Provide possible problems and solutions for plants based on user input.",
            },
            ...updatedMessages,
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const assistantMessage =
        response.data.choices[0]?.message?.content || "I'm not sure.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      Alert.alert("Error", "Could not process your request. Please try again.");
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPressed} style={styles.backArrowContainer}>
        <Image
          source={require("../assets/BackArrow.png")}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Plant Health Chatbot</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.content}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Describe your plant issue..."
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d653a",
  },
  backArrowContainer: {
    position: "absolute",
    top: 50,
    left: 0, 
    zIndex: 1,
  },
  backArrow: {
    width: 150,
    height: 150,
  },
  titleContainer: {
    marginTop: 150,
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ffc107",
  },
  chatContainer: {
    backgroundColor: "#f8ca71",
    width: "95%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderColor: "#5c3d2e",
    borderWidth: 5,
    alignSelf: "center",
    marginTop: 30,
    height: 500,
},
  messagesContainer: {
    flex: 1,
    marginVertical: 8,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageBubble: {
    padding: 16,
    marginVertical: 8,
    maxWidth: "80%",
    borderRadius: 15,
  },
  userMessage: {
    backgroundColor: "#5c3d2e",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  assistantMessage: {
    backgroundColor: "#9d653a",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#fcfcfc",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
},
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 12,
    height: 50,
    borderColor: "#5c3d2e",
    color: "#5c3d2e",
  },
  sendButton: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 16,
    justifyContent: "center",
    height: 50,
    backgroundColor: "#5c3d2e",
  },
  sendButtonText: {
    color: "#f8ca71",
    fontWeight: "bold",
  },
});

export default ChatbotScreen;
