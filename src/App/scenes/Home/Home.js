import React, {useContext, useState} from 'react';
import CreateTodoList from './components/CreateTodoList/CreateTodoList';
import TodoList from './components/TodoList/TodoList';
import Spinner from '../../components/Spinner/Spinner';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import AppContext from '../../AppContext';
import * as actionTypes from '../../store/actions/actionTypes';
import actions from '../../store/actions/index';
import ObjectID from "bson-objectid";
import './Home.css';

const Home = (props) => {
    const appContext = useContext(AppContext);
    const [newTodoListName, setNewTodoListName] = useState('');

    const changeNewListName = (event) => {
        setNewTodoListName(event.target.value);
    };

    const createTodoList = (event) => {
        event.preventDefault();
        const newTodoListId = ObjectID().toHexString();
        appContext.socket.emit(actionTypes.CREATE_TODO_LIST, newTodoListId, newTodoListName);
        const newList = {_id: newTodoListId, name: newTodoListName, items: []};
        props.createTodoList(newList);
        setNewTodoListName('');
    }

    const deleteTodoList = (listId, event) => {
        props.deleteTodoList(listId);
        appContext.socket.emit(actionTypes.DELETE_TODO_LIST, listId);
    }

    const changeTodoListName = (listId, name) => {
        props.changeTodoListName(listId, name);
        appContext.socket.emit(actionTypes.CHANGE_TODO_LIST_NAME, listId, name);
    }

    if (props.isLoggedIn === false) {
        return (
            <div className="Jumbotron">
                <h2>Realtime Todo List</h2>
                <p>Sync across your devices.</p>
                <Link to="/login" className="LoginButton">Login to use</Link>
            </div>
        );
    }

    if (!props.connected) {
        return <Spinner />
    } else {
        return (
            <div>
                <CreateTodoList create={createTodoList} value={newTodoListName} change={changeNewListName} />
                {props.todoLists.map(todoList => (
                    <TodoList 
                        key={todoList._id} 
                        listId={todoList._id}
                        changeName={changeTodoListName.bind(this, todoList._id)}
                        delete={deleteTodoList.bind(this, todoList._id)}
                        title={todoList.name}
                        items={todoList.items} />
                ))}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        connected: state.socket.connected,
        todoLists: state.todoLists
    };
}

const mapDispatchToProps = dispatch => {
    return {
        createTodoList: (list) => dispatch(actions.createTodoList(list)),
        deleteTodoList: (listId) => dispatch(actions.deleteTodoList(listId)),
        changeTodoListName: (listId, name) => dispatch(actions.changeTodoListName(listId, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);