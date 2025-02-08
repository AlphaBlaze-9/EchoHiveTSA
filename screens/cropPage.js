import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pesticideAlternatives from '../assets/pesticideAlternatives';
import { Linking } from 'react-native';
import flowers from "../assets/flowerRain";
import { ScrollView } from 'react-native';
const flowerPhotos = [
  require("../assets/flowerPhotos/alstroemeria.jpg"),
  require("../assets/flowerPhotos/aster.jpg"),
  require("../assets/flowerPhotos/basil.jpg"),
  require("../assets/flowerPhotos/beeBalm.jpg"),
  require("../assets/flowerPhotos/borage.jpg"),
  require("../assets/flowerPhotos/butterflyBush.jpg"),
  require("../assets/flowerPhotos/calendula.jpg"),
  require("../assets/flowerPhotos/catmint.jpg"),
  require("../assets/flowerPhotos/chives.jpg"),
  require("../assets/flowerPhotos/clover.jpg"),
  require("../assets/flowerPhotos/coneflower.jpg"),
  require("../assets/flowerPhotos/corriander.jpg"),
  require("../assets/flowerPhotos/cosmos.jpg"),
  require("../assets/flowerPhotos/daisy.jpg"),
  require("../assets/flowerPhotos/foxglove.jpg"),
  require("../assets/flowerPhotos/gaillardia.jpg"),
  require("../assets/flowerPhotos/goldenrod.jpg"),
  require("../assets/flowerPhotos/heliotrope.jpg"),
  require("../assets/flowerPhotos/hollyhock.jpg"),
  require("../assets/flowerPhotos/hysopp.jpg"),
  require("../assets/flowerPhotos/iris.jpg"),
  require("../assets/flowerPhotos/joepyeWeed.jpg"),
  require("../assets/flowerPhotos/lavendar.jpg"),
  require("../assets/flowerPhotos/lupine.jpg"),
  require("../assets/flowerPhotos/marigold.jpg"),
  require("../assets/flowerPhotos/milkweed.jpg"),
  require("../assets/flowerPhotos/mint.jpg"),
  require("../assets/flowerPhotos/morningGlory.jpg"),
  require("../assets/flowerPhotos/penstemon.jpg"),
  require("../assets/flowerPhotos/peony.jpg"),
  require("../assets/flowerPhotos/petunia.jpg"),
  require("../assets/flowerPhotos/phlox.jpg"),
  require("../assets/flowerPhotos/rosemary.jpg"),
  require("../assets/flowerPhotos/rudbeckia.jpg"),
  require("../assets/flowerPhotos/Salvia.jpg"),
  require("../assets/flowerPhotos/scabiosa.jpg"),
  require("../assets/flowerPhotos/sedum.jpg"),
  require("../assets/flowerPhotos/snapdragon.jpg"),
  require("../assets/flowerPhotos/sunflower.jpg"),
  require("../assets/flowerPhotos/sweetAlyssum.jpg"),
  require("../assets/flowerPhotos/tickseed.jpg"),
  require("../assets/flowerPhotos/verbena.jpg"),
  require("../assets/flowerPhotos/violet.jpg"),
  require("../assets/flowerPhotos/yarrow.jpg"),
  require("../assets/flowerPhotos/zinnia.jpg"),
];

const flowerNames = [
  "Alstroemeria",
  "Aster",
  "Basil",
  "Bee Balm",
  "Borage",
  "Butterfly Bush",
  "Calendula",
  "Catmint",
  "Chives",
  "Clover",
  "Coneflower",
  "Coriander",
  "Cosmos",
  "Daisy",
  "Foxglove",
  "Gaillardia",
  "Goldenrod",
  "Heliotrope",
  "Hollyhock",
  "Hyssop",
  "Iris",
  "Joe Pye Weed",
  "Lavender",
  "Lupine",
  "Marigold",
  "Milkweed",
  "Mint",
  "Morning Glory",
  "Penstemon",
  "Peony",
  "Petunia",
  "Phlox",
  "Rosemary",
  "Rudbeckia",
  "Salvia",
  "Scabiosa",
  "Sedum",
  "Snapdragon",
  "Sunflower",
  "Sweet Alyssum",
  "Tickseed",
  "Verbena",
  "Violet",
  "Yarrow",
  "Zinnia",
];

