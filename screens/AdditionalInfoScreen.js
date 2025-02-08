import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

const AdditionalInfoScreen = () => {
  const [location, setLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [cropType, setCropType] = useState("");
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      
      setLocation("");
      setFarmSize("");
      setCropType("");

      return () => {
        
        setLocation("");
        setFarmSize("");
        setCropType("");
      };
    }, [])
  );

  const onSubmitPressed = async () => {
    if (!location || !farmSize || !cropType) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      await AsyncStorage.setItem("location", location);
      await AsyncStorage.setItem("farmSize", farmSize);
      await AsyncStorage.setItem("cropType", cropType);

      const user = auth.currentUser;

      if (user) {
        await sendEmailVerification(user);
        Alert.alert(
          "Verification Email Sent",
          "A verification email has been sent. Please verify your email to log in."
        );

        navigation.navigate("SignInScreen");
      } else {
        Alert.alert("Error", "User not found. Please log in again.");
      }
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
      <TouchableOpacity
        onPress={onBackPressed}
        style={styles.backArrowContainer}
      >
        <Image
          source={require("../assets/BackArrow.png")}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title}>Tell Us About Your Farm</Text>

      <View style={styles.boxContainer}>
        <CustomInput
          placeholder="State (e.g., New York)"
          value={location}
          setValue={setLocation}
        />
        <CustomInput
          placeholder="Farm Size (e.g., 10 acres)"
          value={farmSize}
          setValue={setFarmSize}
        />
        <CustomInput
          placeholder="Crop Type (e.g., Corn, Wheat)"
          value={cropType}
          setValue={setCropType}
        />

        <CustomButton text="Submit" onPress={onSubmitPressed} />
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
    top: 25,
    left: -20,
    zIndex: 1,
  },
  backArrow: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffc107",
    marginTop: 80,
    marginBottom: 50,
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

export default AdditionalInfoScreen;
