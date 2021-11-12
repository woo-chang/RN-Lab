import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlatListItem = ({data}) => {

    const listData = data.item;

    console.log(listData)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{listData.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: '500'
    }
})

export default FlatListItem;