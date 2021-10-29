import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'

import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker'

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>React native dropdown picker</Text>
        <DropDownPicker
          items={[
            { label: "English", value: "en" },
            { label: "Deutsch", value: "de" },
            { label: "French", value: "fr" },
          ]}
          defaultIndex={1}
          containerStyle={{ height: 40 }}
          onChangeItem={(item) => console.log(item.label, item.value)}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;