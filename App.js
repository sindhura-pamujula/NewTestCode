
import React, { useState } from 'react';
import { TextField, Button, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircleOutline, CancelOutlined } from '@material-ui/icons';


import './App.css';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },

  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  textField: {
    marginRight: theme.spacing(2),
    minWidth: 200,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  submitButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function App() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${inputValue ? inputValue : 0}/todos`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className={classes.root}>
      <h1>Enter userId between 1 to 9 to show todo list</h1>
      <form className={classes.form} onSubmit={handleSubmit}>

        <TextField
          className={classes.textField}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label="Enter userId..."
          variant="outlined"
        />
        <Button className={classes.submitButton} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <br />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Todo Task</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.completed ? <CheckCircleOutline style={{ color: 'green' }} /> : <CancelOutlined style={{ color: 'red' }} />}</TableCell>
              </TableRow>
            )) : <p>No Records Available</p>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

}

export default App;
