'use strict'

import React, { ToolbarAndroid } from 'react-native'

import styles from '../styles/HeaderStyles'

const { object, any, func } = React.PropTypes

const Header = React.createClass({
  propTypes: {
    openTab: func.isRequired,
    navigator: any.isRequired,
    auth: object
  },

  getActions: function () {
    return [
      { title: 'Home', show: 'always' },
      // { title: 'Login', show: 'always' },
      { title: 'About', show: 'always' }
    ]
  },

  createOnActionSelected: function (actions) {
    return (position) => {
      this.props.openTab(actions[position].title.toLowerCase())
    }
  },

  render: function () {
    const actions = this.getActions()

    return (
      <ToolbarAndroid
        title='Feed Me'
        actions={ actions }
        style={ styles.toolbar }
        onActionSelected={ this.createOnActionSelected(actions) }
        />
    )
  }
})

export default Header
