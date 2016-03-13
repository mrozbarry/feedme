'use strict'

import React, {
  View,
  Text,
  Navigator,
  StyleSheet
} from 'react-native'

const { object } = React.PropTypes

const Login = React.createClass({
  propTypes: {
    firebase: object.isRequired
  },

  render: function () {
    return (
      <View>
        <Text>I'm in Login.js</Text>
      </View>
    )
  }
})

export default Login
