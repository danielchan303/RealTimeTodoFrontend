import React, {useState, useContext} from 'react';
import AppContext from '../../../../AppContext';
import './TodoList.css';
import Card from '../../../../components/Card/Card';
import ListItem from './components/ListItem/ListItem';
import * as actionTypes from '../../../../store/actions/actionTypes';
import actions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import ObjectID from 'bson-objectid';

const TodoList = (props) => {
    const [newListItem, setNewListItem] = useState('');
    const appContext = useContext(AppContext);

    const changeListName = (event) => {
        props.changeName(event.target.value);
    }

    const createTodoItem = (event) => {
        event.preventDefault();
        const itemId = ObjectID().toHexString();
        appContext.socket.emit(actionTypes.CREATE_LIST_ITEM, props.listId, itemId, newListItem);
        const item = {_id: itemId, done: false, text: newListItem};
        props.createListItem(props.listId, item);
        setNewListItem('');
    }

    const deleteTodoItem = (listId, itemId, event) => {
        props.deleteListItem(listId, itemId);
        appContext.socket.emit(actionTypes.DELETE_LIST_ITEM, listId, itemId);
    };

    const changeItemText = (listId, itemId, event) => {
        event.target.style.height = 'auto';
        event.target.style.height = (event.target.scrollHeight) + 'px';
        props.changeListItemText(listId, itemId, event.target.value);
        appContext.socket.emit(actionTypes.CHANGE_LIST_ITEM_TEXT, listId, itemId, event.target.value);
    };

    const changeItemChecked = (listId, itemId, event) => {
        props.changeListItemChecked(listId, itemId, event.target.checked);
        appContext.socket.emit(actionTypes.CHANGE_LIST_ITEM_CHECKED, listId, itemId, event.target.checked);
    };

    const listItems = props.items.map(item => {
        return (
            <ListItem 
                key={item._id} 
                changeText={changeItemText.bind(this, props.listId, item._id)}
                changeChecked={changeItemChecked.bind(this, props.listId, item._id)}
                delete={deleteTodoItem.bind(this, props.listId, item._id)}
                done={item.done} 
                text={item.text} />
        );
    });

    return (
        <Card>
            <button className="DeleteTodoListButton" onClick={props.delete}>X</button>
            <div><input className="ListTitle" value={props.title} onChange={changeListName} /></div>
            <form onSubmit={createTodoItem}>
                <input 
                    type="text" 
                    className="newItemInput"
                    placeholder="New List Item"
                    value={newListItem}
                    onChange={(event) => setNewListItem(event.target.value)} />
            </form>
            {listItems}
        </Card>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createListItem: (listId, item) => dispatch(actions.createListItem(listId, item)),
        deleteListItem: (listId, itemId) => dispatch(actions.deleteListItem(listId, itemId)),
        changeListItemText: (listId, itemId, text) => dispatch(actions.changeListItemText(listId, itemId, text)),
        changeListItemChecked: (listId, itemId, text) => dispatch(actions.changeListItemChecked(listId, itemId, text))
    };
}

export default connect(null, mapDispatchToProps)(TodoList);