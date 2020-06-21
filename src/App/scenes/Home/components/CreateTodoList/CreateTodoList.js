import React from 'react';
import Card from '../../../../components/Card/Card';
import './CreateTodoList.css';

const NewTodoList = (props) => {
    return (
        <Card>
            <h2>New Todo List</h2>
            <form onSubmit={props.create}>
                <input 
                    className="NewTodoListInput"
                    type="text" 
                    placeholder="New Todo List" 
                    value={props.value}
                    onChange={props.change} />
            </form>
        </Card>
    );
};

export default NewTodoList;