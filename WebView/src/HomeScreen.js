import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Alert, Pressable, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import key from './key'

const HomeScreen = () => {

    const webRef = useRef();
    const [canGoBack, setCanGoBack] = useState(null);

    // // 연습용 코드
    // const jsCode = `document.querySelector('.b').click();`;
    // // 클래스가 b인 태그 찾아서 색상을 보라색으로 변경하는 코드

    // const html = `
    //     <script>
    //         function send() {
    //             ReactNativeWebView.postMessage('hello react-native!!');
    //             // 리액트 네이티브 웹 뷰로 데이터를 보내는 코드
    //         }


    //         window.addEventListener('message', function(event) {
    //             send();
    //         });
    //     </script>
    //     <button class='b' onClick='send()'>Send</button>
    // `;
    // // 연습용 코드

    const pressButton = () => {
        // Web으로 메세지 보내는 코드
        // webRef.current.postMessage("카카오톡 버튼 클릭");
        if(canGoBack) {
            webRef.current.goBack();
            alert('뒤로 이동하였습니다.')
        } else {
            alert('더이상 뒤로 갈 수 없습니다.')
        }
    }

    const onShouldStartLoadWithRequest = (event) => {
        if (event.url.startsWith('http://') || event.url.startsWith('https://') || event.url.startsWith('about:blank')) {
            return true;
        }

        if (Platform.OS === 'android') {
            const SendIntentAndroid = require('react-native-send-intent');
            SendIntentAndroid.openChromeIntent(event.url).then(isOpened => {
                if (!isOpened) {
                    alert('앱 실행이 실패했습니다.');
                }
            }).catch(err => {
                console.log(err);
            });

            return false;
        } else {
            Linking.openURL(event.url).catch(err => {
                alert('앱 실행이 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.');
            })
            return false;
        }
    }

    const onNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack);
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={{width: 130, height: 115}}> (WebView 높이 조절) */}
                <WebView
                    ref={webRef}
                    // automaticallyAdjustContentInsets={false} -> WebView 높이 조절 가능하도록 (상위 컴포넌트에 의해)
                    source={{uri: key[0].uriSource}} // 보여주고자 하는 uri
                    onMessage={(event) => Alert.alert(event.nativeEvent.data)}
                    javaScriptEnabled={true} // 자바스크립트를 사용할 수 있도록 ?
                    //injectedJavaScript={jsCode} // 시작할 때
                    originWhitelist={['kakaoplus://', 'https://*', 'http://*', 'intent://*']}
                    onShouldStartLoadWithRequest={event => {
                        return onShouldStartLoadWithRequest(event);
                    }}
                    onNavigationStateChange={onNavigationStateChange}
                />
            {/* </View> */}
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
        flex: 1,
        backgroundColor: 'red'
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