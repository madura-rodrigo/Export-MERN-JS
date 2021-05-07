import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, Box, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditCategory from "./EditCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Categories = () => {
  const classes = useStyles();
  const rootStore = useContext(StoreContext);
  const userLogged = rootStore.userStore.isRoleAdmin;
  useEffect(() => {
    rootStore.categoryStore.load();
  }, []);
  const categoryData = rootStore.categoryStore.categoryData;

  return (
    <div className="products-catagories-area clearfix">
      <div className="amado-pro-catagory clearfix">
        <div className={classes.root}>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
              <Box
                display="flex"
                flexDirection="row"
                m={0}
                p={0}
                bgcolor="background.paper"
              >
                <Typography component="h1" variant="h5">
                  Categories
                </Typography>
                {userLogged && (
                  <IconButton aria-label={`Add Category`}>
                    <AddCircleIcon style={{ fontSize: 50 }} />
                  </IconButton>
                )}
              </Box>
            </GridListTile>
            {categoryData.map((tile) => (
              <GridListTile key={tile.iconUrl}>
                <Card>
                  {userLogged && (
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      m={0}
                      p={0}
                      bgcolor="background.paper"
                    >
                      <Box p={1}>
                        <EditCategory category={tile} />
                        <IconButton size="small" aria-label={`Delete`}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                  <img src={tile.iconUrl} alt={tile.name} />
                  <GridListTileBar
                    title={tile.name}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${tile.name}`}
                        className={classes.icon}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </Card>
              </GridListTile>
            ))}
          </GridList>
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

export default observer(Categories);
