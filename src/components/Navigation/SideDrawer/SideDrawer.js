import React from "react";
import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop";
import Aux from '../../../hoc/Aux';


const sideDrawer = (props) => {
  let attachedClasses = [".SideDrawer", "Close"];
  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />

      <div className={attachedClasses.join(" ")}>

        <div className="BurgerLogo">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>

      </div>
    </Aux>
  )
};

export default sideDrawer;
