import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    children: React.ReactNode;
    onPress: () => void;
    type?: 'success' | 'info' | 'warning' | 'danger';
}

const Button: React.FC<Props> = ({
    children,
    onPress,
    type = 'info'
}) => {

    const color = () => {

        let style; 

        switch (type) {

            case 'success':
                style = { backgroundColor: '#00C853' };
                break;
            case 'info':
                style = { backgroundColor: '#00a8ff' };
                break;
            case 'warning':
                style = { backgroundColor: '#FF9800' };
                break;
            case 'danger':
                style = { backgroundColor: '#F44336', textColor: '#fff' };
                break;
            default: 
                style = { backgroundColor: '#00a8ff' }; 
                break; 

        }

        return style; 

    }

    return (
        <TouchableOpacity 
            style={[color(), styles.button]}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    ); 

}

const styles = StyleSheet.create({

    button: {
      padding: 15,
      marginTop:20, 
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Button; 