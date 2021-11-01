import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/HomeScreen'
import ImageScreen from './src/ImageScreen';

export default function App() {
  return (
    // <HomeScreen /> DropDown을 위한 Screen
    <ImageScreen /> // Image Slider를 위한 Screen
  );
}