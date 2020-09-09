import { createStore, applyMiddleware } from "Redux";
import rowsReducers from "./reducers";
import { v4 } from "uuid";

export default function storeFactory() {
    const logger = store => next => action => {
        console.groupCollapsed('TCL: actionType: ', action.type);
        console.log('TCL: prevState: ', store.getState());
        console.log('TCL: actionParams: ', action);
        next(action);
        console.log('TCL: nextState:', store.getState());
        console.groupEnd()
    }

    let state = JSON.parse(localStorage.getItem("state"));
    if (state === null || state === undefined || state === "")
        state = [
            { id: v4(), name: "name-1", type: "type-1", color: "#dd2ddf", isEdit: false },
            { id: v4(), name: "name-2", type: "type-2", color: "#232ddf", isEdit: false },
            { id: v4(), name: "name-3", type: "type-3", color: "#6d2ddf", isEdit: false }
        ]

    const store = createStore(rowsReducers, state, applyMiddleware(logger));

    store.subscribe(() => {
        localStorage.setItem("state", JSON.stringify(store.getState()));
    });

    console.log('TCL: getState', store.getState());

    return store;
};