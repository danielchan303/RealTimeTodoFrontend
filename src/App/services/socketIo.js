import * as actionTypes from '../store/actions/actionTypes';
import actions from '../store/actions/index';
import io from 'socket.io-client';

const getSocket = (user, store) => {
    console.log('getSocket is called');
    return new Promise((resolve, reject) => {
        const socket = io.connect('https://realtime-todo-daniel-chan.herokuapp.com/', { timeout: 2000 });
        
        socket.on('connect', async function () {
            console.log("Connected to socket.io")
            await user.getIdToken(true).then(async token => {
                socket.emit('authentication', { token: token});
            }).catch(error => {
                console.log("error", error);
            });
        });
        
        socket.on('authenticated', function () {
            console.log("You are authenticated to socket.io");
            store.dispatch(actions.connected());
            resolve(socket);
        });

        socket.on('connect_error', function () {
            console.log("Cannot connect to socket.io");
            const connected = store.getState().socket.connected;
            if (connected) {
                store.dispatch(actions.disconnected());
            }
        });
        
        socket.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') {
                store.dispatch(actions.disconnected());
                // the disconnection was initiated by the server, you need to reconnect manually
                socket.connect();
            }
            // else the socket will automatically try to reconnect
        });

        socket.on('reconnect', (error) => {
            console.log("Reconnected");
        });

        socket.on(actionTypes.GET_TODO_LISTS, (lists) => {
            store.dispatch(actions.getTodoList(lists));
        });

        socket.on(actionTypes.CREATE_TODO_LIST, (newList) => {
            store.dispatch(actions.createTodoList(newList));
        });

        socket.on(actionTypes.DELETE_TODO_LIST, (listId) => {
            store.dispatch(actions.deleteTodoList(listId));
        });

        socket.on(actionTypes.CHANGE_TODO_LIST_NAME, (listId, name) => {
            store.dispatch(actions.changeTodoListName(listId, name));
        });

        socket.on(actionTypes.CREATE_LIST_ITEM, (response) => {
            const { listId, item } = response;
            store.dispatch(actions.createListItem(listId, item))
        });

        socket.on(actionTypes.DELETE_LIST_ITEM, (response) => {
            const { listId, itemId } = response;
            store.dispatch(actions.deleteListItem(listId, itemId));
        })

        socket.on(actionTypes.CHANGE_LIST_ITEM_CHECKED, (response) => {
            const { listId, itemId, checked } = response;
            store.dispatch(actions.changeListItemChecked(listId, itemId, checked))
        })

        socket.on(actionTypes.CHANGE_LIST_ITEM_TEXT, (response) => {
            const { listId, itemId, text } = response;
            store.dispatch(actions.changeListItemText(listId, itemId, text))
        })
    });
};

export default getSocket;