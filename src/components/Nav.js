import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = (props) => {
  //https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180
  return (
    <div className="nav">
      <div id="navLeft">
        <NavLink to="/log" >
        < h1 className="whiteText">Pursuit</h1>
        </NavLink>
      </div>
      <div id="navRight">
        <NavLink to="/log" activeClassName="navSelected">
          <h2 className="whiteText">Quest Log</h2>
        </NavLink >
        <NavLink to="/create" activeClassName="navSelected">
          <h2 className="whiteText">Create</h2>
        </NavLink>
        <NavLink to="/faq" activeClassName="navSelected">
          <h2 className="whiteText">FAQ</h2>
        </NavLink>
      </div>
    </div>
  )
}

export default Nav;
