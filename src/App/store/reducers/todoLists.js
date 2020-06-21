import * as actionTypes from '../actions/actionTypes';
import {produce} from 'immer';

const initialState= [];

const todoListsReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT:
            return [];
        case actionTypes.GET_TODO_LISTS:
            return [...action.lists];
        case actionTypes.CREATE_TODO_LIST:
            return createTodoList(state, action);
        case actionTypes.DELETE_TODO_LIST:
            return deleteTodoList(state, action);
        case actionTypes.CHANGE_TODO_LIST_NAME:
            return changeTodoListName(state, action);
        case actionTypes.CREATE_LIST_ITEM:
            return createListItem(state, action);
        case actionTypes.DELETE_LIST_ITEM:
            return deleteListItem(state, action);
        case actionTypes.CHANGE_LIST_ITEM_CHECKED:
            return changeListItemChecked(state, action);
        case actionTypes.CHANGE_LIST_ITEM_TEXT:
            return changeListItemText(state, action);
        default:
            return state;
    }
};

const createTodoList = (state, action) => {
    const nextState = produce(state, draft => {
        draft.push(action.list);
    });
    return nextState;
};

const deleteTodoList = (state, action) => {
    const nextState = produce(state, draft => {
        const targetListIndex = state.findIndex(list => list._id === action.listId);
        if (targetListIndex !== -1) {
            draft.splice(targetListIndex, 1);
        }
    });
    return nextState;
}

const changeTodoListName = (state, action) => {
    const nextState = produce(state, draft => {
        const targetListIndex = state.findIndex(list => list._id === action.listId);
        if (targetListIndex !== -1) {
            draft[targetListIndex]['name'] = action.name;
        }
    });
    return nextState;
}

const createListItem = (state, action) => {
    const nextState = produce(state, draft => {
        const targetListIndex = state.findIndex(list => list._id === action.listId);
        draft[targetListIndex]['items'].push(action.item);     
    });
    return nextState;
}

const deleteListItem= (state, action) => {
    const nextState = produce(state, draft => {
        const targetListIndex = state.findIndex(list => list._id === action.listId);
        const targetItemIndex = state[targetListIndex]['items'].findIndex(item => item._id === action.itemId);
        draft[targetListIndex]['items'].splice(targetItemIndex, 1);
    })
    return nextState;
}

const changeListItemChecked= (state, action) => {
    const nextState = produce(state, draft => {
        const targetListIndex = state.findIndex(list => list._id === action.listId);
        const targetItemIndex = state[targetListIndex]['items'].findIndex(item => item._id === action.itemId);
        draft[targetListIndex]['items'][targetItemIndex]['done'] = action.checked;
    })
    return nextState;
}

const changeListItemText= (state, action) => {
    const nextState = produce(state, draft => {
        const targetListIndex = state.findIndex(list => list._id === action.listId);
        const targetItemIndex = state[targetListIndex]['items'].findIndex(item => item._id === action.itemId);
        draft[targetListIndex]['items'][targetItemIndex]['text'] = action.text;
    })
    return nextState;
}

export default todoListsReducer;