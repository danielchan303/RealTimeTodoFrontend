import React from 'react';
import './MessageBar.css';

const MessageBar = (props) => {
    if (props.show) {
        return (
        <div className="MessageBar">
            Cannot connect to the internet, the changes made won't be saved...
        </div>
        );
    }
    return null;
};

export default MessageBar;