import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; 

export const SplashScreen = () => {

    return (
        <View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:25, fontWeight:'bold', color:'#2A2E43'}}>
                PortainerAPP
            </Text>

            <ActivityIndicator size="large" color="#2A2E43" style={{marginTop:80}} />
        </View>
    );
  
}