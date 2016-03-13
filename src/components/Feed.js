import React, {
  ListView,
  ScrollView,
  View,
  Text
} from 'react-native'

import FeedItem from './FeedItem'

const { object, array, number, any } = React.PropTypes

const Feed = React.createClass({
  propTypes: {
    items: array.isRequired,
    height: number.isRequired,
    styles: any.isRequired,
    auth: object
  },

  getInitialState: function () {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: this.hasDataChanged
    })

    return {
      dataSource: this.dataSource.cloneWithRows(this.props.items),
      listViewHeight: 0
    }
  },

  hasDataChanged: function (prev, next) {
    return prev !== next
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      dataSource: this.dataSource.cloneWithRows(nextProps.items)
    })
  },

  onScrollLayout: function (e) {
    this.setState({
      listViewHeight: e.nativeEvent.layout.height
    })
  },

  scrollToBottom: function () {
  },

  render: function () {
    return (
      <ListView
        dataSource={ this.state.dataSource }
        renderScrollComponent={ this.renderScrollComponent }
        renderRow={ this.renderItem }
        />
    )
  },

  renderScrollComponent: function () {
    return (
      <ScrollView ref='scroll' style={ [
        this.props.styles.feedScroller,
        { height: this.props.height - 150 }
      ] } />
    )
  },

  renderItem: function (item) {
    return (
      <FeedItem
        auth={ this.props.auth }
        item={ item }
        styles={ this.props.styles }
        />
    )
  }
})

export default Feed
