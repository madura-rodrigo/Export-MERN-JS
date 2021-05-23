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
import DeleteIcon from "@material-ui/icons/Delete";
import { Typography, Box, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import configurations from "../../assets/config.json";

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
                {userLogged && <AddCategory />}
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
                      <EditCategory category={tile} />
                      <IconButton size="small" aria-label={`Delete`}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                  <img
                    src={configurations.staticURI + tile.iconUrl}
                    alt={tile.name}
                  />
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
      </div>
    </div>
  );
};

export default observer(Categories);
