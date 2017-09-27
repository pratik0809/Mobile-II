import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Content from './Content';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate("SignIn")}
          title="Sign In"
          color="#841584"
        />
        <Button
          onPress={() => this.props.navigation.navigate("SignUp")}
          title="Sign Up"
          color="#841584"
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

const Routes = StackNavigator({
  Home: { screen: Home },
  Content: { screen: Content },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
})

export default Routes;
