import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView originWhitelist={['*']} source={{ uri: 'https://www.google.com.tw/' }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;