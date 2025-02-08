import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, SafeAreaView } from "react-native";

const WelcomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/Logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignInScreen")} 
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d653a",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  logo: {
    width: "155%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#faf3e0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginHorizontal: 10,
    borderWidth: 5,
    borderColor: "#ffc107",
  },
  buttonText: {
    fontSize: 25,
    color: "#ffc107",
    fontWeight: "900",
    textAlign: "center",
  },
});

export default WelcomePage;
