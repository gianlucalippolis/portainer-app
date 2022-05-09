import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import Page from "./components/Page";
import Button from "./components/button/button";
import axios from 'axios';
import { store } from "./redux/store"; 

interface Props {
  route: any;
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({
  route, 
  navigation
}) => {
    
  const [url, setUrl] = React.useState<string>(
    'https://service.porrini.info:8443',
  );
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const ApiAuth = () => {
    console.log('porcoduio');

    axios.post(route.params.apiurl + '/auth', {
        Username: username,
        Password: password,
      })
      .then(function (response) {

        store.dispatch({

          type: "SET_TOKEN", 
          payload: {
            token: response.data.jwt, 
            version: route.params.version,
            apiurl: route.params.apiurl
          },

        }); 
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <Page>
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>LOGIN to: </Text>
        <Text style={styles.pageSubtitle}>Portainer: {route.params.version}</Text>
        <Text style={styles.pageSubtitle}>API url: {route.params.apiurl}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Username"
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Password"
          value={password}
        />
        <Button onPress={ApiAuth}>
          <Text>LOGIN</Text>
        </Button>
        <Button onPress={() => navigation.navigate("SetupScreen")}>
          <Text>BACK TO SETUP PAGE</Text>
        </Button>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({


  pageContent: {
    flex:1, 
    margin:10,
  },

  pageTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  pageSubtitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00a8ff',
    textColor: '#fff',
    padding: 15,
    marginTop:20, 
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
