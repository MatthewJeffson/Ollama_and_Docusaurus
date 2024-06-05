import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mqtt from 'mqtt';
import styles from './ChatComponent.module.css';
import ReactMarkdown from 'react-markdown';

const MQTTBroker = 'wss://mqtt.fabcloud.org:8083';
const topicBase = 'fabacademy/paris-john';

const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [mqttClient, setMqttClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [moduleStatuses, setModuleStatuses] = useState({
    'Matthew': 'Disconnected',
  });

  useEffect(() => {
    const options = {
      reconnectPeriod: 1000,
      username: 'fabacademy',
      password: 'fabacademy',
    };

    const client = mqtt.connect(MQTTBroker, options);

    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      setConnectionStatus('Connected');

      client.subscribe(`${topicBase}/M-module1`);
      client.subscribe(`${topicBase}/M-module2`);
      client.subscribe(`${topicBase}/M-module3`);
      client.subscribe(`${topicBase}/M-module4`);
      client.subscribe(`${topicBase}/GPT_message_sent`);
    });

    client.on('message', (topic, message) => {
      const receivedMessage = message.toString();
      const moduleNumber = topic.split('-').pop();

      if (topic === `${topicBase}/GPT_message_sent`) {
        handleGPTMessageSent(receivedMessage);
      } else {
        if (receivedMessage === 'correct') {
          setModuleStatuses((prevStatuses) => ({
            ...prevStatuses,
            [`Find: ${moduleNumber}`]: 'Connected',
          }));
        } else {
          setModuleStatuses((prevStatuses) => ({
            ...prevStatuses,
            [`Not find: ${moduleNumber}`]: 'Disconnected',
          }));
        }
      }
    });

    client.on('close', () => {
      console.log('Connection to MQTT Broker closed');
      setConnectionStatus('Disconnected');
      setModuleStatuses({
        module1: 'Disconnected',
        module2: 'Disconnected',
        module3: 'Disconnected',
        module4: 'Disconnected',
      });
    });

    client.on('error', (error) => {
      console.error('MQTT Error:', error);
      setConnectionStatus('Error - Check Console');
      setModuleStatuses({
        module1: 'Disconnected',
        module2: 'Disconnected',
        module3: 'Disconnected',
        module4: 'Disconnected',
      });
    });

    setMqttClient(client);

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const handleGPTMessageSent = (message) => {
    const userMessage = {
      role: 'user',
      content: message,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    handleSubmit({ preventDefault: () => {} }, userMessage);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event, userMessage = null) => {
    event.preventDefault();
  
    if (!userMessage) {
      userMessage = {
        role: 'user',
        content: inputText,
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');
    }
  
    try {
      const response = await axios.post('http://localhost:11434/api/chat', {
        model: 'gemma',
        messages: [...messages, userMessage],
        stream: true,
      }, {
        responseType: 'text',
      });
  
      let assistantMessageContent = '';
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: assistantMessageContent,
        },
      ]);
  
      const lines = response.data.split('\n');
      for (const line of lines) {
        if (line.trim() === '') continue;
  
        const data = JSON.parse(line);
        if (data.message) {
          const words = data.message.content.split(' ');
          for (const word of words) {
            assistantMessageContent += word + ' ';
            setMessages((prevMessages) => {
              const lastMessage = prevMessages[prevMessages.length - 1];
              if (lastMessage.role === 'assistant') {
                return [
                  ...prevMessages.slice(0, -1),
                  {
                    ...lastMessage,
                    content: assistantMessageContent,
                  },
                ];
              }
              return prevMessages;
            });
            await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed
          }
        }
        if (data.done) {
          return;
        }
      }
    } catch (error) {
      console.error('Error calling chat API:', error.message);
    }
  };

  const handleModuleButtonClick = (moduleNumber) => {
    if (mqttClient && connectionStatus === 'Connected') {
      mqttClient.publish(`${topicBase}/button${moduleNumber}`, 'click');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.moduleStatusContainer}>
        <div className={styles.statusItem}>
          <strong>MQTT Connection:</strong> {connectionStatus}
        </div>
        {Object.entries(moduleStatuses).map(([module, status]) => (
          <div key={module} className={styles.moduleItem}>
            <button
              className={`${styles.circleButton} ${
                status === 'Connected' ? styles.connected : styles.disconnected
              } ${status === 'Connected' ? styles.breathingButton : ''}`}
              onClick={() => handleModuleButtonClick(module.slice(-1))}
              disabled={connectionStatus !== 'Connected'}
            >
              {module}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          <div className={styles.welcomeMessage}>
            Hello, Matthew! How may I help you today
          </div>
          <div className={styles.welcomeMessage2}>
            Left would be your calendar and right would be the memory.
          </div>
          <div className={styles.messagesContainer}>
  {messages.map((message, index) => (
    <div key={index} className={styles.message}>
      <strong>{message.role}:</strong>
      {message.role === 'assistant' ? (
        <ReactMarkdown>{message.content}</ReactMarkdown>
      ) : (
        message.content
      )}
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