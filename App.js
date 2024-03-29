import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Loading} from './Components/LoadingComponent';

const {persistor,store} = ConfigureStore();

export default  function App() {
  return (
    <Provider store = {store}>
      <PersistGate
        loading = {<Loading/>}
        persistor = {persistor}
      >
        <Main/>
      </PersistGate>
    </Provider>
  );
}


