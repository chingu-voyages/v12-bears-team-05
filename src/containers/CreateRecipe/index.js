import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    padding: theme.spacing(2)
  },
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  cardItem: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  createButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const CreateRecipe = () => {
  const classes = useStyles();

  // Recipe Image Picker Select
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  // Actual File
  const [recipeImage, setRecipeImage] = useState(null);

  const handleClose = () => {
    setImagePickerOpen(false);
  };

  const handleImageSave = files => {
    // Save Image
    const file = files[0];
    setRecipeImage(file);
    handleClose();
  };
  const handleSubmit = e => {
    e.preventDefault();
    // TODO : Submit Form
  };

  // Form Data
  const [form, setForm] = useState({
    name: '',
    description: '',
    servings: '',
    servingsAmount: '',
    prepTimeHour: 0,
    prepTimeMinute: 0,
    ingredients: [],
    instructions: [],
    currentIngredient: '',
    currentInstruction: ''
  });

  const handleChange = e => {
    // console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addIngredient = e => {
    // Form should not be mepty
    e.preventDefault();

    if (form.currentIngredient !== '') {
      setForm({
        ...form,
        ingredients: form.ingredients.concat(form.currentIngredient),
        currentIngredient: ''
      });
    }
  };

  const addInstruction = e => {
    // Form should not be mepty
    e.preventDefault();
    if (form.currentInstruction !== '') {
      setForm({
        ...form,
        instructions: form.instructions.concat(form.currentInstruction),
        currentInstruction: ''
      });
    }
  };
  const removeInstruction = idx => {
    // Form should not be mepty
    setForm({
      ...form,
      instructions: form.instructions.filter(
        instruction => instruction !== form.instructions[idx]
      )
    });
  };

  const removeIngredient = idx => {
    // Form should not be mepty
    setForm({
      ...form,
      ingredients: form.ingredients.filter(
        ingredient => ingredient !== form.ingredients[idx]
      )
    });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Recipe Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* Delay rendering until element is visible (lazy rendering) */}
              <VisibilitySensor>
                <Img
                  onClick={() => setImagePickerOpen(true)}
                  src={
                    recipeImage
                      ? URL.createObjectURL(recipeImage)
                      : ['https://place-hold.it/500x200/DEDEDE?text=Add Recipe']
                  }
                />
              </VisibilitySensor>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="Enter Name"
                label="Name"
                required
                fullWidth
                type="text"
                name="name"
                style={{ marginBottom: '1rem' }}
                value={form.name}
                onChange={handleChange}
              />
              <Typography variant="h6">Servings</Typography>
              <Grid container spacing={4} className={classes.grid}>
                <Grid item xs>
                  <TextField
                    variant="outlined"
                    placeholder="Enter Servings"
                    label="Servings"
                    required
                    type="number"
                    fullWidth
                    name="servings"
                    value={form.servings}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    variant="outlined"
                    placeholder="Serving Amount"
                    label="Amount in a serving"
                    required
                    type="number"
                    fullWidth
                    name="servingsAmount"
                    value={form.servingsAmount}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Prep Time</Typography>

              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="prepTimeHour">Hour</InputLabel>
                    <Select
                      labelId="prepTimeHour"
                      value={form.prepTimeHour}
                      name="prepTimeHour"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>
                        <em>0 hr</em>
                      </MenuItem>
                      <MenuItemHour />
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="prepTimeMinute">Minute</InputLabel>
                    <Select
                      labelId="prepTimeMinute"
                      value={form.prepTimeMinute}
                      name="prepTimeMInute"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>
                        <em>0 min</em>
                      </MenuItem>
                      <MenuItemMinute />
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Ingredients */}
          <Typography variant="h5" className={classes.grid}>
            Ingredients
          </Typography>

          <form onSubmit={addIngredient}>
            <Grid
              container
              alignItems="center"
              spacing={2}
              style={{ marginTop: '1rem' }}
            >
              <Grid item xs={2}>
                <Button type="submit" variant="contained" color="primary">
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  value={form.currentIngredient}
                  name="currentIngredient"
                  variant="outlined"
                  placeholder="Add One Ingredient per line"
                />
              </Grid>
            </Grid>
          </form>

          {/* List of Ingredients */}
          {form.ingredients &&
            form.ingredients.map((ingredient, idx) => (
              <Paper className={classes.cardItem} key={idx}>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="body2">
                      {idx + 1}. {ingredient}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeIngredient(idx)}>
                      <HighlightOffIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}

          <Grid container className={classes.grid}>
            <Typography variant="h5">Notes</Typography>
            <TextField
              variant="outlined"
              fullWidth
              name="notes"
              multiline
              rows="4"
              type="text"
              placeholder="Enter Notes"
            />
          </Grid>

          {/* Instructions */}
          <Typography variant="h5" style={{ margin: '1rem' }}>
            Directions
          </Typography>
          <form onSubmit={addInstruction}>
            <Grid
              container
              alignItems="center"
              spacing={2}
              style={{ marginTop: '1rem' }}
            >
              <Grid item xs={2}>
                <Button variant="contained" color="primary" type="submit">
                  <AddIcon />
                </Button>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  value={form.currentInstruction}
                  name="currentInstruction"
                  variant="outlined"
                  placeholder="Add One Instruction per line"
                />
              </Grid>
            </Grid>
          </form>

          {form.instructions &&
            form.instructions.map((instruction, idx) => (
              <Paper className={classes.cardItem} key={idx}>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant="body2">
                      {idx + 1}. {instruction}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeInstruction(idx)}>
                      <HighlightOffIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}

          <Button
            className={classes.createButton}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Create
            <AddBoxIcon />
          </Button>
        </Card>
      </form>
      <DropzoneDialog
        open={imagePickerOpen}
        onSave={handleImageSave}
        acceptedFiles={['image/*']}
        showPreviews={true}
        dropzoneText="Drag and drop an Image file here"
        fileLimit={1} // Select only one image
        showPreviewsInDropzone={true}
        showAlerts={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );
};

// Loop to get List of all possible hours
const MenuItemHour = () => {
  var rows = [];

  for (var i = 1; i < 23; i++) {
    rows.push(
      <MenuItem key={i} value={i}>
        <em>{i} hr</em>
      </MenuItem>
    );
  }

  return rows;
};
// Loop to get List of all possible minutes
const MenuItemMinute = () => {
  var rows = [];

  for (var i = 1; i < 60; i++) {
    rows.push(
      <MenuItem key={i} value={i}>
        <em>{i} min</em>
      </MenuItem>
    );
  }

  return rows;
};

export default CreateRecipe;
