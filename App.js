import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

export default  function App() {
  return (
    <Provider store = {store}>
    <Main/>
    </Provider>
  );
}


