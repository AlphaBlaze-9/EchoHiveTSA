import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import WelcomePage from "./screens/WelcomePage";
import HomePage from "./screens/HomePage";
import SignUpScreen from "./screens/signupScreen";
import SignInScreen from "./screens/signinScreen";
import AdditionalInfoScreen from "./screens/AdditionalInfoScreen";
import AddCommentScreen from "./screens/addComment";
import CommentSectionScreen from "./screens/commentSection";
import cropPage from "./screens/cropPage";
import beePage from "./screens/beePage";
import settingsPage from "./screens/settings";
import ChatbotPage from "./screens/chatbotAI";
import PollinatorTracker from "./screens/PollinatorTracker";
import MorePollinator from "./screens/morePollinator";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Lalezar-Regular": require("./assets/fonts/Lalezar-Regular.ttf"),
    "RammettoOne-Regular": require("./assets/fonts/RammettoOne-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="AdditionalInfoScreen" component={AdditionalInfoScreen} />
        <Stack.Screen name="AddCommentScreen" component={AddCommentScreen} />
        <Stack.Screen name="CommentSectionScreen" component={CommentSectionScreen} />
        <Stack.Screen name="CropPage" component={cropPage} />
        <Stack.Screen name="BeePage" component={beePage} />
        <Stack.Screen name="SettingPage" component={settingsPage} />
        <Stack.Screen name="ChatbotPage" component={ChatbotPage} />
        <Stack.Screen name="PollinatorTracker" component={PollinatorTracker} />
        <Stack.Screen name="MorePollinator" component={MorePollinator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default App;
