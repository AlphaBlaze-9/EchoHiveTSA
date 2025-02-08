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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";

const SettingsScreen = () => {

  const [location, setLocation] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [cropType, setCropType] = useState("");
  const [initialLocation, setInitialLocation] = useState("");
  const [initialFarmSize, setInitialFarmSize] = useState("");
  const [initialCropType, setInitialCropType] = useState("");
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        
        const savedLocation = await AsyncStorage.getItem("location");
        const savedFarmSize = await AsyncStorage.getItem("farmSize");
        const savedCropType = await AsyncStorage.getItem("cropType");
  
        
        if (savedLocation) setInitialLocation(savedLocation);
        if (savedFarmSize) setInitialFarmSize(savedFarmSize);
        if (savedCropType) setInitialCropType(savedCropType);
      } catch (error) {
        console.error("Error loading user settings: ", error);
      }
    };
  
    loadUserData();
  }, []);
  
  
  const onSavePressed = async () => {
    if (!location || !farmSize || !cropType) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }
  
    try {

      await AsyncStorage.setItem("location", location);
      await AsyncStorage.setItem("farmSize", farmSize);
      await AsyncStorage.setItem("cropType", cropType);
  
      setInitialLocation(location);
      setInitialFarmSize(farmSize);
      setInitialCropType(cropType);
  
      Alert.alert("Settings Saved", "Your settings have been successfully saved. Refresh your Crop Page.");
  
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save settings: " + error.message);
    }
  };

  const onBackPressed = () => {
    setLocation(initialLocation);
    setFarmSize(initialFarmSize);
    setCropType(initialCropType);
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

      <Text style={styles.title}>Settings</Text>

      <View style={styles.boxContainer}>
        <CustomInput
          placeholder="Location (e.g., New York)"
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

        <CustomButton text="Save Settings" onPress={onSavePressed} />
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

export default SettingsScreen;
