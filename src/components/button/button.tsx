import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    children: React.ReactNode;
    onPress: () => void;
}

const Button: React.FC<Props> = ({
    children,
    onPress
}) => {

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    ); 

}

const styles = StyleSheet.create({

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

export default Button; 