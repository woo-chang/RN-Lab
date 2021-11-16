import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TextInput, StyleSheet, FlatList } from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';;
import SearchDataList from './data/SearchDataList';
import FlatListItem from './FlatListItem';
const KEYS_TO_FILTERS = ['name'];

const HomeScreen = () => {

    const [text, setText] = useState(' ')

    const result = SearchDataList.filter(createFilter(text, KEYS_TO_FILTERS));

    return (
        <SafeAreaView>
            <SearchInput
                onChangeText={(term) => setText(term)}
                style={styles.searchInput}
                placeholder="Type a message to search"
            />

            <View style={styles.line}/>

            <FlatList
                data={result}
                renderItem={(data) => <FlatListItem data={data} />}
                keyExtractor={(item) => item.id}
            />

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    line: {
        width: '100%',
        height: 10,
        backgroundColor: 'red'
    },
    searchInput:{
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    }
})

export default HomeScreen;