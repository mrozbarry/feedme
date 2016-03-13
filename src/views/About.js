import React, { View, Text, Platform } from 'react-native'

const About = React.createClass({
  render: function () {
    return (
      <View>
        <Text>MrBarry Software { (new Date()).getYear() }</Text>
        <Text>Feed Me v{ 1 }</Text>
      </View>
    )
  }
})

export default About
