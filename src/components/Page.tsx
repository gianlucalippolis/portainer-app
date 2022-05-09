import React from "react"; 

import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

interface Props {

    children: React.ReactNode;

}

const Page: React.FC<Props> = ({ children }) => {

    return (

        <View style={{flex: 1}}>
            <SafeAreaView style={styles.SafeAreaView}>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {children}
                </ScrollView>
            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    SafeAreaView: {
      backgroundColor: '#282e33',
      flex: 1,
    },
});

export default Page; 