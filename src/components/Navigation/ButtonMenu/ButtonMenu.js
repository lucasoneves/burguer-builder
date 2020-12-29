import React from 'react'
import classes from './ButtonMenu.module.css'

const buttonMenu = (props) => {
  return (
    <div 
      onClick={props.clicked}
      className={classes.ButtonMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default buttonMenu
