import React, {useState} from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 320,
      width: 600,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const operations = [
    null,
    "addition",
    "subtraction",
    "multiplication",
    "division",
    "square_root",
    "random_string",
];

const operators = {
    'addition' : [
        {'name': 'param1', 'type': 'text'},
        {'name': 'param2', 'type': 'text'}
    ],
    'subtraction' : [
        {'name': 'param1', 'type': 'text'},
        {'name': 'param2', 'type': 'text'}
    ],
    'multiplication' : [
        {'name': 'param1', 'type': 'text'},
        {'name': 'param2', 'type': 'text'}
    ],
    'division' : [
        {'name': 'param1', 'type': 'text'},
        {'name': 'param2', 'type': 'text'}
    ],
    'square_root' : [
        {'name': 'param', 'type': 'text'},
    ],
    'random_string' : [
        {'name': 'length', 'type': 'text'},
    ],
}
  
const RequestDialog = ({open, handleClose, onSubmit}) => {
    const classes = useStyles();
    const [operation, setOperation] = useState("");
    const [params, setParams] = useState({});

    const onParamChange = (event) => {
        setParams({
            ...params,
            [event.target.name]: event.target.value
        })
    };

    const requestOperation = () => {
        const data = {
            operation,
            params
        };
        onSubmit(data);
    }

    const renderOperators=(operator)=>{
        const fields = operators[operator];
        if (!fields || fields.length<1) return <></>;
        return <React.Fragment>
            {fields.map((field, idx)=>{
                if (field.type === 'text')
                    return <Grid container justifyContent="center" key={idx}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name={field.name}
                                label={field.name}
                                id={field.name}
                                onChange={onParamChange}
                            />
                        </FormControl>
                    </Grid>
                return <></>
            })}
        </React.Fragment> 
    }

    return (
    <Dialog open={open} handleClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Request Operation</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please choose the proper operation that you want.
            </DialogContentText>
            <Grid container justifyContent="center">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Operation</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={operation}
                        onChange={(event)=>{setOperation(event.target.value)}}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {operations.map((operation, idx)=><MenuItem key={idx} value={operation}>{operation}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            {renderOperators(operation)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" type="button" variant="contained">
            Cancel
          </Button>
          <Button onClick={requestOperation} color="primary" type="button" variant="contained">
            Request Operation
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default RequestDialog;
