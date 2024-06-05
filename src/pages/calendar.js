import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ChatComponent from '../components/ChatComponents/ChatComponent';
import UiForOperatingCSS from '../components/calendar/ui_for_operating_css';

const MyPage = () => {
  const { siteConfig } = useDocusaurusContext();

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
          </div>
        </div>
        <div style={{ flex: '1', padding: '20px' }}>
          <ChatComponent />
        </div>
        <div className="prompt-storage">
          <h2>Prompt Storage</h2>
          <div className="prompt-section">
            <strong>Content Management</strong>
            <div className="prompt-links">
              <a href="https://doc.weixin.qq.com/doc/w3_AQIA4QaAAGkeuhtCXhCSlKR7Ei6WR?scode=AGEAZwfLABE4TtKRksAQIA4QaAAGk" target="_blank" className="prompt-link">D</a>
              <a href="https://doc.weixin.qq.com/sheet/e3_AQIA4QaAAGkdqhTsaI7SuGdN9wr1c?scode=AGEAZwfLABEZR0GTHBAQIA4QaAAGk&tab=BB08J2" target="_blank" className="prompt-link">Z</a>
              <a href="https://doc.weixin.qq.com/sheet/e3_AcUAfAY7AIYMSdTfB9XQZekW1w10o?scode=AGEAZwfLABEEbL6yVAAQIA4QaAAGk&tab=BB08J2" target="_blank" className="prompt-link">L</a>
            </div>
            <div className="prompt-button">
              Prompt into: <button>/work/c</button>
            </div>
          </div>
          <div className="prompt-section">
            <strong>Ranger Program</strong>
            <div className="prompt-links">
              <a href="https://github.com/orgs/Seeed-Studio/projects/6" target="_blank" className="prompt-link">R</a>
            </div>
            <div className="prompt-button">
              Prompt into: <button>/work/r</button>
            </div>
          </div>
          <div className="prompt-section">
            <strong>Teaching Newcomers</strong>
            <div className="prompt-links">
              <a href="https://doc.weixin.qq.com/doc/w3_AQIA4QaAAGk0Pl5LhWLQY28epdSMR?scode=AGEAZwfLABEYwOdtdmAQIA4QaAAGk" target="_blank" className="prompt-link">M</a>
              <a href="https://doc.weixin.qq.com/doc/w3_AfkAiQZLAOA1Hk0Sb7yRcysou68UU?scode=AGEAZwfLABE8pzSNZm" target="_blank" className="prompt-link">D</a>
            </div>
            <div className="prompt-button">
              Prompt into: <button>/work/m</button>
            </div>
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
    </Layout>
  );
};

export default MyPage;