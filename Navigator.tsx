import React, { useEffect } from "react"; 
import { connect } from 'react-redux';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/LoginScreen';
import SetupScreen from './src/SetupScreen';
import HomeScreen from './src/screens/HomeScreen'; 
import Images from './src/screens/Images';
import Image from './src/screens/Image';

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
                    <Stack.Screen name="Images" component={Images} options={defaultOptions} />
                    <Stack.Screen name="Image" component={Image} options={defaultOptions} />
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