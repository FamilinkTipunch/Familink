import { View } from 'react-native';
import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = require('./styles/styles');

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: !this.state.visible,
      });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} textContent={'Loading...'} />
      </View>
    );
  }
}
