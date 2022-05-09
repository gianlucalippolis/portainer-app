import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { store } from '../redux/store';
import { showMessage } from 'react-native-flash-message';
import Page from '../components/Page';
import InfoBox from '../components/InfoBox';
import Button from '../components/button/button';
import axios from 'axios';

interface Props {
    auth: any,
    navigation: any,
}

const HomeScreen: React.FC<Props> = ({
    auth, 
    navigation
}) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<any>([]);

    useEffect(() => {

        setIsLoading(true); 

        axios.get(auth.apiurl + '/endpoints', {

            headers: {
                Authorization: `Bearer ${auth.token}`
            },
            timeout: 10000

        }).then((response) => {

            setData(response.data[0]);
            setIsLoading(false);

        }).catch((error) => {

            console.log(error); 

            showMessage({
                message: error.message,
                type: 'danger',
            });
            
            setData(null)
            setIsLoading(false);

        });

    }, [])

    const doLogout = () => {

        store.dispatch({ type: "DO_LOGOUT" });

    }

    return (

        <Page> 
        {isLoading === true ? (

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#fff" style={{ marginTop: 80 }} />
            </View>
                
        ) : (

            <View style={{marginLeft:10, marginRight:10}}>
                {data !== null ? (

                    <>
                        <Text style={styles.pageTitle}>Portainer </Text>
                        <InfoBox label="API url" value={auth.apiurl} />
                        <InfoBox label="URL" value={data.URL} /> 
                        <InfoBox label="CPU" value={data.Snapshots[0].TotalCPU} />
                        <InfoBox label="Memory" value={data.Snapshots[0].TotalMemory} />
                        <TouchableOpacity onPress={() => navigation.navigate("Containers", {
                            endpointID: data.Id
                        })}>
                            <InfoBox label="Images" value={data.Snapshots[0].ImageCount} />
                        </TouchableOpacity>
                    </>

                ) : (
                    
                    <Text>No Data</Text> 

                )}
                <Button onPress={() => doLogout()}>
                    <Text>BACK TO SETUP PAGE</Text>
                </Button>
            </View>

        )}
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

export default connect(mapStateToProps)(HomeScreen);