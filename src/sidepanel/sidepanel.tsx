import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider, useAuth } from '../components/AuthContext';
import { Conversation } from '../components/Conversation';

function App() {
const [auth,setAuth] = useState(null);
const iframe = (document?.querySelector('#myframe') as HTMLIFrameElement)

// Send a message to the iframe
function sendMessage(iframe,message) {
console.log(message)
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
// window.addEventListener("message", async (event) => {
//   if (event.data.type === 'getGeminiResp') {
//     sendPrompt({data: event.data.text},setPrompt,setCurrentPrompt,navigate,handlePromptSubmit)
// }
// });
  // const { currentUser } = useAuth();
 const login =()=> chrome.runtime.sendMessage({ type: 'FROM_SIDEPANEL', payload: 'login' }, (response) => {
    console.log('Response from background:', response);
  });
  chrome.runtime.onMessage.addListener( async (message, sender, sendResponse)=>{
    if (message.type === 'FROM_BACKGROUND_AUTH') {
      console.log('Message received from background panel:', message.payload);
      setAuth(message.payload)
    }
  })
console.log(auth,login)
  return (
      <iframe id="myframe" src="https://chrome-extension-gpt-util.web.app" style={{width:"100%",  height: "100vh", border:'none'}}></iframe>
  );
}

const el = document.body
ReactDOM.render(<AuthProvider>
  <App />
</AuthProvider>, el)



