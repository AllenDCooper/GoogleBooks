import React from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "10px 0px",
    textAlign: "center",
  },
}));

function Header() {
  
  const classes = useStyles();

  return(
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        (React) Google Books Search
      </Typography>
      <Typography component="p">
        Search for and save books of interest
      </Typography>
    </Paper>
  )
}

export default Header;