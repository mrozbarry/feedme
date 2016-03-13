import React, {
  View,
  TextInput,
  Picker,
  TouchableHighlight,
  Text
} from 'react-native'
import Firebase from 'firebase'

import Feed from '../components/Feed'

import styles from '../styles/HomeStyles'

const { object, number } = React.PropTypes

const Home = React.createClass({
  propTypes: {
    firebase: object.isRequired,
    height: number.isRequired,
    auth: object
  },

  getInitialState: function () {
    return {
      dataSource: null,
      items: [],
      filters: [],
      textFocus: false,
      stream: 'all',
      body: ''
    }
  },

  componentWillMount: function () {
    this.unsubscribers = []
  },

  componentDidMount: function () {
    const { firebase } = this.props

    const query = firebase.child('/items')
    query.on('child_added', this.onItemAdded)
    query.on('child_removed', this.onItemRemoved)

    this.unsubscribers.push(() => {
      query.off('child_added', this.onItemAdded)
    })
  },

  componentWillUnmount: function () {
    this.unsubscribers.forEach((unsubscribe) => {
      unsubscribe()
    })
  },

  onItemAdded: function (snapshot) {
    const { items } = this.state

    this.setState({ items: items.concat(snapshot.val()) })
  },

  onItemRemoved: function (snapshot) {
    const { items } = this.state

    const removeId = snapshot.key()

    const nextItems = items.reduce((selected, item) => {
      if (item.id === removeId) {
        return selected
      }

      return selected.concat(item)
    }, [])

    this.setState({ items: nextItems })
  },

  addItem: function (body) {
    const { firebase, auth } = this.props
    const ref = firebase.child('/items').push()
    const newItem = {
      id: ref.key(),
      uid: auth.uid,
      streamid: 'all',
      body: body,
      createdAt: (new Date()).toISOString(),
      pushedAt: Firebase.ServerValue.TIMESTAMP
    }

    ref.update(newItem)
  },

  onBodyChange: function (value) {
    this.setState({ body: value })
  },

  onSubmit: function () {
    const { body } = this.state

    if (body) {
      this.refs.input.blur()
      this.setState({ body: '' })
      this.addItem(body)
    }
  },

  onInputFocus: function () {
    this.setState({ inputFocus: true })
  },

  onInputBlur: function () {
    this.setState({ inputFocus: false })
  },

  render: function () {
    const availableHeight = this.props.height - (
      this.state.inputFocus ? 150 : 0
    )
    return (
      <View>
        <Feed
          auth={ this.props.auth }
          items={ this.state.items }
          height={ availableHeight }
          styles={ styles }
          />

        <View style={ styles.form }>
          <Picker selectedValue={ this.state.stream }>
            <Picker.Item label='All' value='all' />
          </Picker>

          <View style={ styles.submission }>
            <TextInput
              ref='input'
              placeholder='Add to stream....'
              style={ styles.input }
              value={ this.state.body }
              onChangeText={ this.onBodyChange }
              autoCorrect={ false }
              editable={ this.props.auth !== null }
              multiline
              />
            <TouchableHighlight onPress={ this.onSubmit } style={ styles.submit }>
              <Text style={ styles.submitText }>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
})

export default Home
