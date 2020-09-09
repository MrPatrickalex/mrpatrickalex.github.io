import React from "react";
import ReactDOM from "react-dom";
import SortableTable from "./Components/App";
import { connect, Provider } from 'react-redux';
import storeFactory from "./Redux/store";
import {
    addRow,
    editRow,
    removeRow,
    reorderRows,
    toggleEdit
} from "./Redux/actionCreaters"

const store = storeFactory();

console.log('TCL: store: ', store.getState());

const mapStateToProps = state => ({ rows: state })

const mapDispatchToProps = {
    addRow,
    editRow,
    removeRow,
    reorderRows,
    toggleEdit
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortableTable)

const root = document.getElementById("root");
ReactDOM.render(<Provider store={store}><ConnectedApp /></Provider>, root);