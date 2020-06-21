import React from 'react';
import './ListItem.css';

const ListItem = (props) => (
    <div className="ListItem">
        <input className="ListItemCheckBox" type="checkbox" checked={props.done} onChange={props.changeChecked} />
        <textarea className="ListItemInput" value={props.text} onChange={props.changeText} />
        <button className="ListItemDeleteButton" onClick={props.delete}>
            <span className="material-icons">delete_outline</span>
        </button>
    </div>
);

export default ListItem;