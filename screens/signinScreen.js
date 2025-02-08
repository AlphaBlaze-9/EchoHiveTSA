import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  useColorScheme,
  TouchableOpacity,
  Switch,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedRememberMe = await AsyncStorage.getItem("rememberMe");
  
        if (savedRememberMe === "true") {
          const savedEmail = await AsyncStorage.getItem("email");
          const savedPassword = await AsyncStorage.getItem("password");
  
          setEmail(savedEmail || "");
          setPassword(savedPassword || "");
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Error loading credentials:", error);
      }
    };
  
    loadCredentials();
  }, []);
  
  const onSignInPressed = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        Alert.alert("Email Not Verified", "Please verify your email before logging in.");
        return;
      }

      navigation.navigate("HomePage", { name: user.displayName || "User" });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  

  const onSignUpPressed = () => {
    navigation.navigate("SignUpScreen");
  };

  const backgroundColor = colorScheme === "dark" ? "#121212" : "#9d653a";

  return (
    <View style={[styles.root, { backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
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
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.boxContainer}>
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />

        <View style={styles.rememberMeContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            thumbColor={rememberMe ? "#ffc107" : "#ccc"}
            trackColor={{ true: "#ffdd55", false: "#eee" }}
          />
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>

        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="Don't have an account? Sign Up"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  backArrowContainer: {
    position: "absolute",
    top: 50,
    left: -20,
    zIndex: 1,
  },
  backArrow: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffc107",
    marginTop: -50,
    marginBottom: 20,
  },
  boxContainer: {
    width: "120%",
    padding: 20,
    borderWidth: 2,
    borderColor: "#5c3d2e",
    borderRadius: 10,
    backgroundColor: "#f8ca71",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#5c3d2e",
  },
});

export default SignInScreen;