const CropPage = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#3a2a1d" : "#9d653a";

  const [menuVisible, setMenuVisible] = useState(false);
  const [randomFlowers, setRandomFlowers] = useState([]);
  const slideAnim = useState(new Animated.Value(-300))[0];
  const scaleAnim = new Animated.Value(1);
  const [randomPesticideAlternative, setRandomPesticideAlternative] = useState({});

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -300 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
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
  useEffect(() => {
    const getRandomFlowers = () => {
      const indices = [];
      while (indices.length < 2) {
        const randomIndex = Math.floor(Math.random() * flowerPhotos.length);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices.map((index) => ({
        photo: flowerPhotos[index],
        name: flowerNames[index],
      }));
    };

    setRandomFlowers(getRandomFlowers());

    Animated.loop(
      Animated.sequence([ 
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const randomIndex = Math.floor(Math.random() * pesticideAlternatives.length);
    const selectedAlternative = pesticideAlternatives[randomIndex];
    const exampleIndex = Math.floor(Math.random() * selectedAlternative.examples.length);
    const selectedExample = selectedAlternative.examples[exampleIndex];

    setRandomPesticideAlternative({
      title: selectedAlternative.title,
      shortDescription: selectedAlternative.shortDescription,
      example: selectedExample.example,
      implementation: selectedExample.implementation,
      learnMore: selectedAlternative.learnMore,
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.replace("WelcomePage");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButtonContainer} onPress={toggleMenu}>
        <Image source={require("../assets/menuButton.png")} style={styles.menuButton} />
      </TouchableOpacity>

      {/* Overlay for menu */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Header Section */}
      <View style={styles.header}>
        {/* Title for Water Requirement */}
        <Text style={styles.waterTitle}>Water Necessary:</Text>

        {randomFlowers.length > 0 ? (
          randomFlowers.map((flower, index) => {
            const flowerData = flowers.find(f => f.name === flower.name);
            const waterRequirement = flowerData ? flowerData.waterRequirement : 0;

            const fullDroplets = Math.min(Math.floor((waterRequirement / 5) * 6), 6);
            const emptyDroplets = 6 - fullDroplets;

            return (
              <View style={styles.plantRow} key={index}>
                <Text style={styles.headerText}>{flower.name}</Text>

                <View style={styles.dropletContainer}>
                  {[...Array(fullDroplets)].map((_, dropletIndex) => (
                    <Image
                      key={`full-droplet-${index}-${dropletIndex}`}
                      source={require("../assets/droplet.png")}
                      style={styles.dropletFull}
                    />
                  ))}
                  {[...Array(emptyDroplets)].map((_, dropletIndex) => (
                    <Image
                      key={`empty-droplet-${index}-${dropletIndex}`}
                      source={require("../assets/droplet.png")}
                      style={styles.dropletEmpty}
                    />
                  ))}
                </View>
              </View>
            );
          })
        ) : (
          <Text>Loading Pollinator-Friendly Flowers...</Text>
        )}
      </View>

      {/* Other Sections */}
      <View style={styles.newBox}>
        <Text style={styles.newBoxText}>Pollinator-Friendly Flowers:</Text>
        {randomFlowers.length > 0 ? (
          <View style={styles.flowersRow}>
            <View style={styles.flowerItem}>
              <Image source={randomFlowers[0].photo} style={styles.flowerImage} />
              <Text style={styles.flowerName}>{randomFlowers[0].name}</Text>
            </View>
            <View style={styles.flowerItem}>
              <Image source={randomFlowers[1].photo} style={styles.flowerImage} />
              <Text style={styles.flowerName}>{randomFlowers[1].name}</Text>
            </View>
          </View>
        ) : (
          <Text>Loading Pollinator-Friendly Flowers...</Text>
        )}
      </View>

      {/* Pesticide Alternatives Section - Wrap in ScrollView */}
      <View style={styles.newBoxy}>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          <Text style={styles.headerText}>Alternatives to Pesticides:</Text>
          <Text style={styles.newBoxText}>{randomPesticideAlternative.title}</Text>
          <Text style={styles.shortDescription}>
            {randomPesticideAlternative.shortDescription}
          </Text>
          <Text style={styles.exampleText}>Example:</Text>
          <Text style={styles.exampleDetails}>
            {randomPesticideAlternative.example}
          </Text>
          <Text style={styles.implementationText}>Implementation:</Text>
          <Text style={styles.implementationDetails}>
            {randomPesticideAlternative.implementation}
          </Text>
          {randomPesticideAlternative.learnMore && (
            <TouchableOpacity onPress={() => Linking.openURL(randomPesticideAlternative.learnMore)}>
              <Text style={styles.linkText}>Learn More</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("BeePage")}>
          <View style={styles.iconWrapper}>
            <Image source={require("../assets/bee.png")} style={styles.navIconBee} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CropPage")}>
          <View style={styles.farmIconWrapper}>
            <Image source={require("../assets/bigCrop.png")} style={styles.navIconCrop} />
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
            <Image source={require("../assets/smallFarm.png")} style={styles.navIconFarm} />
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
    padding: 10,
    marginTop: 0,
  },
  menuButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
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
    backgroundColor: "transparent", 
    zIndex: 0,
  },
  header: {
    backgroundColor: "#f8ca71",
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
    marginTop: 90, 
    borderWidth: 5,
    borderColor: "#5c3d2e",
  },
  newBox: {
    margin: 20,
    padding: 10,
    borderWidth: 5,
    borderColor: "#5c3d2e",
    borderRadius: 30,
    backgroundColor: "#f8ca71",
    width: "100%", 
    alignSelf: "center",
    marginTop: 0,
  },
  newBoxText: {
    fontSize: 15,
    fontWeight: "bold",
 marginBottom: 10,
    textAlign: "center",
    color: "#5c3d2e", 
  },
  flowerContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  evenFlower: {
    backgroundColor: "#ffe4b5", 
  },
  oddFlower: {
    backgroundColor: "#ffe4b5", 
  },
  flowerText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#5c3d2e", 
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5c3d2e",
    textAlign: "center",
    marginVertical: 1,
    marginLeft: 30,
  },
  headerTexty: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5c3d2e",
    textAlign: "center",
    marginVertical: 1,
    marginLeft: 30,
  },
  flowerDisplayContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  flowerImage: {
    width: 120, 
    height: 120, 
    borderRadius: 10,
    marginBottom: 5, 
  },
  flowerName: {
    marginTop: 2,  
    fontSize: 18,  
    textAlign: "center", 
    color: "#5c3d2e", 
  },
  flowersRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 10, 
    marginLeft: 0,  
  },
  flowerItem: {
    alignItems: "center", 
    marginHorizontal: 30, 
  },
  plantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  dropletContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 2,
    marginRight: 20,
  },
  dropletFull: {
    width: 20,
    height: 30,
    marginHorizontal: 2,
    tintColor: "#4da6ff",
  },
  dropletEmpty: {
    width: 20,
    height: 30,
    marginHorizontal: 2,
    tintColor: "#ccc",
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
  menuIcon: {
    width: 45,
    height: 45,
    marginRight: 0,
    left: -10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
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
    zIndex: 1,
  },
  menuButton: {
    width: 50,
    height: 50,
  },
  shortDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  exampleDetails: {
    fontSize: 14,
    marginBottom: 8,
  },
  implementationText: {
    fontSize: 14,
    fontWeight: '600',
 marginBottom: 4,
  },
  implementationDetails: {
    fontSize: 14,
    marginBottom: 16,
  },
  linkText: {
    fontSize: 14,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  newBoxy: {
    margin: 20,
    padding: 10,
    borderWidth: 5,
    borderColor: "#5c3d2e",
    borderRadius: 30,
    backgroundColor: "#f8ca71",
    width: "100%",
    alignSelf: "center",
    marginTop: -10,
    height: 270,
    overflow: 'hidden',
  },
  
  waterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5c3d2e", 
    marginVertical: 0,
    alignSelf: "center",
  },
});

export default CropPage;
