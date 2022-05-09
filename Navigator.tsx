import React, { useEffect } from "react"; 
import LoginScreen from './src/LoginScreen';
import SetupScreen from './src/SetupScreen';
import HomeScreen from './src/screens/HomeScreen'; 
import Containers from './src/screens/Containers';

import {NavigationContainer} from '@react-navigation/native';
import { connect } from 'react-redux';

import {useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface Props {
    auth: any
}

const Stack = createNativeStackNavigator();
  
const Navigator: React.FC<Props> = ({
    auth
}) => {

    useEffect(() => {


    });

    const navigationRef = useNavigationContainerRef();

    const defaultOptions = {
        headerShown: false,
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {auth?.token ? (
                <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={defaultOptions} />
                    <Stack.Screen name="Containers" component={Containers} options={defaultOptions} />
                </>

                ) : (
                <>
                    <Stack.Screen name="SetupScreen" component={SetupScreen} options={defaultOptions} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={defaultOptions} />
                </>
                )}
                
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const mapStateToProps = state => ({ 
    auth: state.auth
  })
  
export default connect(mapStateToProps)(Navigator);