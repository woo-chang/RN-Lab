import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import key from './key';
import Background from '../src/images/logo.jpg'

function App() {

  console.log(key)

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

  return (
    <div className="App" style={{
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
      }}>
        <div id="kakao-talk-channel-chat-button"></div>
        <div id="create-channel-add-button"></div>
    </div>
  );
}

export default App;
