import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';

import classes from './Main.css';

import Recipes from '../../components/Recipes/Recipes';
import Modal from '../../components/UI/Modal/Modal';
import Edition from '../../components/UI/Modal/Edition/Edition';

class Main extends Component {
  state = {
    recipes: null,
    showRecipe: false,
    newRecipeState: false,
    title: '',
    body: '',
    id: '',
    new: ''
  }
  componentDidMount () {
    if (localStorage.getItem("recipes")) {
      let loadStorage =  JSON.parse(localStorage.getItem("recipes"));
      this.setState({recipes: loadStorage});
    } else {
      axios.get('https://api.myjson.com/bins/189qd9')
      .then( response => {
        const loadedRecipes = response.data;
        localStorage.setItem("recipes", JSON.stringify(loadedRecipes));
        this.setState({recipes: loadedRecipes})
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  recipeClickHandler = (title, body, id) => {
    this.setState({showRecipe: true, title: title, body: body, id: id});
  }

  newRecipeClickHandler = () => {
    let emptyVals = '';
    this.setState({showRecipe: true, title: emptyVals, body: emptyVals, newRecipeState: true});
  }

  closeModal = () => {
    this.setState({showRecipe: false});
  }

  editClickedHandler = (title,body) => {
    this.setState({title: title, body: body});
  }

  titleTypedHandler = (event) => {
    const titleType = event.target.value;
    this.setState({title: titleType});
  }

  bodyTypedHandler = (event) => {
    const bodyType = event.target.value;
    this.setState({body: bodyType});
  }

  saveChangesHandler = () => {
    let newRecipes = this.state.recipes;
    if (this.state.newRecipeState) {
      const newObj = {title: this.state.title, ingredients: this.state.body }
      newRecipes.push(newObj);
    } else {
    newRecipes[this.state.id].title = this.state.title;
    newRecipes[this.state.id].ingredients = this.state.body;
    }
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    this.setState({recipes: newRecipes, showRecipe: false, newRecipeState: false});
  }

  deleteRecipeHandler = (id) => {
    let newRecipes = this.state.recipes;
    newRecipes.splice(id,1);
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    this.setState({recipes: newRecipes});
  }

  render () {
    let recipesList = 'Loading...';
    if (this.state.recipes) {
      recipesList = this.state.recipes.map((recipe, index) => {
        return (
          <Recipes
            key={index}
            id={index}
            title={recipe.title}
            body={recipe.ingredients}
            changed={this.recipeClickHandler}
            deleted={this.deleteRecipeHandler} />
        );
      });
    }
    return (
      <Aux>
        <Modal show={this.state.showRecipe} modalClosed={this.closeModal} title={this.state.title} body={this.state.body}>
          <Edition
            title={this.state.title}
            body={this.state.body}
            cancelled={this.closeModal}
            titleTyped={this.titleTypedHandler}
            bodyTyped={this.bodyTypedHandler}
            saved={this.saveChangesHandler} />
        </Modal>
        <div className={classes.LogoText}>My Recipes <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/255839-200.png" alt="My Recipes" className={classes.Logo} /></div>
        <div className={classes.Main}>
          {recipesList}
          <div>
            <button onClick={this.newRecipeClickHandler} className={classes.New}><img src="https://image.flaticon.com/icons/png/512/149/149345.png" alt="New" className={classes.Icon} /> New</button>
          </div>
        </div>

      </Aux>
    );
  }
}

export default Main;
