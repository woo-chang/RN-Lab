import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import key from './key';
import Background from '../src/images/logo.jpg'

function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;

    window.Kakao.Channel.createChatButton({
      container: '#kakao-talk-channel-chat-button',
      channelPublicId: key[0].channelPublicId, // Kakao Channel 홈 URL에 명시된 id로 설정
      title: 'consult',
      size: 'large',
      color: 'mono',
      shape: 'pc',
      supportMultipleDensities: true,
    });

    window.Kakao.Channel.createAddChannelButton({
      container: '#create-channel-add-button',
      channelPublicId: key[0].channelPublicId, // Kakao Channel 홈 URL에 명시된 id로 설정
      size: 'large',
      supportMultipleDensities: true,
    })
  
    document.body.appendChild(script);
    document.body.removeChild(script);
  }, [])

  // 앱에서 요청이 들어왔을 때의 Event 지정
  useEffect(() => {
    function messageAction(event) {
      if(event.data === '채팅시작') {
        document.getElementById('start-chat-button').click();
      } else if(event.data === '채널추가') {
        document.getElementById('add-channel-button').click();
      } else {
        console.log(event.data);
      }
    }

    window.addEventListener('message', function(event) {
      messageAction(event);
    }, false);
  }, [])

  const startChat = () => {
    window.Kakao.Channel.chat({
      channelPublicId: key[0].channelPublicId, // Kakao Channel 홈 URL에 명시된 id로 설정
    })
  }

  const addChannel = () => {
    window.Kakao.Channel.addChannel({
      channelPublicId: key[0].channelPublicId, // Kakao Channel 홈 URL에 명시된 id로 설정
    })
  }

  return (
    <div className="App" style={{
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
      }}>
        <div id="kakao-talk-channel-chat-button"></div>
        <div id="create-channel-add-button"></div>
        <button id="start-chat-button" onClick={startChat}>Chat</button>
        <button id="add-channel-button" onClick={addChannel}>Channel</button>
    </div>
  );
}

export default App;
