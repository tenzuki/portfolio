import React, { useState, useEffect } from 'react';
import './GhostToggle.css';

const GhostToggle = ({ onToggle, label = 'Ghost Mode' }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [showBoo, setShowBoo] = useState(false);

    const handleToggle = (e) => {
        const nextState = e.target.checked;
        setIsChecked(nextState);
        setShowBoo(nextState);

        if (nextState) {
            document.body.classList.add('ghost-mode-active');
        } else {
            document.body.classList.remove('ghost-mode-active');
        }

        if (onToggle) {
            onToggle(nextState);
        }
    };

    return (
        <div className="ghost-toggle-wrapper">
            <div className={`ghost-boo-bubble ${showBoo ? 'show' : 'hide'}`}>
                Boo! 👻
            </div>

            <div className="ghost-toggle-control">
                <label className="ghost-switch" title="Toggle Ghost Mode">
                    <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleToggle}
                        aria-label="Toggle Ghost Mode"
                    />
                    <div className="ghost-slider round">
                        <div className="ghost-mover">
                            <div className="ghost-character">
                                <div className="ghost-body" />
                            </div>
                        </div>
                    </div>
                </label>

                {label && (
                    <span className="ghost-label-text">
                        {label} {isChecked && <span className="ghost-status-on">ON</span>}
                    </span>
                )}
            </div>
        </div>
    );
};

export default GhostToggle;
