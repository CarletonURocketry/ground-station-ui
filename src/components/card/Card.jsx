import React from 'react'
import './Card.css'

/**
 * Card Component
 * @param {string} title - [OPTIONAL] The title for the card (will show up at the top)
 * @param {React.Component} bodyComponent - The main component to display in the card
 * @returns {JSX.Element} The rendered Card component.
 */

function Card({ title, bodyComponent }) {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-header" style={{justifyContent: 'center'}}>
          <div className='card-title'>{title}</div>
        </div>
        <div className="card-body">
          {bodyComponent}
        </div>
      </div>
    </div>
  )
}

export default Card
