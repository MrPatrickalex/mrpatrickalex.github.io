import {
    ADD_ROW,
    EDIT_ROW,
    REMOVE_ROW,
    REORDER_ROWS,
    TOGGLE_EDIT
} from "./actions";

export function addRow(name, type, color, isEdit) {
    return {
        type: ADD_ROW,
        name: name,
        type2: type,
        color: color,
        isEdit: isEdit
    }
}

export function editRow(id, name, type, color) {
    return {
        type: EDIT_ROW,
        id: id,
        name: name,
        type2: type,
        color: color,
    }
}

export function removeRow(id) {
    return {
        type: REMOVE_ROW,
        id: id
    }
}

export function reorderRows(oldIndex, newIndex) {
    return {
        type: REORDER_ROWS,
        oldIndex: oldIndex,
        newIndex: newIndex
    }
}

export function toggleEdit(id) {
    return {
        type: TOGGLE_EDIT,
        id: id,
    }
}