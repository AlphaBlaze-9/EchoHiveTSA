import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PollinatorTracker = () => {
  const [devices, setDevices] = useState([
    { id: "1", name: "ESP32 Device 1" },
  ]);
  const [deviceCounts, setDeviceCounts] = useState({
    "1": "N/A", 
  });
  const [distance, setDistance] = useState(null); 
  const [isConnected, setIsConnected] = useState(false); 
  const [scanning, setScanning] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    
    const ESP32_IP = "192.168.0.100"; 
    const ws = new WebSocket(`ws://${ESP32_IP}:81`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      console.log("Distance received:", event.data);
      setDistance(event.data); 
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const ESP32_IP = "192.168.0.100"; 
    const fetchCounts = () => {
      fetch(`http://${ESP32_IP}/count`)
        .then((response) => response.text())
        .then((count) => {
          setDeviceCounts((prev) => ({ ...prev, "1": count })); 
        })
        .catch((error) => console.error(error));
    };

    const interval = setInterval(fetchCounts, 5000); 

    return () => clearInterval(interval);
  }, []);

  const renderDevice = ({ item }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{item.name || "Unnamed Device"}</Text>
      <Text style={styles.deviceDistance}>
        Object Count: {deviceCounts[item.id] ? `${deviceCounts[item.id]}` : "N/A"}
      </Text>
      {item.id === "1" && (
        <Text style={styles.deviceDistance}>
          Ultrasonic Distance: {distance !== null ? `${distance} cm` : "N/A"}
        </Text>
      )}
    </View>
  );

  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onBackPressed} style={styles.backArrowContainer}>
        <Image
          source={require("../assets/BackArrow.png")}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.title}>Pollinator Tracker</Text>

      <View style={styles.boxContainer}>
        <Button
          title={scanning ? "Scanning..." : "Start Scan"}
          onPress={() => {}}
          disabled={scanning}
          color="#ffc107"
        />
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={renderDevice}
          contentContainerStyle={styles.listContainer}
        />
        <Text style={styles.status}>
          WebSocket: {isConnected ? "Connected" : "Disconnected"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      backgroundColor: "#9d653a",
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
      width: "105%", 
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
    listContainer: {
      paddingBottom: 20,
    },
    deviceContainer: {
      backgroundColor: "#fff",
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
      width: "100%", 
    },
    deviceName: {
      fontSize: 18,
      fontWeight: "600",
    },
    deviceDistance: {
      fontSize: 16,
      marginTop: 5,
      color: "#555",
    },
    status: {
      marginTop: 20,
      fontSize: 16,
      textAlign: "center",
      color: "#fff",
    },
  });
  

export default PollinatorTracker;
