import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();

  const fetchComments = async () => {
    try {
      const storedComments = await AsyncStorage.getItem("comments");
      const loadedComments = storedComments ? JSON.parse(storedComments) : [];
      setComments(loadedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchComments();
    }, [])
  );

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
      <Text style={styles.title}>Comments</Text>
      <ScrollView style={styles.commentsContainer}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <View key={index} style={styles.commentBox}>
              <Text style={styles.usernameText}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noCommentsText}>No comments yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d653a",
    padding: 16,
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
    marginTop: -30,
    alignSelf: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffc107",
    marginTop: -50,
    marginBottom: 30,
  },
  commentsContainer: {
    flex: 1,
    marginVertical: 16,
  },
  commentBox: {
    backgroundColor: "#f8ca71",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 5,
    borderColor: "#5c3d2e",
  },
  usernameText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5c3d2e",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  noCommentsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#aaa",
    marginTop: 16,
  },
});

export default CommentSection;
