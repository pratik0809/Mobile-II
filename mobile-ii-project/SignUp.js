import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }

    this.signUp = this.signUp.bind(this);
  }
  static navigationOptions = {
    title: 'Sign Up'
  }

  signUp() {
    axios.post('https://mobile-server-ii.herokuapp.com/users',{
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        if(response.data.code === 11000) {
          return this.setState({
            error: 'Email is already taken'
          });
        }
        if(response.data.errors) {
          throw response.data.errors.email.message;
        }

        AsyncStorage.setItem('token', response.data.token);
        this.props.navigation.navigate("Content");
        console.log(response.data);
      })
      .catch((err) => {
        console.log('Error')
        this.setState({
          error: err
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
        onPress={this.signUp}
        title="Sign Up"
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

export default SignUp;
