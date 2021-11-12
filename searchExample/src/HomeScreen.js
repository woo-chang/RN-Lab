import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TextInput, StyleSheet, FlatList } from 'react-native';
import SearchDataList from './data/SearchDataList';
import FlatListItem from './FlatListItem';

const HomeScreen = () => {

    const [text, setText] = useState(null);
    const [firstFollow, setFirstFollow] = useState([]);
    const [inWord, setInWord] = useState([]);
    const [result, setResult] = useState([]);

    // text가 변할때 마다 일어나는 동작
    useEffect(() => {

        console.log(text)
        setFirstFollow([])
        setInWord([])
        setResult([])

        SearchDataList.map((item) => {
            console.log(item)
            if(matchName(item.name)) {
                console.log('match')
                setFirstFollow([item]);
            } else if(inName(item.name)) {
                console.log('hello')
                setInWord([item]);
            } else {
                console.log('아무것도 속하지 않음');
            }

            console.log(firstFollow)
            console.log(inWord)
        })

        setResult(firstFollow + inWord)
        console.log(result);

    }, [text])

    const matchName = (name) => {
        if(text == null) return false;
        const textLen = text.length;
        name = name.toLowerCase().substring(0, textLen);
        return name == text && textLen != 0;
    }
    
    const inName = (name) => {
        if(text == null) return false;
        const textLen = text.length;
        name = name.toLowerCase();
        return name.includes(text) && textLen != 0;
    }

    const changeText = (text) => {
        setText(text)
    }

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={changeText}
                placeholder="Search..."
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
    }
})

export default HomeScreen;