import React from 'react'

export default function Tabs({ activeTab, changeTab }) {
    return (
        <div className="tabs-container">
          <div className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => changeTab(1)}>Tab 1</div>
          <div className={`tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => changeTab(2)}>Tab 2</div>
        </div>
      );
}
