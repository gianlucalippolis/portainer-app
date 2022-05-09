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
    navigation: any;
}

const Containers: React.FC<Props> = ({
    auth,
    route,
    navigation
}) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [containers, setContainers] = React.useState<any>([]);

    useEffect(() => {

        setIsLoading(true); 

        axios.get(auth.apiurl + '/endpoints/' + route.params.endpointID + '/docker/containers/json?all=' + route.params.endpointID +'/', {headers: {
            
            Authorization: `Bearer ${auth.token}` 

        }}).then((response) => {

            setContainers(response.data);
            setIsLoading(false);

        }).catch((error) => { 

            showMessage({
                message: error.message,
                type: 'danger',
            });
            
            setContainers([])
            setIsLoading(false);
        });

    }, [])

    return (

        <Page> 
             {isLoading === true ? (

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#fff" style={{ marginTop: 80 }} />
                </View>
                    
            ) : (

                <View style={{marginLeft:10, marginRight:10}}>
                    <Text style={styles.pageTitle}>Images - endpoint #{route.params.endpointID} </Text>
                    {containers.map((container: any) => {

                        console.log(container); 

                        return (

                            <TouchableOpacity>
                                <InfoBox label={container.State} value={container.Image} />
                            </TouchableOpacity>

                        )
                    
                    })}
                    <Button onPress={() => navigation.navigate("HomeScreen")}>
                        <Text>Back</Text>
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

export default connect(mapStateToProps)(Containers);