import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import GalleryScreen from './src/screens/GalleryScreen';
import ImageViewer from './src/components/ImageViewer';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {

  const ObservedApp = observer(() => {
    return (
      <>
        <GalleryScreen />
        <ImageViewer />
      </>
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <ObservedApp />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
})

export default App;
