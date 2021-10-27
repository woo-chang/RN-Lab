import React, {useEffect, useState} from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

const HomeScreen = () => {

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, [])

    const registerForPushNotificationsAsync = async() => {
      let token; // undefined initially
      if (Constants.isDevice) { // 에뮬레이터나 시뮬레이터 알림 지원 X
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") { // 권한 부여 됬는지 확인 후 권한을 요청
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        // 아직 부여되지 않은 경우 알림 푸시 토큰을 받지 못했다고 경고
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    }

    // Android만 가능
    // 2초 후 알람 전송
    const buttonClick = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Test!',
                body: 'Wake up Everybody!'
            },
            trigger: {
                seconds: 2
            }
        })
        
    }

    const sendNotification = async() => {
        const message = {
          to: "token", // 디바이스에서 확인할 수 있는 토근을 입력
          // 실제 앱에 적용한다면 토큰을 인자로 받아서 전송할 수 있도록 처리
          sound: "default",
          title: "Expo Noti Programming",
          body: "Have a Nice Day!",
          data: { someData: "goes here" },
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={sendNotification}>
                <Text style={{color: 'white', fontSize: 16}}>Button</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HomeScreen;
