import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert, useColorScheme, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const onSignUpPressed = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: name,
      });
  
      // Save the name in AsyncStorage
      await AsyncStorage.setItem('username', name);
  
      navigation.navigate("AdditionalInfoScreen");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const backgroundColor = colorScheme === "dark" ? "#121212" : "#9d653a";

  return (
    <View style={[styles.root, { backgroundColor }]}>
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
      <Text style={styles.title}>EchoHive</Text>

      <View style={styles.boxContainer}>
        <CustomInput placeholder="Name" value={name} setValue={setName} />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Sign Up" onPress={onSignUpPressed} />
        <CustomButton
          text="Already have an account? Sign In"
          onPress={() => navigation.navigate('SignInScreen')}
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
    fontSize: 50,
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
});

export default SignUpScreen;
