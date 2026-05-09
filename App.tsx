import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}

export default App
