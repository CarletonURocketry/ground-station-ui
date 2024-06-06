import React from "react";
import "./Card.css";

interface CardProps {
  deleteComponent: (i: string) => void;
  i: string;
  isEditorModeOn: boolean;
  bodyComponent: React.ReactNode;
}

/**
 * Card Component
 * @param {string} title - [OPTIONAL] The title for the card (will show up at the top)
 * @param {React.Component} bodyComponent - The main component to display in the card
 * @returns {JSX.Element} The rendered Card component.
 */
function Card({ deleteComponent, i, isEditorModeOn, bodyComponent }: CardProps) {
  return (
    <div className={`card ${isEditorModeOn ? 'card-in-edit-mode' : ''}`}>
      <header className={`card-header ${!isEditorModeOn ? 'card-header-read-only' : ''}`}>
        {/* {isEditorModeOn && <div></div>} */}
        <div className="card-title">{i}</div>
        {/* {isEditorModeOn && (
          <button onClick={() => deleteComponent(i)}>Close</button>
        )} */}
      </header>
      <div className="card-body">{bodyComponent}</div>
    </div>
  );
}

export default Card;