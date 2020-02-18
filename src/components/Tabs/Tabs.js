import React from 'react'
import './Tabs.css'

export default function Tabs({ activeTab, tabs = [], onTabChange }) {
  return (
    <nav className={`Tabs`}>
      <div className="Tabs--Container container">
        <div className="Tabs--Links">
          {tabs.map(tab => (
            <div
              onClick={() => onTabChange(tab.name || tab.title)}
              className={`TabsLink ${activeTab == tab.name ? 'active' : ''}`}
              href="javascript:;"
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
