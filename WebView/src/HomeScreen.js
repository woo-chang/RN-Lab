import React, { useState, useRef } from 'react';
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
    //         function send(event) {
    //             ReactNativeWebView.postMessage(event.data);
    //             // 리액트 네이티브 웹 뷰로 데이터를 보내는 코드
    //         }


    //         window.addEventListener('message', function(event) {
    //             send(event);
    //         }, false);
    //     </script>
    //     <button class='b' onClick='send()'>Send</button>
    // `;
    // // 연습용 코드

    const chatButton = () => {
        // 뒤로 가야한다면 뒤로 가기
        if(canGoBack) {
            webRef.current.goBack();
        }
        // 뒤로 가는동안 생기는 딜레이를 위한 timeOut
        setTimeout(() => {
            webRef.current.postMessage("채팅시작");
        }, 50)
        
    }

    const channelButton = () => {
        // 뒤로 가야한다면 뒤로 가기
        if(canGoBack) {
            webRef.current.goBack();
        }
        // 뒤로 가는동안 생기는 딜레이를 위한 timeOut
        setTimeout(() => {
            // Web으로 메세지 보내는 코드
            webRef.current.postMessage("채널추가");
        }, 50)
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
                    style={{opacity: 0}}
                    // automaticallyAdjustContentInsets={false} -> WebView 높이 조절 가능하도록 (상위 컴포넌트에 의해)
                    source={{ uri: key[0].uriSource }} // 보여주고자 하는 uri
                    // onMessage={(event) => Alert.alert(event.nativeEvent.data)} -> 메세지 수신되었을 때 동작
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
                <Pressable style={{backgroundColor: 'red'}} onPress={chatButton}>
                    <Ionicons name="arrow-back" size={24} color='white'/>
                </Pressable>
                <Pressable style={{backgroundColor: 'red'}}>
                    <Ionicons name="arrow-down" size={24} color='white'/>
                </Pressable>
                <Pressable style={{backgroundColor: 'red'}} onPress={channelButton}>
                    <Ionicons name="arrow-forward" size={24} color='white'/>
                </Pressable>
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