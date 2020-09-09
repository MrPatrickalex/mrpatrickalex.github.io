import {
    ADD_ROW,
    EDIT_ROW,
    REMOVE_ROW,
    REORDER_ROWS,
    TOGGLE_EDIT
} from "./actions";
import { v4 } from "uuid";
import arrayMove from 'array-move';

export default function rowsReducers(state = [], action) {
    switch (action.type) {
        case ADD_ROW:
            return [...state, {
                id: v4(),
                name: action.name,
                type: action.type2,
                color: action.color,
                isEdit: action.isEdit
            }];
        case EDIT_ROW:
            return state.map(row => row.id === action.id
                ? { ...row, name: action.name, type: action.type2, color: action.color, isEdit: false }
                : row)
        case REMOVE_ROW:
            return state.filter(row => row.id !== action.id);
        case REORDER_ROWS:
            return arrayMove(state, action.oldIndex, action.newIndex)
        case TOGGLE_EDIT:
            return state.map(row => row.id === action.id
                ? { ...row, isEdit: true }
                : { ...row, isEdit: false })
    }
    return state;
};