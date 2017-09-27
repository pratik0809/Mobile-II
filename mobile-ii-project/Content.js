import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Content Page'
  }
  componentDidMount() {
    const token = AsyncStorage.getItem('token');
    axios.post('https://mobile-server-ii.herokuapp.com/users',{token})
      .then((response) => {
        if(response.data.code === 401) {
          throw "Unauthorized User"
        }
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
        <Text>Content</Text>
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

export default Content;
