import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usStatesWithPollinators from "../assets/usStates";

const CompatibilityScreen = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [pollinators, setPollinators] = useState([]);
  const [popularity, setPopularity] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem("location");
        if (savedLocation) {
          const cleanedLocation = savedLocation.trim();
          setLocation(cleanedLocation);
          fetchPollinators(cleanedLocation);
        } else {
          checkEmptyBoxes();
        }
      } catch (error) {
        console.error("Failed to load location:", error);
      }
    };

    loadLocation();
  }, []);

  const fetchPollinators = (location) => {
    const statePollinators = usStatesWithPollinators.find(
      (stateData) => stateData.state === location
    );

    if (statePollinators) {
      setPollinators(statePollinators.pollinators);
      setPopularity(statePollinators.popularity || {});
    } else {
      setPollinators(["No data available for this location."]);
      setPopularity({});
    }
  };

  const checkEmptyBoxes = () => {
    if (!location && pollinators.length === 0) {
      Alert.alert(
        "Location Not Set",
        "Please set your location to view pollinators and popularity data.",
        [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
      );
    }
  };

  const signOutUser = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("username");
      navigation.navigate("WelcomePage");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleRefresh = async () => {
    try {
      setLocation("");
      setPollinators([]);
      setPopularity({});
  
      const savedLocation = await AsyncStorage.getItem("location");
      if (savedLocation) {
        const cleanedLocation = savedLocation.trim();
        setLocation(cleanedLocation);
        fetchPollinators(cleanedLocation);
      } else {
        checkEmptyBoxes();
      }
    } catch (error) {
      console.error("Failed to refresh:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity
        style={styles.menuButtonContainer}
        onPress={toggleMenu}
      >
        <Image
          source={require("../assets/menuButton.png")}
          style={styles.menuButton}
        />
      </TouchableOpacity>

      {/* Refresh Button */}
      <TouchableOpacity
        style={styles.refreshButtonContainer}
        onPress={handleRefresh}
      >
        <Image
          source={require("../assets/refreshButton.png")}
          style={styles.refreshButton}
        />
      </TouchableOpacity>


      {/* More Button */}
      <TouchableOpacity
        style={styles.moreButtonContainer}
        onPress={() => navigation.navigate("MorePollinator")}
      >
        <Image
          source={require("../assets/moreButton.png")}
          style={styles.moreButton}
        />
      </TouchableOpacity>


      {/* Overlay for Menu */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Compatibility Box */}
      <View style={styles.box}>
        <Text style={styles.title}>Popularity</Text>

        <View style={styles.progressContainer}>
          {pollinators.map((pollinator, index) => (
            <View key={index} style={styles.pollinatorProgress}>
              <View style={styles.pollinatorNameContainer}>
                <Text style={styles.categoryText}>{pollinator}</Text>
                <Text style={styles.percentageText}>
                  {popularity[pollinator] || 0}%
                </Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${popularity[pollinator] || 0}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Pollinators Box */}
      <View style={styles.pollinatorBox}>
        <Text style={styles.title}>
          Popular Pollinators In Your Area: {location ? `in ${location}` : ""}
        </Text>
        <View style={styles.pollinatorsContainer}>
          {pollinators.map((pollinator, index) => (
            <Text key={index} style={styles.pollinatorText}>
              • {pollinator}
            </Text>
          ))}
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("CropPage")}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/crop.png")}
              style={styles.navIconBee}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("BeePage")}>
          <View style={styles.farmIconWrapper}>
            <Image
              source={require("../assets/bigBee.png")}
              style={styles.navIconCrop}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "HomePage" }],
            })
          }
        >
          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/smallFarm.png")}
              style={styles.navIconFarm}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Side Menu */}
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Menu Items */}
        <View style={styles.menuItemsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "HomePage" }],
              })
            }
            style={styles.menuItem}
          >
            <Image
              source={require("../assets/HomeIcon.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Home Page</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SettingPage")}
            style={styles.menuItem}
          >
            <Image
              source={require("../assets/SettingsIcon.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChatbotPage")}
            style={styles.menuItem}
          >
            <Image
              source={require("../assets/chatBox.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>ChatBot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PollinatorTracker")}
            style={styles.menuItem}
          >
            <Image
              source={require("../assets/pollinatorTracker.png")}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Pollinator Tracker</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity
            onPress={() => {
              signOutUser();
            }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d653a",
    padding: 16,
  },
  box: {
    backgroundColor: "#5c3d2e",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 90,
  },
  pollinatorBox: {
    backgroundColor: "#5c3d2e",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffc107",
    marginBottom: 20,
    textAlign: "center",
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffc107",
    marginBottom: 5,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#5c3d2e",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ffc107",
  },
  pollinatorsContainer: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pollinatorText: {
    fontSize: 15,
    color: "#f8ca71",
    width: "50%",
    marginBottom: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8ca71",
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  farmIconWrapper: {
    width: 150,
    height: 150,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  navIconBee: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  navIconFarm: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  navIconCrop: {
    width: 330,
    height: 330,
    resizeMode: "contain",
  },
  sideMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    backgroundColor: "#ffc107",
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  menuText: {
    fontSize: 24,
    color: "#9d653a",
    marginVertical: 15,
    left: -15,
  },
  signOutText: {
    fontSize: 24,
    color: "#9d653a",
    marginVertical: 20,
    fontWeight: "bold", 
  },
  bottomContainer: {
    width: "100%", 
  },
  menuButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 50,
  },
  menuButton: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1,
  },
  refreshButtonContainer: {
    position: "absolute",
    top: -100,
    right: -100,
    zIndex: 1,
  },
  refreshButton: {
    width: 350,
    height: 350,
  },
  moreButtonContainer: {
    position: "absolute",
    top: 10,
    right: "55%",
    zIndex: 1,
  },
  moreButton: {
    width: 250,
    height: 250,
  },
  percentageText: {
    fontSize: 10,
    color: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  menuIcon: {
    width: 45,
    height: 45,
    marginRight: 0,
    left: -10,
    zIndex: 50,
  },
});

export default CompatibilityScreen;
