import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, Animated, 
  TouchableWithoutFeedback, ScrollView, Modal
} from 'react-native';
import monthsWithPollinators from '../assets/monthlyPollinator';
import diyProjects from '../assets/diyProjects';

const MorePollinator = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];
  const [currentMonth, setCurrentMonth] = useState('');
  const [pollinators, setPollinators] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date();
    const monthName = monthNames[date.getMonth()];
    setCurrentMonth(monthName);

    const monthData = monthsWithPollinators.find(m => m.month === monthName);
    if (monthData) {
      setPollinators(monthData.pollinators.slice(0, 8));
    }
  }, []);

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setCurrentStepIndex(0);
    setModalVisible(true);
  };

  const closeProject = () => {
    setModalVisible(false);
    setSelectedProject(null);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (currentStepIndex < selectedProject.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButtonContainer} onPress={toggleMenu}>
        <Image source={require("../assets/menuButton.png")} style={styles.menuButton} />
      </TouchableOpacity>

      {/* Overlay to close menu */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Title for Top Box */}
      <Text style={styles.sectionTitle}>This Month's Pollinators</Text>

      {/* Top Box with Pollinators */}
      <View style={styles.topBox}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{currentMonth}</Text>
        </View>
        <View style={styles.pollinatorList}>
          {pollinators.length > 0 && (
            <View style={styles.pollinatorContainer}>
              <View style={styles.column}>
                {pollinators.slice(0, 4).map((pollinator, index) => (
                  <Text key={index} style={styles.pollinatorText}>{pollinator}</Text>
                ))}
              </View>
              <View style={styles.column}>
                {pollinators.slice(4, 8).map((pollinator, index) => (
                  <Text key={index + 4} style={styles.pollinatorText}>{pollinator}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Title for Bottom Box */}
      <Text style={styles.sectionTitle1}>DIY Pollinator Projects</Text>

      {/* Bottom Box with Scrollable DIY Projects */}
      <View style={styles.bottomBox}>
        <ScrollView style={styles.scrollContainer}>
          {diyProjects.map((project, index) => (
            <TouchableOpacity key={index} style={styles.optionBox} onPress={() => openProject(project)}>
              <Text style={styles.optionText}>{project.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Modal for DIY Project Details */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedProject && (
              <>
                <Text style={styles.modalTitle}>{selectedProject.name}</Text>
                <View style={styles.card}>
                  <Text style={styles.modalStep}>{`${currentStepIndex + 1}. ${selectedProject.steps[currentStepIndex]}`}</Text>
                </View>
                <View style={styles.modalNavigation}>
                  <TouchableOpacity onPress={prevStep} disabled={currentStepIndex === 0} style={styles.navButton}>
                    <Text style={[styles.navButtonText, currentStepIndex === 0 && styles.disabledText]}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={nextStep} disabled={currentStepIndex === selectedProject.steps.length - 1} style={styles.navButton}>
                    <Text style={[styles.navButtonText, currentStepIndex === selectedProject.steps.length - 1 && styles.disabledText]}>Next</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={closeProject} style={styles.redCloseButton}>
                  <Text style={styles.redCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Side Menu */}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuItemsContainer}>
          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: "HomePage" }] })} style={styles.menuItem}>
            <Image source={require("../assets/HomeIcon.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>Home Page</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SettingPage")} style={styles.menuItem}>
            <Image source={require("../assets/SettingsIcon.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ChatbotPage")} style={styles.menuItem}>
            <Image source={require("../assets/chatBox.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>ChatBot</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("PollinatorTracker")} style={styles.menuItem}>
            <Image source={require("../assets/pollinatorTracker.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>Pollinator Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("BeePage")} style={styles.menuItem}>
            <Image source={require("../assets/goBack.png")} style={styles.menuIcon} />
            <Text style={styles.menuText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signOutContainer}>
          <TouchableOpacity onPress={() => signOutUser()}>
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
    backgroundColor: '#9d653a',
    alignItems: 'center',
    paddingTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f8ca71',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalStep: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b5e3c',
    textAlign: 'center',
  },
  modalNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  navButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#7d4f2f',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffc107',
  },
  disabledText: {
    color: '#aaa',
  },
  topBox: {
    width: '90%',
    height: '35%',
    backgroundColor: '#f8ca71',
    borderRadius: 20,
    marginTop: 80,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#7d4f2f',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: 10,
    width: '80%',
    backgroundColor: '#7d4f2f',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 50,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffc107',
    textAlign: 'center',
  },
  pollinatorList: {
    marginTop: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pollinatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  pollinatorText: {
    fontSize: 18,
    color: '#8b5e3c',
    paddingVertical: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomBox: {
    width: '90%',
    height: '40%',
    backgroundColor: '#5c3d2e',
    borderRadius: 20,
    marginTop: 50,
    borderWidth: 5,
    borderColor: '#f8ca71',
    padding: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  optionBox: {
    width: '100%',
    backgroundColor: '#7d4f2f',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffc107',
    textAlign: 'center',
  },
  redCloseButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  redCloseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
  signOutText: {
    fontSize: 24,
    color: "#9d653a",
    marginVertical: 20,
    fontWeight: "bold", 
  },
  menuText: {
    fontSize: 24,
    color: "#9d653a",
    marginVertical: 15,
    left: -15,
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
  modalTitle: {
    fontWeight: 'bold',
    color: '#9d653a',
    fontSize: 20, 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: -70,
    backgroundColor: '#7d4f2f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  sectionTitle1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: -40,
    backgroundColor: '#7d4f2f',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});




export default MorePollinator;
