import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatComponent.module.css';

const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userMessage = {
      role: 'user',
      content: inputText,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    try {
      const response = await axios.post('http://localhost:11434/api/chat', {
        model: 'gemma',
        messages: [...messages, userMessage],
        stream: true,
      }, {
        responseType: 'text',
      });

      let assistantMessageContent = '';

      const lines = response.data.split('\n');
      for (const line of lines) {
        if (line.trim() === '') continue;

        const data = JSON.parse(line);
        if (data.message) {
          assistantMessageContent += data.message.content;
        }
        if (data.done) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'assistant',
              content: assistantMessageContent,
            },
          ]);
          return;
        }
      }
    } catch (error) {
      console.error('Error calling chat API:', error.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          <div className={styles.welcomeMessage}>Hello, Matthew! How may I help you today</div>
          <div className={styles.welcomeMessage2}>Left would be your calendar and rigtht would be the memory.</div>
          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index} className={styles.message}>
                <strong>{message.role}:</strong> {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Hello, Matthew! How may I help you today"
              className={styles.inputField}
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;