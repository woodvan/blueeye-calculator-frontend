import React, { useEffect } from "react";
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
import LocalStorageService from '../utils/LocalStorageService';
import { getCurrentUser } from "../services/auth";
import { getOperations, getRecords, requestOperation, removeRecords } from "../services/main";
import { toast } from 'react-toastify';

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

const pageSize = 5;

const HomePage = ({setAuthenticated}) => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [operations, setOperations] = React.useState(null);
  const [curPage, setCurPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [records, setRecords] = React.useState(null);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleOperation = async (payload) => {
    try {
      await requestOperation(payload);
      toast("You operation was finished successfully", {type: 'success'});
      fetchRecords(1, pageSize);
      fetchUser();
      closeDialog();  
    } catch (error) {
      toast("Failed", {type: 'error'});
    }
  };

  const handleRemoveRecord = async(id) => {
    try {
      await removeRecords(id);
      toast("The operation was removed successfully", {type: 'success'});
      fetchRecords(curPage, pageSize);
    } catch (error) {
      toast("Failed", {type: 'error'});
    }
  }

  const onPaginationChange = (event, value) => {
    fetchRecords(value, pageSize);
  }

  const logout = () => {
    setAuthenticated(false);
    LocalStorageService.clearState();
  }

  const fetchRecords = async (page, size) => {
    setLoading(true);
    const res = await getRecords({page, size});
    setLoading(false);
    setCurPage(page);
    setTotalPage(res.totalPages);
    setRecords(res.records);
  }

  const fetchUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  }

  useEffect(()=>{
    const fetchOperations = async () => {
      const response = await getOperations();
      setOperations(response.data?.data);
    };
    fetchOperations(); 
  }, []);

  useEffect(()=>{
    fetchUser();
    fetchRecords(1, pageSize);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Blue Eye Test Assesement
          </Typography>
          <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={logout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      {currentUser && <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
          Welcome {currentUser.firstname} {currentUser.lastname}!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          You current credit is {currentUser.cost}.
        </Typography>
      </Container>}
      <Container maxWidth="lg" component="main">
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
        <DataTable loading={loading} data={records} removeRecord={handleRemoveRecord}/>
        <Grid container justifyContent="center">
          <Pagination count={totalPage} size="large" className={classes.pagination} onChange={onPaginationChange} value={curPage}/>
        </Grid>
      </Container>
      <RequestDialog
        operations={operations}
        open={openDialog}
        onCloseDialog={closeDialog}
        onSubmit={handleOperation}
      />
    </React.Fragment>
  );
};

export default HomePage;
