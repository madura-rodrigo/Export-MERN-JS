import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Popover,
  TextField,
  Typography,
  Input,
} from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import { StoreContext } from "../../stores/StoreContextProvider";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  image: {
    width: 400,
    height: "auto",
  },
}));

const AddCategory = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const rootStore = useContext(StoreContext);
  const classes = useStyles();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState();

  const [file, setFile] = useState();

  const { name, description } = category;

  const formData = new FormData();

  const handleClose = () => {
    setAnchorEl(null);
    setCategory({
      name: "",
      description: "",
    });
    setImage(null);
  };

  const handleAdd = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    setFile(target.files[0]);
    fileReader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.append("image", file);
    formData.append("name", category.name);
    formData.append("description", category.description);
    rootStore.categoryStore.addCategory(formData);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-label={`Add Category`} onClick={handleAdd}>
        <AddCircleIcon style={{ fontSize: 50 }} />
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
        <form
          className={classes.form}
          encType="multipart/form-data"
          onSubmit={(e) => onSubmit(e)}
        >
          <Box display="flex" m={1} p={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1}>
              <Typography component="h1" variant="h5">
                Add Category
              </Typography>
            </Box>
            <Box p={1} alignSelf="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
          <Grid container item xs={12} spacing={5}>
            <Grid item xs={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                autoFocus
              />
              <TextField
                variant="standard"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                accept="image/*"
                id="icon-button-photo"
                onChange={handleCapture}
                multiple
                hidden
                type="file"
              />
              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera style={{ fontSize: 50 }} />
                </IconButton>
              </label>
              <Box className={classes.image}>
                <img src={image} className={classes.media} />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Popover>
    </div>
  );
};

export default AddCategory;
