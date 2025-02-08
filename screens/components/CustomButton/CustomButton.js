import React from "react";
import { View, Text, StyleSheet, Pressable} from "react-native";


const CustomButton = ({ onPress, text }) => {

  return (
    <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9f0df",

        width: '100%',
        padding: 15,
        marginVertical: 10,

        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        color: 'e8e8e8',
    }

});

export default CustomButton;
