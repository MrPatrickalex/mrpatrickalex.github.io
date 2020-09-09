import React, { Component, Fragment, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import ColorPicker from 'material-ui-color-picker'
import { SketchPicker } from 'react-color'


const DragHandle = SortableHandle(({ style }) => (<IconButton><DragHandleIcon /></IconButton>)
)

const SortableRow = SortableElement(({ name, type, color, className, isEdit, onEdit, onComplete, onDelete }) => {
    const [state, setState] = useState({
        name: name,
        type: type,
        color: color
    })

    const onNameChange = (name) => {
        setState({ ...state, name: name });
    }

    const onTypeChange = (type) => {
        setState({ ...state, type: type });
    }

    const onColorChange = (color) => {
        setState({ ...state, color: color });
    }

    return <TableRow key={name} className={className} disabled>
        <TableCell align="left" className="tableCell"><DragHandle /></TableCell>
        <TableCell align="left" className="tableCell">
            {isEdit ?
                <IconButton onClick={() => onComplete(state.name, state.type, state.color)}>
                    <DoneIcon />
                </IconButton>
                : <IconButton onClick={onEdit}>
                    <EditIcon />
                </IconButton>}
            <IconButton onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </TableCell>
        <TableCell align="center" className="tableCell">
            {isEdit ? <TextField id="standard-basic" defaultValue={state.name} onChange={(e) => onNameChange(e.target.value)} size="small" /> : name}
        </TableCell>
        <TableCell align="center" className="tableCell">
            {isEdit ? <TextField id="standard-basic" defaultValue={state.type} onChange={(e) => onTypeChange(e.target.value)} size="small" /> : type}
        </TableCell>
        <TableCell align="center" className="tableCell">
            {isEdit
                ? <ColorPicker
                    defaultValue={state.color}
                    value={state.color}
                    onChange={color => onColorChange(color)} />
                : <div className="color" style={{ backgroundColor: color }}></div>}
        </TableCell>
    </TableRow>
});

const SortableTableBody = SortableContainer(({ rows, onEdit, onComplete, onDelete }) => {
    return (<TableBody>
        {rows.map((row, index) => (
            <SortableRow
                key={`${row.name}-${index}`}
                index={index}
                name={row.name}
                type={row.type}
                color={row.color}
                isEdit={row.isEdit}
                className={rows.some(r => r.isEdit) && !row.isEdit ? "row-edit" : "row"}
                onEdit={() => onEdit(row.id)}
                onComplete={(name, type, color) => onComplete(row.id, name, type, color)}
                onDelete={() => onDelete(row.id)} />
        ))}
    </TableBody>)
});

SortableTableBody.muiName = 'TableBody'

const SortableTable = ({ rows, addRow, editRow, removeRow, reorderRows, toggleEdit }) => {

    console.log('TCL: rows', rows);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        reorderRows(oldIndex, newIndex)
    };

    const onAddNew = () => {
        addRow("", "", "#000", true);
    }

    const onEdit = (id) => {
        toggleEdit(id);
    }

    const onComplete = (id, name, type, color) => {
        editRow(id, name, type, color);
    }

    const onDelete = (id) => {
        removeRow(id)
    }

    return (
        <div className="wrapper">
            <Paper>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" className="tableCell"></TableCell>
                            <TableCell align="left" className="tableCell">Actions</TableCell>
                            <TableCell align="center" className="tableCell">Name</TableCell>
                            <TableCell align="center" className="tableCell">Type</TableCell>
                            <TableCell align="center" className="tableCell">Color</TableCell>
                        </TableRow>
                    </TableHead>
                    <SortableTableBody
                        rows={rows}
                        onSortEnd={onSortEnd}
                        useDragHandle
                        helperClass="helper"
                        onEdit={onEdit}
                        onComplete={onComplete}
                        onDelete={onDelete} />
                </Table>
            </Paper>
            <IconButton onClick={onAddNew}><AddIcon fontSize="large" /></IconButton>
        </div>
    );

}

export default SortableTable;