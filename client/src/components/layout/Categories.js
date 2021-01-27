import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Card, CardColumns } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(20),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Categories = () => {
  const classes = useStyles();
  return (
    <div className="products-catagories-area clearfix">
      <div className="amado-pro-catagory clearfix">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>xs</Paper>
            </Grid>
          </Grid>
        </div>

        {/*<CardColumns>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/1.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Modern Chair</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/2.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/3.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/4.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
          <Card className="single-products-catagory clearfix">
            <a href="shop.html">
              <Card.Img
                src={require("../../img/bg-img/5.jpg").default}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <div className="hover-content">
                  <div className="line"></div>
                  <p>From $180</p>
                  <h4>Minimalistic Plant Pot</h4>
                </div>
              </Card.ImgOverlay>
            </a>
          </Card>
        </CardColumns> */}
      </div>
    </div>
  );
};

export default Categories;
