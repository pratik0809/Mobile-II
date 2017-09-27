import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }

    this.signIn = this.signIn.bind(this);
  }
  static navigationOptions = {
    title: 'Sign In'
  }
  signIn() {
    axios.post('https://mobile-server-ii.herokuapp.com/signin',{
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        if(response.data.code === 401) {
          throw "Unauthorized User"
        }

        AsyncStorage.setItem('token', response.data.token);
        this.props.navigation.navigate("Content");

      })
      .catch((err) => {
        this.setState({
          error: err.toString()
        });
      })
  }
  render() {
    return (
      <View style={styles.container}>
      <Text>{this.state.error ? this.state.error : null}</Text>
      <Text>Email</Text>
      <TextInput
        style={{width: 240, height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
      />
      <Text>Password</Text>
      <TextInput
        style={{width: 240, height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        secureTextEntry={true}
      />
      <Button
        onPress={this.signIn}
        title="Sign In"
        color="blue"
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignIn;
