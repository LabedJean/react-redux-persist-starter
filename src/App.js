import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from './stores/store';
import persistor from './stores/persistedStore';

import Router from './routes'
import './App.css';

class App extends Component {
  render() {
    console.log("jdsdsd", this.props)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
