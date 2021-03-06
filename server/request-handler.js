const Recipe = require('../db/models/recipe.js');
const User = require('../db/models/user.js');

//all requests go here
//export contents to server.js
//TODO: write function that sends some or all of a user's info to client on Login
//TODO: write backend auth functions

exports.sendRecipes = (req, res) => {
  let query = req.query;
  //we'll use this to find recipes with a high correllation to our search terms
  //but for now we can just send 5 random recipes from the db
  Recipe.find({})
    .limit(5)
    .exec( (err, recipes) => {
      if (err) {
        console.log(err);
        res.status(404).send('An error occurred');
      } else {
        res.status(200).send(recipes);
      }
    });

};

exports.newRecipe = (req, res) => {
  //function to calculate recipe difficulty? Or should we let users select their own?
  let newRecipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    time: req.body.time,
    instructions: req.body.instructions,
    //hard-coded for now
    difficulty: 0,
    //also hard-coded for now
    rating: 10,
    //Allow users to upload pictures with the recipe;
    //upload to hosting service may take a while,
    //so we'll save a placeholder and update the recipe entry with the right url when the upload is done.
    imageUrl: 'Waiting for image upload...',
    //save a reference to the original submitter
    source: req.body.userId
  });
  newRecipe.save((err, recipe) => {
    if (err) {
      console.log(err);
      res.status(500).send('Recipe submission failed');
    } else {
      res.status(201).send('Recipe saved!');
    }
  });
  //invoke next(); to move onto async image processing function
  //TODO: write image processing & imageUrl update function
};

exports.sendBookmarkedRecipes = (req, res) => {
  let bookmarks = req.body.bookmarks; //should be an array of recipe IDs
  Recipe.find({
    //selects all documents where the array specified by $in contains the value recorded in the field
    name: { $in: bookmarks }
    //maybe we'll use ID instead of name?
  })
    .exec((err, recipes) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving your recipies');
      } else {
        res.status(200).send(recipes);
      }
    });
};
