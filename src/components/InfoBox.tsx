import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {

    label: string; 
    value: string;

}

const InfoBox: React.FC<Props> = ({

    label, 
    value
    
}) => {

    return (
        <View style={styles.box}>
            <Text style={styles.label}>{ label }</Text>
            <Text style={styles.value}>{ value }</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        display: 'flex',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#eceff1',
    },
    label: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        width: 100
    },
    value: {
        color: '#fff',
        fontSize: 15,
        flex: 1,
        padding: 10
    }
});

export default InfoBox; 