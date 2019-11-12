import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { DropzoneDialog } from 'material-ui-dropzone';
import ChipInput from 'material-ui-chip-input';
import { createRecipeAction } from './actions';
import { selectIsLoading, selectCreateRecipeError } from './selector';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from './constants';

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

const CreateRecipe = ({ isLoading, recipeError, onCreateRecipe }) => {
  const classes = useStyles();

  // Recipe Image Picker Select
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  // Actual File
  const [recipeImage, setRecipeImage] = useState(null);

  // Upload Files
  const [files, setFiles] = useState([]);

  const handleClose = () => {
    setImagePickerOpen(false);
  };

  const handleImageSave = files => {
    // Save Image
    const file = files[0];
    setRecipeImage(URL.createObjectURL(file));

    setFiles(files);
    handleClose();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    // TODO : Submit Form and do validation
    console.log('Submitting');
    // console.log(JSON.stringify(form));
    const fileUris = [];
    for (const file of files) {
      console.log(file);

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      try {
        const res = await fetch(CLOUDINARY_UPLOAD_URL, {
          method: 'POST',
          body: data
        });
        const savedFile = await res.json();

        fileUris.push(savedFile.secure_url);
      } catch (error) {
        throw new Error(error);
      }
    }

    const newForm = { ...form, images: fileUris };
    onCreateRecipe(newForm);
  };

  // Form Data
  const [form, setForm] = useState({
    name: '',
    description: '',
    servings: '',
    serving_amount: '',
    prep_time: {
      hours: 0,
      minutes: 0
    },
    privacy: 'public',
    cook_time: {
      hours: 0,
      minutes: 0
    },
    ingredients: [],
    instructions: [],
    currentIngredient: '',
    currentInstruction: '',
    tags: [],
    images: []
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addInstruction = e => {
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
    setForm({
      ...form,
      instructions: form.instructions.filter(
        instruction => instruction !== form.instructions[idx]
      )
    });
  };

  const addIngredient = e => {
    e.preventDefault();

    if (form.currentIngredient !== '') {
      setForm({
        ...form,
        ingredients: form.ingredients.concat({
          name: form.currentIngredient,
          amount: '',
          description: ''
        }),
        currentIngredient: ''
      });
    }
  };

  const removeIngredient = id => {
    // Form should not be empty
    setForm({
      ...form,
      ingredients: form.ingredients.filter((ingredient, idx) => idx !== id)
    });
  };

  // Render Hours
  const renderItemHours = () => {
    const hours = [];

    for (var i = 1; i < 23; i++) {
      hours.push(
        <MenuItem key={i} value={i}>
          <em>{i} hr</em>
        </MenuItem>
      );
    }
    return hours;
  };

  // Render Minutes
  const renderItemMinutes = () => {
    const hours = [];

    for (var i = 1; i < 60; i++) {
      hours.push(
        <MenuItem key={i} value={i}>
          <em>{i} min</em>
        </MenuItem>
      );
    }
    return hours;
  };

  // Set Ingredient Details
  const setIngredientDetails = id => e => {
    const ingredients = form.ingredients;
    ingredients.map((ingredient, idx) =>
      id === idx ? (ingredient[e.target.name] = e.target.value) : ingredient
    );
    setForm({ ...form, ingredients });
  };

  const handleChangeCookTime = e => {
    setForm({
      ...form,
      cook_time: { ...form.cook_time, [e.target.name]: e.target.value }
    });
  };
  const handleChangePrepTime = e => {
    setForm({
      ...form,
      prep_time: { ...form.prep_time, [e.target.name]: e.target.value }
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
                  style={{ maxWidth: '30rem' }}
                  onClick={() => setImagePickerOpen(true)}
                  src={
                    recipeImage
                      ? recipeImage
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

              <TextField
                variant="outlined"
                placeholder="Enter Description"
                label="Description"
                required
                multiline
                fullWidth
                type="text"
                name="description"
                style={{ marginBottom: '1rem' }}
                value={form.description}
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
                    name="serving_amount"
                    value={form.serving_amount}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6">Prep Time</Typography>

              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={6}>
                  <Select
                    value={form.prep_time.hours}
                    name="hours"
                    fullWidth
                    variant="outlined"
                    onChange={handleChangePrepTime}
                  >
                    <MenuItem value={0}>
                      <em>0 hr</em>
                    </MenuItem>
                    {renderItemHours()}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    value={form.prep_time.minutes}
                    name="minutes"
                    onChange={handleChangePrepTime}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value={0}>
                      <em>0 min</em>
                    </MenuItem>
                    {renderItemMinutes()}
                  </Select>
                </Grid>
              </Grid>

              <Typography variant="h6">Cook Time</Typography>

              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={6}>
                  <Select
                    value={form.cook_time.hours}
                    name="hours"
                    fullWidth
                    variant="outlined"
                    onChange={handleChangeCookTime}
                  >
                    <MenuItem value={0}>
                      <em>0 hr</em>
                    </MenuItem>
                    {renderItemHours()}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    value={form.cook_time.minutes}
                    name="minutes"
                    onChange={handleChangeCookTime}
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value={0}>
                      <em>0 min</em>
                    </MenuItem>
                    {renderItemMinutes()}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Ingredients */}
          <Typography variant="h5" className={classes.grid}>
            Ingredients
          </Typography>

          <Grid
            container
            alignItems="center"
            spacing={2}
            style={{ marginTop: '1rem' }}
          >
            <Grid item xs={2}>
              <Button
                onClick={addIngredient}
                type="submit"
                variant="contained"
                color="primary"
              >
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

          {/* List of Ingredients */}
          {form.ingredients &&
            form.ingredients.map((ingredient, idx) => (
              <Paper className={classes.cardItem} key={idx}>
                <Grid
                  spacing={4}
                  container
                  alignItems="center"
                  justify="space-around"
                >
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      {idx + 1}. {ingredient.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      value={ingredient.amount}
                      fullWidth
                      label="Amount"
                      onChange={setIngredientDetails(idx)}
                      name="amount"
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      value={ingredient.description}
                      label="Description"
                      multiline
                      onChange={setIngredientDetails(idx)}
                      name="description"
                      variant="outlined"
                    />
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
              onChange={handleChange}
              type="text"
              placeholder="Enter Notes"
            />
          </Grid>

          {/* Instructions */}
          <Typography variant="h5" style={{ margin: '1rem' }}>
            Instructions
          </Typography>
          <Grid
            container
            alignItems="center"
            spacing={2}
            style={{ marginTop: '1rem' }}
          >
            <Grid item xs={2}>
              <Button
                onClick={addInstruction}
                variant="contained"
                color="primary"
                type="submit"
              >
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

          <ChipInput
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
            value={form.tags}
            helperText="Enter Tags"
            onAdd={chip => {
              // console.log(chip);
              form.tags.push(chip);
              setForm({ ...form, tags: form.tags });
            }}
            fullWidth
            onDelete={(chip, index) => {
              setForm({
                ...form,
                tags: form.tags.filter((chip, idx) => idx !== index)
              });
            }}
          />

          <Typography variant="h5">Privacy</Typography>

          <Select
            value={form.privacy}
            name="privacy"
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter Privacy"
            style={{ marginTop: '1rem', marginBottom: '2rem' }}
            fullWidth
          >
            <MenuItem value="public">
              <em>Public</em>
            </MenuItem>
            <MenuItem value="private">
              <em>Private</em>
            </MenuItem>
          </Select>

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
        fileLimit={4} // Select only one image
        showPreviewsInDropzone={true}
        showAlerts={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  recipeError: selectCreateRecipeError(state)
});

function mapDispatchToProps(dispatch) {
  return {
    onCreateRecipe: (...params) => dispatch(createRecipeAction(...params))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateRecipe);
