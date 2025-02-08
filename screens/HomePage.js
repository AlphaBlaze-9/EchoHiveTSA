import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing, TouchableWithoutFeedback, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from "react-native";
import pollinatorFlowerNames from "../assets/pollinatorFlowerNames"; 

const pollinatorImages = [
  require("../assets/pollinators/blowFly.jpg"),
  require("../assets/pollinators/bluemorphoButterfly.jpg"),
  require("../assets/pollinators/bumbleBee.jpg"),
  require("../assets/pollinators/cabbagewhiteButterfly.jpg"),
  require("../assets/pollinators/carpenterBee.jpg"),
  require("../assets/pollinators/fireFly.jpg"),
  require("../assets/pollinators/fruitBat.jpg"),
  require("../assets/pollinators/fruitFly.jpg"),
  require("../assets/pollinators/greenAnole.jpg"),
  require("../assets/pollinators/harvestMouse.jpg"),
  require("../assets/pollinators/hawkMoth.jpg"),
  require("../assets/pollinators/houseFly.jpg"),
  require("../assets/pollinators/hoverFly.jpg"),
  require("../assets/pollinators/hummingBird.jpg"),
  require("../assets/pollinators/kingFisher.jpg"),
  require("../assets/pollinators/ladyBug.jpg"),
  require("../assets/pollinators/leafcutterBee.jpg"),
  require("../assets/pollinators/leopardGecko.jpg"),
  require("../assets/pollinators/monarchButterfly.jpg"),
  require("../assets/pollinators/mudDauberWasp.jpg"),
  require("../assets/pollinators/paintedladyButterfly.jpg"),
  require("../assets/pollinators/paperWasp.jpg"),
  require("../assets/pollinators/sunBird.jpg"),
  require("../assets/pollinators/sugarGlider.jpg"),
  require("../assets/pollinators/swallowtailButterfly.jpg"),
  require("../assets/pollinators/westernHoneyBee.jpg"),
  require("../assets/pollinators/woodPecker.jpg"),
];

const pollinatorNames = [
  "Blow Fly",
  "Blue Morpho Butterfly",
  "Bumble Bee",
  "Cabbage White Butterfly",
  "Carpenter Bee",
  "Fire Fly",
  "Fruit Bat",
  "Fruit Fly",
  "Green Anole",
  "Harvest Mouse",
  "Hawk Moth",
  "House Fly",
  "Hover Fly",
  "Humming Bird",
  "King Fisher",
  "Lady Bug",
  "Leaf Cutter Bee",
  "Leopard Gecko",
  "Monarch Butterfly",
  "Mud Dauber Wasp",
  "Painted Lady Butterfly",
  "Paper Wasp",
  "Sun Bird",
  "Sugar Glider",
  "Swallowtail Butterfly",
  "Western Honey Bee",
  "Wood Pecker",
];

