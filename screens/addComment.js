import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const CommentingPage = () => {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const navigation = useNavigation();

  const saveComment = async (username, comment) => {
    try {
      const storedComments = await AsyncStorage.getItem("comments");
      const parsedComments = storedComments ? JSON.parse(storedComments) : [];
      const newComment = { username, comment };
      parsedComments.push(newComment);
      await AsyncStorage.setItem("comments", JSON.stringify(parsedComments));
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handlePublish = async () => {
    if (username.trim() && comment.trim()) {
      try {
        await saveComment(username, comment);
        setComment("");
        navigation.goBack();
      } catch (error) {
        console.error("Error publishing comment:", error);
      }
    } else {
      console.log("Username or comment is empty");
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onBackPressed} style={styles.backArrowContainer}>
        <Image
          source={require("../assets/BackArrow.png")}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Image
        source={require("../assets/beeLogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Comment</Text>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Username Input */}
          <TextInput
            style={styles.usernameInput}
            placeholder="Enter your username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />

          {/* Comment Box */}
          <TextInput
            style={styles.textBox}
            placeholder="Write a comment..."
            placeholderTextColor="#999"
            multiline
            value={comment}
            onChangeText={setComment}
          />

          {/* Publish Button */}
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d653a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backArrowContainer: {
    position: "absolute",
    top: 50,
    left: -10,
    zIndex: 1,
  },
  backArrow: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 0,
    marginBottom: -70,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffc107",
    marginTop: 20,
    marginBottom: -350,
  },
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#f8ca71",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#5c3d2e",
    borderWidth: 3,
    borderColor: "#5c3d2e",
    marginBottom: 20,
    marginTop: 50,
  },
  textBox: {
    width: "100%",
    height: 200,
    marginTop: 20,
    backgroundColor: "#f8ca71",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    color: "#5c3d2e",
    borderWidth: 5,
    borderColor: "#5c3d2e",
  },
  publishButton: {
    marginTop: -360,
    backgroundColor: "#ffc107",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#5c3d2e",
  },
  publishButtonText: {
    fontSize: 20,
    color: "#5c3d2e",
    fontWeight: "bold",
  },
});

export default CommentingPage;
