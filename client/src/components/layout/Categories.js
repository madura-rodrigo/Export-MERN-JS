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
import { Typography } from "@material-ui/core";

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
  useEffect(() => {
    rootStore.categoryStore.load();
  }, []);
  const categoryData = rootStore.categoryStore.categoryData;
  console.log(categoryData);
  return (
    <div className="products-catagories-area clearfix">
      <div className="amado-pro-catagory clearfix">
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList} cols={3}>
            <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
              <Typography component="h1" variant="h5">
                Categories
              </Typography>
            </GridListTile>
            {categoryData.map((tile) => (
              <GridListTile key={tile.iconUrl}>
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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];

export default observer(Categories);
