import React, { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'ivory'
  },
  submission: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 200
  },
  input: {
    height: 50,
    flex: 4
  },
  submit: {
    height: 50,
    flex: 1,
    padding: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'cadetblue'
  },
  submitText: {
    color: 'white',
    justifyContent: 'center'
  },
  feedScroller: {
    paddingBottom: 10
  },
  feedItem: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    marginBottom: 10,
    elevation: 2,
    backgroundColor: 'ghostwhite'
  },
  feedBody: {
    fontSize: 20
  },
  feedImage: {
    width: 250,
    height: 250,
    marginLeft: 20
  }
})

export default styles
