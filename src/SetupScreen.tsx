import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native';

import {showMessage} from 'react-native-flash-message';

import axios from 'axios';
import Page from './components/Page';

interface Props {
    route: any; 
    navigation: any
}

const SetupScreen: React.FC = ({
    route, 
    navigation
}) => {

  const [protocol, setProtocol] = React.useState<string>('https');
  const [url, setUrl] = React.useState<string>('service.porrini.info');
  const [port, setPort] = React.useState<string>('8443');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getFullUrl = () => {
    return protocol + '://' + url + ':' + port + '/api';
  };

  const save = () => {

    setIsLoading(true); 

    axios.get(getFullUrl() + '/status')
      .then(response => {

        console.log(response.data);

        showMessage({
            message: "Successfully connected to portainer V" + response.data.Version,
            type: 'success',
        });

        navigation.navigate("LoginScreen", {
            version: response.data.Version, 
            apiurl: getFullUrl()
        }); 
        
        setIsLoading(false); 

      })
      .catch(error => {

        showMessage({
          message: error.message,
          type: 'danger',
        });
        setIsLoading(false); 

      });

  };

  return (
      <Page>
          <View style={styles.pageContent}>
            <Text style={styles.pageTitle}>SETUP</Text>
            <View style={styles.containerInputUrl}>
                <TextInput
                style={styles.containerInputUrl.inputProtocol}
                onChangeText={setProtocol}
                placeholder="Url"
                value={protocol}
                />
                <TextInput
                style={styles.containerInputUrl.inputUrl}
                onChangeText={setUrl}
                placeholder="Url"
                value={url}
                />
                <TextInput
                style={styles.containerInputUrl.inputPort}
                onChangeText={setPort}
                placeholder="Port"
                keyboardType="numeric"
                value={port}
                />
            </View>
            <View style={styles.fullUrl}>
                <Text>{getFullUrl()}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={save}>
                {isLoading ? 
                    <ActivityIndicator size="small" color="#fff" /> 
                    : 
                    <Text>SAVE</Text>
                }
            </TouchableOpacity>
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

  containerInputUrl: {
    display: 'flex',
    flexDirection: 'row',
    margintop: 20,
    inputProtocol: {
      backgroundColor: '#eceff1',
      borderColor: 'gray',
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    inputUrl: {
      backgroundColor: '#eceff1',
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      flex: 1,
    },
    inputPort: {
      borderColor: 'gray',
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: '#eceff1',
    },
  },
  fullUrl: {
    backgroundColor: '#eceff1',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  button: {
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#00a8ff',
    textColor: '#fff',
    padding: 15,
    marginTop:15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SetupScreen;
