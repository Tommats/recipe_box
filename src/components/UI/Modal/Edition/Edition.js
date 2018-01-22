import React, { Component } from 'react';
import classes from './Edition.css';

class Edition extends Component {

  render () {
    return (
      <div className={classes.Inputs}>
          <div>
            <p>Title:</p><textarea value={this.props.title} onChange={this.props.titleTyped} />
          </div>
          <div>
            <p>Ingredients:</p><textarea value={this.props.body} className={classes.Ingredients} onChange={this.props.bodyTyped} />
          </div>
          <div>
            <button onClick={this.props.cancelled} className={classes.Cancel}><img src="https://image.flaticon.com/icons/png/512/149/149147.png" alt="Cancel" className={classes.Icon} />Cancel</button>
            <button type="submit" value="Save" onClick={this.props.saved} className={classes.Save}><img src="https://image.flaticon.com/icons/png/512/149/149148.png" alt="Save" className={classes.Icon} />Save</button>
          </div>
      </div>
    )
  }
}

export default Edition;
