import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, StatusBar } from 'react-native';
import MainNavigator from './navigators/MainNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar /> */}
      <MainNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
});