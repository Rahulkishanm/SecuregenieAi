import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'


function App() {

// Send a message to the iframe
function sendMessage(iframe,message) {
    iframe.contentWindow.postMessage({
        type: 'getGeminiResp',
        text: message
    }, '*');  // Consider using a more specific target origin in production
}

// Call sendMessage to send a message


useEffect(()=>{
  chrome.storage.session.get('prompt', ({ prompt }) => {
    const iframe = (document?.querySelector('#myframe') as HTMLIFrameElement)
    console.log("iframe",iframe,document?.querySelector("*"))
    setTimeout(()=>sendMessage(iframe,prompt),3000);
  });
  
  chrome.storage.session.onChanged.addListener((changes) => {
    const iframe = (document?.querySelector('#myframe') as HTMLIFrameElement)
    const promptChange = changes['prompt'];
  
    if (!promptChange) {
      return;
    }
    console.log("iframe",iframe,document?.querySelector("*"))
    sendMessage(iframe,promptChange.newValue)

  });
},[])
  return (
      <iframe id="myframe" src="https://chrome-extension-gpt-util.web.app" style={{width:"100%",  height: "100vh", border:'none'}}></iframe>
  );
}

const el = document.body
ReactDOM.render(
  <App />
, el)



