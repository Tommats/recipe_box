import React, {Component} from 'react';
import classes from './Recipes.css';
import Recipe from './Recipe/Recipe';

//import Aux from '../../hoc/Auxiliary/Auxiliary';

class Recipes extends Component {
  state = {class: classes.RecipeNonActive}
  clickHanler = () => {
    let newClass = classes.RecipeActive;
    if (this.state.class === classes.RecipeActive) {
      newClass = classes.RecipeNonActive;
    }
    this.setState({class: newClass});
  }
  render () {
    return (
      <div className={classes.Recipes}>
        <p onClick={this.clickHanler} className={classes.title}>{this.props.title}</p>
        <div className={this.state.class}>
          <Recipe
            body={this.props.body}
            title={this.props.title}
            clicked={this.props.changed}
            id={this.props.id}
            deleted={this.props.deleted} />
        </div>
      </div>
    );
  }
}

export default Recipes;
