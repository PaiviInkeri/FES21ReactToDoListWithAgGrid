import './App.css';
import React, { useState } from 'react';
import { useRef } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function App() {
 
    const [todo, setTodo] = useState({desc: '', date: '', priority:''});
    const [todos, setTodos] = useState([]);
  
    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }
  
    const addTodo = (event) => {
      setTodos([...todos, todo]);
      console.log([todos])
    }

    const deleteItem = () => {
      if (gridRef.current.getSelectedNodes().length> 0) {
        setTodos(todos.filter((todo,index)=> index!== gridRef.current.getSelectedNodes()[0].childIndex))
      }
      else {
        alert('Select row first');
      }
    }

    const gridRef= useRef();

    //defining columns for ag grid table
    const columns = [
      {headerName: 'Description', field: 'desc', sortable: true, filter: true, animateRows: true},
      {headerName: 'Date', field: 'date', sortable: true, animateRows: true},
      {headerName: 'Priority', field: 'priority', sortable: true, filter: true, animateRows: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},

    ]

  return (
    <div className="App">
      <input type="text" placeholder="Description" name="desc" value={todo.desc} onChange={inputChanged}/>
      <input type="date" placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <input type="text" placeholder="Priority" name="priority" value={todo.priority} onChange={inputChanged}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteItem}>Delete</button>
    
      {/*here we render the ag grid table and pass the column structure (const variable
      columns) and source of data (todo array) props as props*/}
      <div 
        className="ag-theme-material" 
        style={{
        height: 700, 
        width: '80%',
        margin: 'auto'}}>
          <AgGridReact 
            ref={gridRef}
            onGridReady={ params=> gridRef.current= params.api }
            rowSelection="single"
            columnDefs={columns}
            rowData={todos}
            >
            {/* <AgGridColumn field="desc"></AgGridColumn>
            <AgGridColumn field="date"></AgGridColumn>
            <AgGridColumn field="priority"></AgGridColumn> */}
         
          </AgGridReact>
      </div>
    </div>
  );
};

export default App;
