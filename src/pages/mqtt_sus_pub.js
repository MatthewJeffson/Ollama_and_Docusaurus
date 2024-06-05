import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import mqtt from 'mqtt';

const MQTTBroker = 'wss://mqtt.fabcloud.org:8083';
const topicBase = 'fabacademy/paris-john'; // Base topic for your application

const MyPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const [mqttClient, setMqttClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [m1Status, setM1Status] = useState('Disconnected');

  useEffect(() => {
    // Connection options with credentials
    const options = {
      reconnectPeriod: 1000, // Try to reconnect every 1000 ms
      username: 'fabacademy',
      password: 'fabacademy',
    };

    const client = mqtt.connect(MQTTBroker, options);

    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      setConnectionStatus('Connected');

      // Subscribe to the "M-module1" topic
      client.subscribe(`${topicBase}/M-module1`);
    });

    client.on('message', (topic, message) => {
      if (topic === `${topicBase}/M-module1`) {
        const receivedMessage = message.toString();
        if (receivedMessage === 'correct') {
          setM1Status('M1 Connected');
        } else {
          setM1Status('Disconnected');
        }
      }
    });

    client.on('close', () => {
      console.log('Connection to MQTT Broker closed');
      setConnectionStatus('Disconnected');
      setM1Status('Disconnected');
    });

    client.on('error', (error) => {
      console.error('MQTT Error:', error);
      setConnectionStatus('Error - Check Console');
      setM1Status('Disconnected');
    });

    setMqttClient(client);

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (mqttClient && connectionStatus === 'Connected') {
      mqttClient.publish(`${topicBase}/button1`, 'click');
    }
  };

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div>
        <h1>MQTT Page</h1>
        <p>MQTT Connection Status: {connectionStatus}</p>
        <p>M1 Status: {m1Status}</p>
        <button 
          onClick={handleButtonClick}
          disabled={connectionStatus !== 'Connected'}
        >
          Click
        </button>
      </div>
    </Layout>
  );
};

export default MyPage;