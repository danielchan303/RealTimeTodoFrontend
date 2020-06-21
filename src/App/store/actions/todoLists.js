import * as actionTypes from './actionTypes';

// GET_TODO_LISTS
export const getTodoList = (lists) => {
    return {type: actionTypes.GET_TODO_LISTS, lists};
};

// CREATE_TODO_LIST
export const createTodoList = (list) => {
    return {type: actionTypes.CREATE_TODO_LIST, list: list};
};

// DELETE_TODO_LIST
export const deleteTodoList = (listId) =>  {
    return {type: actionTypes.DELETE_TODO_LIST, listId};
};

// CHANGE_TODO_LIST_NAME
export const changeTodoListName = (listId, name) => {
    return {type: actionTypes.CHANGE_TODO_LIST_NAME, listId, name};
}

// CREATE_LIST_ITEM
export const createListItem = (listId, item) => {
    return {type: actionTypes.CREATE_LIST_ITEM, listId: listId, item: item};
};

// DELETE_LIST_ITEM
export const deleteListItem = (listId, itemId) => {
    return {type: actionTypes.DELETE_LIST_ITEM, listId, itemId};
};

// CHANGE_LIST_ITEM_CHECKED
export const changeListItemChecked = (listId, itemId, checked) => {
    return {type: actionTypes.CHANGE_LIST_ITEM_CHECKED, listId, itemId, checked};
};

// CHANGE_LIST_ITEM_TEXT
export const changeListItemText = (listId, itemId, text) => {
    return {type: actionTypes.CHANGE_LIST_ITEM_TEXT, listId, itemId, text};
}