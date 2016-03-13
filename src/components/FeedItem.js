import React, {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import vagueTime from 'vague-time'

const { any, shape, string, object } = React.PropTypes

const FeedItem = React.createClass({
  propTypes: {
    styles: any.isRequired,
    item: shape({
      id: string.isRequired,
      uid: string.isRequired,
      streamid: string.isRequired,
      body: string.isRequired,
      createdAt: string.isRequired
    }).isRequired,
    auth: object
  },

  getInitialState: function () {
    return {
      timeAgo: this.getTimeAgo()
    }
  },

  getTimeAgo: function () {
    return vagueTime.get({
      from: (new Date()),
      to: (new Date(this.props.item.createdAt))
    })
  },

  componentDidMount: function () {
    this.updateTimeAgo = setInterval(() => {
      this.setState({ timeAgo: this.getTimeAgo() })
    }, 30 * 1000)
  },

  componentWillUnmount: function () {
    clearInterval(this.updateTimeAgo)
  },

  render: function () {
    const { auth, item, styles } = this.props
    const { timeAgo } = this.state

    return (
      <View style={ styles.feedItem }>
        <Text>{ timeAgo }, { item.uid === auth.uid ? 'You' : item.uid } said:</Text>
        { this.renderBody(item.body, styles) }
      </View>
    )
  },

  renderBody: function (body, styles) {
    if (body.startsWith('http')) {
      return (
        <View>
          <Image style={ styles.feedImage } source={ { uri: body } } resizeMode='cover' />
        </View>
      )
    } else {
      return (
        <Text style={ styles.feedBody }>{ body }</Text>
      )
    }
  }
})

export default FeedItem
