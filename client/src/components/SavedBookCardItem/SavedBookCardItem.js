import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    width: "100%",
    float: "left",
    justify: "center",
    margin: "10px",
  },
  media: {
    height: 140,
  },
  cardContainer: {
    margin: "15px 0px",
  },
  title: {
    fontSize: 14,
  },
  thumbnailImg: {
      float: "left",
      margin: "5px 25px 5px 0px"
  }
});

export function SavedBookCardContainer({children}) {
  const classes = useStyles();
  return (
    <Grid className={classes.cardContainer}
    container
    direction="row"
    justify="center"
    alignItems="center">
        {children}
    </Grid>
    // <div className={classes.cardContainer}>
    //   {children}
    // </div>
  )
}

export function SavedBookCardItem(props) {
  const classes = useStyles();
  return(
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Written by: {props.authors}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <img className={classes.thumbnailImg} src={props.imageLink} alt="thumbnail" />
            {props.descriptions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={props.link} target="_blank" color="primary">
          Preview Link
        </Button>
        <Button id={props.id} color="secondary" onClick={ () => props.deleteBookFunction(props.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}