import React from 'react';

import classes from './Recipe.css';

const recipe = ( props ) => (
  <div className={classes.Recipe}>
    <p className={classes.Content} >{props.body}</p>
    <div><button onClick={()=>props.clicked(props.title,props.body,props.id)} className={classes.Edit}><img src="https://image.flaticon.com/icons/png/512/149/149307.png" alt="Edit" className={classes.Icon} />Edit</button>
          <button onClick={()=>props.deleted(props.id)} className={classes.Delete}><img src="https://image.flaticon.com/icons/png/512/149/149343.png" alt="Delete" className={classes.Icon} />Delete</button></div>
  </div>
);

export default recipe;