const addSign = require("../assets/addSign.png");
const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];
  const navigation = useNavigation();
  const route = useRoute();
  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [userName, setUserName] = useState("Guest");

  const [randomImages, setRandomImages] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPollinatorName, setSelectedPollinatorName] = useState("");
  const scaleAnim = useState(new Animated.Value(1))[0];
  const [cropZIndex, setCropZIndex] = useState(2);
  const [farmZIndex, setFarmZIndex] = useState(1);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const savedName = await AsyncStorage.getItem("username");
        if (savedName) {
          setUserName(savedName);
        } else if (route.params?.name) {
          setUserName(route.params.name);
          await AsyncStorage.setItem("username", route.params.name);
        } else {
          setUserName("Guest");
        }
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };
  
    fetchUsername();
  }, [route.params?.name]);
  const handleCropClick = () => {
    setCropZIndex(3);
    setFarmZIndex(1);
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadComments = async () => {
        try {
          const storedComments = await AsyncStorage.getItem("comments");
          if (storedComments) {
            const parsedComments = JSON.parse(storedComments);
            const latestComments = parsedComments.slice(-2);
            setComment1(latestComments[0] || { username: "Anonymous", comment: "No comment available" });
            setComment2(latestComments[1] || { username: "Anonymous", comment: "No comment available" });
          } else {
            setComment1({ username: "Anonymous", comment: "No comment available" });
            setComment2({ username: "Anonymous", comment: "No comment available" });
          }
        } catch (error) {
          console.error("Error loading comments from AsyncStorage: ", error);
        }
      };

      loadComments();
    }, [])
  );

  useEffect(() => {
    const indices = [];
    while (indices.length < 3) {
      const randomIndex = Math.floor(Math.random() * pollinatorImages.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }

    setRandomImages(indices.map((index) => pollinatorImages[index]));
    setImageNames(indices.map((index) => pollinatorNames[index]));

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
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -300 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const goToWelcomePage = () => {
    navigation.navigate("WelcomePage");
    toggleMenu();
  };

  const handleImagePress = (name) => {
    setSelectedPollinatorName(name);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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

  const addComment = () => {
    navigation.navigate("AddCommentScreen");
  };
  return (
    <View style={styles.container}>
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Image source={require("../assets/menuButton.png")} style={styles.menuIcon} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {userName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.centerText]}>Trending Pollinators</Text>
        <View style={styles.textRow}>
          {randomImages.map((_, index) => (
            <Animated.Text
              key={index}
              style={[styles.animatedText, { transform: [{ scale: scaleAnim }] }]}>
              Click for Name
            </Animated.Text>
          ))}
        </View>

        <View style={styles.imageRow}>
          {randomImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(imageNames[index])}
            >
              <View style={styles.pollinatorBox}>
                <Image source={image} style={styles.pollinatorImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, styles.extraSpacing]}>
        <Text style={[styles.farmersOpinionText, styles.centerText]}>
          Farmers Opinion Near You
        </Text>

        <View style={styles.blankBoxesContainer}>
          <View style={styles.blankBox1}>
            {comment1.comment !== "No comment available" ? (
              <Text style={styles.commentText}>
                {`${comment1.username || "Anonymous"}: ${comment1.comment}`}
              </Text>
            ) : (
              <Text style={styles.commentText}>No comment available</Text>
            )}
          </View>

          <View style={styles.blankBox2}>
            {comment2.comment !== "No comment available" ? (
              <Text style={styles.commentText}>
                {`${comment2.username || "Anonymous"}: ${comment2.comment}`}
              </Text>
            ) : (
              <Text style={styles.commentText}>No comment available</Text>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.seeMoreButton}
        onPress={() => navigation.navigate("CommentSectionScreen")}
      >
        <View style={styles.seeMoreContent}>
          <Image
            source={require("../assets/downArrow.png")}
            style={styles.downArrowIcon}
          />
          <Text style={styles.seeMoreText}>See More</Text>
          <Image
            source={require("../assets/downArrow.png")}
            style={styles.downArrowIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addSignButton}
        onPress={addComment}
      >
        <Image
          source={require("../assets/addSign.png")}
          style={styles.addSignImage}
        />
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("BeePage")}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../assets/bee.png')}
              style={styles.navIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.farmIconWrapper}>
            <Image
              source={require('../assets/farm.png')}
              style={styles.farmIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CropPage")}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../assets/crop.png')}
              style={styles.navIcon}
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

          {/* New Pollinator Tracker Menu Item */}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedPollinatorName}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#9d653a",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textRow: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  pollinatorBox: {
    width: 120, 
    height: 120, 
    backgroundColor: "#f8ca71", 
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5, 
    borderWidth: 2, 
    borderColor: "#5c3d2e", 
  },
  pollinatorImage: {
    marginTop: 0,
    width: "90%", 
    height: "90%",
    resizeMode: "contain",
    borderRadius: 5,
  },
  commentText: {
    color: "#333",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5, 
    paddingTop: 0, 
    paddingBottom: 0, 
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5, 
    width: "80%", 
  },
  blankBoxesContainer: {
    flexDirection: "column",
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 0,
    height: 230, 
  },
  
  blankBox1: {
    width: "80%", 
    height: 120,
    backgroundColor: "#f8ca71",
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "#5c3d2e",
    justifyContent: "center",
    alignItems: "center", 
    marginBottom: 10,
    padding: 10, 
  },
  
  blankBox2: {
    width: "80%", 
    height: 120,
    backgroundColor: "#f8ca71",
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "#5c3d2e",
    justifyContent: "center", 
    alignItems: "center", 
    padding: 10,
  },

  text: {
    color: "#333",      
    fontSize: 20,       
    padding: 15, 
    textAlign: "center",
    fontWeight: "bold",
  },
  
  animatedText: {
    fontSize: 12,
    color: "#f8ca71",
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20, 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#9d653a",
    borderRadius: 25,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  menuIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
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
    backgroundColor: "#563826",
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginTop: 100,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F9B233",
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    alignItems: "center", 
  },
  extraSpacing: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 25, 
    fontWeight: "bold",
    color: "#ffc107",
    marginBottom: 10,
    marginTop: -15, 
  },
  farmersOpinionText: {
    fontSize: 29, 
    fontWeight: "bold",
    color: "#ffc107",
    marginBottom: 10,
    marginTop:-20, 
  },
  centerText: {
    textAlign: "center",
  },
  seeMoreButton: {
    backgroundColor: "#563826",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    position: "absolute", 
    bottom: 105, 
    zIndex: 2, 
  },
  seeMoreContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
  },
  seeMoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9B233",
    marginHorizontal: 10, 
  },
  downArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", 
    backgroundColor: "#f8ca71",
    height: 90, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
  },
  
  iconWrapper: {
    width: 80,
    height: 80, 
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
  
  navIcon: {
    width: 200, 
    height: 200,
    resizeMode: "cover",
  },
  
  farmIcon: {
    width: 250, 
    height: 250,
    resizeMode: "cover",
  },
  addSignButton: {
    position: "absolute",
    bottom: 40, 
    right: 10,  
    bottom: 90, 
    zIndex: 2,
  },
  addSignImage: {
    width: 80,  
    height: 80, 
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
  menuContent: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  menuIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  menuText: {
    fontSize: 24,
    color: "#9d653a",
    marginVertical: 15,
    left: -10,
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
});

export default HomePage;
