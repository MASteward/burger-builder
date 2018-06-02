import React, { Component } from 'react';
import Aux from '../Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from "../../components/Navigation/SideDrawer";


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler} />
        <SideDrawer
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}
        />
        <main className='content'>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
