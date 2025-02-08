import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU0saDB1T-BIVpK5VgilpwtQOnEiD039U",
  authDomain: "echohive-dc312.firebaseapp.com",
  projectId: "echohive-dc312",
  storageBucket: "echohive-dc312.firebasestorage.app",
  messagingSenderId: "1044630254983",
  appId: "1:1044630254983:web:dad14ef8e6cda6b0158f22",
  measurementId: "G-KKZ1WMQ0WY",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
