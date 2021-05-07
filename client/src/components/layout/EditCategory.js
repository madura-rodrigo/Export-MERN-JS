import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { StoreContext } from "../../stores/StoreContextProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "40ch",
    },
  },
}));

const EditCategory = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const rootStore = useContext(StoreContext);
  const classes = useStyles();
  const [category, setCategory] = useState(props.category);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    rootStore.categoryStore.updateCategory(category);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton size="small" aria-label={`Edit`} onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper className={classes.paper}>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <Box display="flex" m={1} p={1} bgcolor="background.paper">
              <Box p={1} flexGrow={1}>
                <Typography component="h1" variant="h5">
                  Edit Category - {category.name}
                </Typography>
              </Box>
              <Box p={1} alignSelf="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
            <Grid container spacing={5}>
              <Grid item xs={9}>
                <div>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    value={category.name}
                    onChange={(e) => onChange(e)}
                    autoFocus
                  />
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="description"
                    label="description"
                    name="description"
                    value={category.description}
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Popover>
    </div>
  );
};

export default EditCategory;
