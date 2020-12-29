import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ButtonMenu from '../ButtonMenu/ButtonMenu'
const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <ButtonMenu clicked={props.opened} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
      <NavigationItems />
      </nav>
    </header>
  )
}

export default toolbar
