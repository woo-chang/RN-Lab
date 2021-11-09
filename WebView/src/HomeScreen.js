import React, {useState, useRef} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {

    const [webRef, setWebRef] = useState(null);

    const jsCode = `document.querySelector('.b').click();`;
    // 클래스가 b인 태그 찾아서 색상을 보라색으로 변경하는 코드

    const html = `
        <script>
            function send() {
                ReactNativeWebView.postMessage('hello react-native!!');
                // 리액트 네이티브 웹 뷰로 데이터를 보내는 코드
            }


            window.addEventListener('message', function(event) {
                send();
            });
        </script>
        <button class='b' onClick='send()'>Send</button>
    `;

    const pressButton = () => {
        webRef.postMessage("h");
    }

    return (
        <SafeAreaView style={styles.container}>
            <WebView 
                ref={(r) => setWebRef(r)}
                style={styles.container}
                source={{html}}
                onMessage={(event) => Alert.alert(event.nativeEvent.data)}
                javaScriptEnabled={true} // 자바스크립트를 사용할 수 있도록 ?
                injectedJavaScript={jsCode} // 시작할 때 
            />
            <View style={styles.bottom}>
                <Pressable style={{backgroundColor: 'red'}} onPress={pressButton}>
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </Pressable>
                <Ionicons name="arrow-down" size={24} color='white'/>
                <Ionicons name="arrow-forward" size={24} color='white'/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottom: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default HomeScreen;