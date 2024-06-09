// src/components/Conversation.js
import React, { useState,useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../utils/firebase-config';
import './Conversation.css'; // Ensure CSS is appropriately separated

export const Conversation = ({auth}) => {
  console.log("auth",auth)
  //"users/{uid}/discussions/{discussionId}/messages"
  const discussionCollection = collection(firestore,`users/${auth.user.uid}/discussions/${crypto.randomUUID()}/messages` );
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  const [responses, setResponses] = useState([{ text: "I'm a chatbot powered by the Palm API Firebase Extension and built with React.", type: 'RESPONSE' }]);

  useEffect(()=>{
    chrome.storage.session.get('prompt', ({ prompt }) => {
      setPrompt(prompt);
      handlePromptSubmit({preventDefault:()=>{}})
    });
    
    chrome.storage.session.onChanged.addListener((changes) => {
      const promptChange = changes['prompt'];
    
      if (!promptChange) {
        return;
      }
    
      setPrompt(promptChange.newValue);
      handlePromptSubmit({preventDefault:()=>{}})
    });
  },[])

  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    if (!prompt) return;
    const newPrompt = prompt;
    setPrompt('');
    setResponses(responses => [...responses, { text: newPrompt, type: 'PROMPT' }]);

    setStatus('sure, one sec');
    try {
      const discussionDoc = await addDoc(discussionCollection, { prompt: newPrompt });
      const unsubscribe = onSnapshot(discussionDoc, (doc) => {
        const conversation = doc.data();
        if (conversation && conversation.status) {
          const state = conversation.status.state;
          switch (state) {
            case 'COMPLETED':
              setStatus('');
              setResponses(responses => [...responses, { text: conversation.response, type: 'RESPONSE' }]);
              unsubscribe();
              break;
            case 'PROCESSING':
              setStatus('preparing your answer...');
              break;
            case 'ERRORED':
              setStatus('Oh no! Something went wrong. Please try again.');
              unsubscribe();
              break;
            default:
              break;
          }
        }
      }, (err) => {
        console.error(err);
        setStatus('Error: ' + err.message);
        unsubscribe();
      });
    } catch (err) {
      console.error(err);
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Firebase 🤝 Palm API 🤝 React</h1>
      </header>
      <div className="conversation-window">
        <div className="responses">
          {responses.map((resp, index) => (
            <div key={index} className={resp.type === 'PROMPT' ? 'prompt' : 'response'}>
              {resp.type !== 'PROMPT' && <img src="icon.png" alt="Chatbot Logo" className="chatbot-logo" />}
              <p>{resp.text}</p>
            </div>
          ))}
        </div>
        <div className="prompt-area">
          <form onSubmit={handlePromptSubmit} className="prompt-form">
            <input
              autoFocus
              className="prompt-input"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt here"
            />
            <button type="submit" className="prompt-send-button">Send</button>
          </form>
          {status && <div className="status-indicator"><p>{status}</p></div>}
        </div>
      </div>
    </div>
  );
};
