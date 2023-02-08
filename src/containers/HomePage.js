import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DataTable from "../components/DataTable";
import Pagination from '@material-ui/lab/Pagination';
import RequestDialog from "../components/RequestDialog";

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  requestButton: {
    marginBottom: 20,
    textAlign: "center"
  },
  pagination: {
    marginTop: 20
  }
}));

const HomePage = () => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const requestOperation = (data) => {
    console.log('request operation=>', data);
  };

  const tableData = [
    {id: '1', operation: 'addition', user: 'matt', amount: '10', response: '5', date: '2023/2/8'},
    {id: '2', operation: 'addition', user: 'matt', amount: '10', response: '5', date: '2023/2/8'},
    {id: '3', operation: 'addition', user: 'matt', amount: '10', response: '5', date: '2023/2/8'},
    {id: '4', operation: 'addition', user: 'matt', amount: '10', response: '5', date: '2023/2/8'},
    {id: '5', operation: 'addition', user: 'matt', amount: '10', response: '5', date: '2023/2/8'},
  ]

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Blue Eye Test Assesement
          </Typography>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
          Welcome Matthew Wood!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          You can request any operation.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container justifyContent="center">
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={()=>{setOpenDialog(true)}}
          >
            Request Operation
          </Button>
        </Grid>
        <DataTable data={tableData}/>
        <Grid container justifyContent="center">
          <Pagination count={10} size="large" className={classes.pagination}/>
        </Grid>
      </Container>
      <RequestDialog
        open={openDialog}
        handleClose={closeDialog}
        onSubmit={requestOperation}
      />
    </React.Fragment>
  );
};

export default HomePage;
