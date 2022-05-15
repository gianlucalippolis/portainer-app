import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Page from '../components/Page';
import InfoBox from '../components/InfoBox';
import Button from '../components/button/button';
import axios from 'axios';

interface Props {
    auth: any,
    route: any; 
    navigation: any
}

const Image: React.FC<Props> = ({
    auth,
    route,
    navigation
}) => {

    const { data } = route.params;

    const startContainer = () => { 

        const stopContainerUrl = auth.apiurl + '/endpoints/' + route.params.endpointID + '/docker/containers/' + data.Id + '/start';

        axios({
            method: 'post',
            url: stopContainerUrl,
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOjEsImV4cCI6MTY1MjY3NzExNX0.xq5BfZ9AWb-s2wfORAdtJzbFUjgh2IkKV-fulJr0pKM'
            }
        }).then((response) => {

            console.log(response); 

        }).catch((error) => { 

            showMessage({
                message: error.message,
                type: 'danger',
            });

        });

    }

    const stopContainer = () => {

        const stopContainerUrl = auth.apiurl + '/endpoints/' + route.params.endpointID + '/docker/containers/' + data.Id + '/stop';

        axios({
            method: 'post',
            url: stopContainerUrl,
            headers: { 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOjEsImV4cCI6MTY1MjY3NzExNX0.xq5BfZ9AWb-s2wfORAdtJzbFUjgh2IkKV-fulJr0pKM'
            }
        }).then((response) => {

            console.log(response); 

        }).catch((error) => { 

            showMessage({
                message: error.message,
                type: 'danger',
            });

        });

    }

    return (

        <Page> 
            <View style={{marginLeft:10, marginRight:10}}>
                <Text style={styles.pageTitle}>Image - {data.Image} </Text>
                <InfoBox label="Command" value={data.Command} /> 
                <InfoBox label="URL" value={data.Image} /> 
                <InfoBox label="State" value={data.State} /> 
                <InfoBox label="Status" value={data.Status} /> 
                <InfoBox label="Created" value={data.Created} /> 
                <Button type="success" onPress={() => startContainer()}>
                    <Text style={{color:'#fff'}}>START Container</Text>
                </Button>
                <Button type="danger" onPress={() => stopContainer()}>
                    <Text style={{color:'#fff'}}>STOP Container</Text>
                </Button>
                <Button onPress={() => navigation.pop()}>
                    <Text>Back to Images</Text>
                </Button>
            </View>
        </Page>
    );

}


const styles = StyleSheet.create({

    pageTitle: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },

});

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Image);