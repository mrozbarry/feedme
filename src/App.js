'use strict'

import React, {
  Navigator,
  View,
  Text,
  AsyncStorage,
  Dimensions
} from 'react-native'

import Firebase from 'firebase'

import Header from './views/Header'
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'

const App = React.createClass({
  getInitialState: function () {
    return {
      auth: null,
      layout: Dimensions.get('window')
    }
  },

  persistState: function (state, reducer) {
    if (!reducer) {
      reducer = (oldState) => { return oldState }
    }
    AsyncStorage.setItem('appState', JSON.stringify(reducer(state)), (err) => {
      if (!err) {
        return
      }
      console.warn('setItem.appState.err', err)
    })
  },

  componentWillMount: function () {
    const config = require('../firebase.json')
    this.firebase = new Firebase(`https://${ config.firebase }.firebaseio.com/`)

    this.firebase.authAnonymously((err, authData) => {
      this.setState({ auth: authData })
    })
  },

  componentWillUpdate: function (nextProps, nextState) {
    this.persistState(nextState)
  },

  componentWillUnmount: function () {
    this.persistState(this.state)
  },

  getRoutes: function () {
    const availableHeight = this.state.layout.height - 56
    return [
      { id: 'home', title: 'Home', render: () => {
        return (
          <Home firebase={ this.firebase } auth={ this.state.auth } height={ availableHeight } />
        )
      } },
      { id: 'login', title: 'Login', render: () => <Login firebase={ this.firebase } height={ availableHeight } /> },
      { id: 'about', title: 'About', render: () => <About height={ availableHeight } /> },
    ]
  },

  onLayoutChange: function (event) {
    const dimensions = Dimensions.get('window')
    this.setState({
      layout: dimensions
    })
  },

  openTab: function (navigator, name) {
    const routes = navigator.getCurrentRoutes()
    const route = routes.find((r) => {
      return r.id.toLowerCase() === name.toLowerCase()
    })
    if (route) {
      navigator.jumpTo(route)
    }
  },

  render: function () {
    const routes = this.getRoutes()

    return (
      <Navigator
        initialRoute={ routes[0] }
        initialRouteStack={ routes }
        renderScene={ this.renderScene }
        />
    )
  },

  renderScene: function (route, navigator) {
    const openTab = (id) => {
      this.openTab(navigator, id)
    }

    return (
      <View onLayout={ this.onLayoutChange }>
        <Header
          navigator={ navigator }
          auth={ this.state.auth }
          openTab={ openTab }
          />
        { this.renderRoute(route, navigator) }
      </View>
    )
  },

  renderRoute: function (route, navigator) {
    const routeId = route ? route.id : 'home'
    const routes = this.getRoutes()

    for(const possibleRoute of routes) {
      if (route.id === possibleRoute.id) {
        return possibleRoute.render()
      }
    }

    return (
      <View>
        <Text>Route { route ? route.id : 'none' }</Text>
      </View>
    )
  }
})

export default App
