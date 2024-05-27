import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ChatComponent from '../components/ChatComponents/ChatComponent';
import UiForOperatingCSS from '../components/calendar/ui_for_operating_css';
import styles from './chatbot_local.css';

const MyPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  const toggleConnectionStatus = () => {
    setConnectionStatus(prevStatus =>
      prevStatus === 'Connected' ? 'Disconnected' : 'Connected'
    );
  };

  return (
    <Layout title="Home Page">
      <div className="hulkbuster-bar">Matthew Yu Protocol Activated</div>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ flex: '0 0 300px', padding: '20px', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <img
                src="img/anime_me.jpg"
                alt="My Image"
                style={{ width: '234px', height: '234px' }}
              />
            </div>
            <UiForOperatingCSS />
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>M-Module Connection Status:</p>
              <p
                style={{
                  color: connectionStatus === 'Connected' ? 'green' : 'red',
                  fontWeight: 'bold',
                  backgroundColor: '#f0f0f0',
                  padding: '10px',
                  borderRadius: '5px',
                  display: 'inline-block',
                }}
              >
                {connectionStatus}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={toggleConnectionStatus}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Afresh Connection Status
            </button>
          </div>
        </div>
        <div style={{ flex: '1', padding: '20px' }}>
          <ChatComponent />
        </div>
        <div style={{ flex: '0 0 300px', padding: '20px', borderLeft: '1px solid #ccc' }}>
          <h2 style={{ marginBottom: '20px' }}>Prompt Storage</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <strong>Content Management</strong>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  <div style={{ position: 'relative', marginRight: '20px' }}>
    <a href="https://doc.weixin.qq.com/doc/w3_AQIA4QaAAGkeuhtCXhCSlKR7Ei6WR?scode=AGEAZwfLABE4TtKRksAQIA4QaAAGk" target="_blank" style={{ display: 'block', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8dc21F', textAlign: 'center', lineHeight: '50px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>D</a>
  </div>
  <div style={{ position: 'relative', marginRight: '20px' }}>
    <a href="https://doc.weixin.qq.com/sheet/e3_AQIA4QaAAGkdqhTsaI7SuGdN9wr1c?scode=AGEAZwfLABEZR0GTHBAQIA4QaAAGk&tab=BB08J2" target="_blank" style={{ display: 'block', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8dc21F', textAlign: 'center', lineHeight: '50px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Z</a>
  </div>
  <div style={{ position: 'relative' }}>
    <a href="https://doc.weixin.qq.com/sheet/e3_AcUAfAY7AIYMSdTfB9XQZekW1w10o?scode=AGEAZwfLABEEbL6yVAAQIA4QaAAGk&tab=BB08J2" target="_blank" style={{ display: 'block', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8dc21F', textAlign: 'center', lineHeight: '50px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>L</a>
  </div>
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
  Prompt into: <button style={{ fontSize: '15px', padding: '2px 4px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#8dc21F', marginLeft: '5px' }}>/work/c</button>
</div>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <strong>Ranger Program</strong>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  <div style={{ position: 'relative', marginRight: '20px' }}>
    <a href="https://github.com/orgs/Seeed-Studio/projects/6" target="_blank" style={{ display: 'block', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8dc21F', textAlign: 'center', lineHeight: '50px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>R</a>
  </div>
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
  Prompt into: <button style={{ fontSize: '15px', padding: '2px 4px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#8dc21F', marginLeft: '5px' }}>/work/r</button>
</div>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <strong>Teaching Newcomers</strong>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  <div style={{ position: 'relative', marginRight: '20px' }}>
    <a href="https://doc.weixin.qq.com/doc/w3_AQIA4QaAAGk0Pl5LhWLQY28epdSMR?scode=AGEAZwfLABEYwOdtdmAQIA4QaAAGk" target="_blank" style={{ display: 'block', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8dc21F', textAlign: 'center', lineHeight: '50px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>M</a>
  </div>
  <div style={{ position: 'relative', marginRight: '20px' }}>
    <a href="https://doc.weixin.qq.com/doc/w3_AfkAiQZLAOA1Hk0Sb7yRcysou68UU?scode=AGEAZwfLABE8pzSNZm" target="_blank" style={{ display: 'block', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#8dc21F', textAlign: 'center', lineHeight: '50px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>D</a>
  </div>
</div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
  Prompt into: <button style={{ fontSize: '15px', padding: '2px 4px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#8dc21F', marginLeft: '5px' }}>/work/m</button>
</div>
            </div>
          </div>
          <button
            style={{
              backgroundColor: '#013949',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Convert all texts in `/work/o`
          </button>
        </div>
      </div>
      
    </Layout>
  );
};

export default MyPage;