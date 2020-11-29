import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AccountCircle from "@material-ui/icons/AccountCircle";

class Header extends React.Component {
  getLoginButtonConfig(isLoggedIn) {
    let text = "Log in";
    let enabled = true;

    if (isLoggedIn === true) {
      text = "Logged in";
      enabled = false;
    }

    return {
      text,
      enabled
    };
  }

  /* Decide what tabs to show depending on the fact that user is logged in or not */
  getTabs(isLoggedIn) {
    let tabs = [];
    tabs.push(
      <Tab
        key="0"
        label="Home"
        id="simple-tab-1"
        aria-controls="simple-tabpanel-1"
      />
    );
    if (isLoggedIn === true) {
      tabs.push(
        <Tab
          key="1"
          label="Profile"
          id="simple-tab-2"
          aria-controls="simple-tabpanel-2"
        />
      );
    }
    return tabs;
  }

  render() {
    const {
      passedProps: { isLoggedIn, activeTab, handleTabChange, logInCallback }
    } = this.props;

    let tabs = this.getTabs(isLoggedIn);
    let btnConfig = this.getLoginButtonConfig(isLoggedIn);

    return (
      <div className="main-container">
        <AppBar position="static">
          <Toolbar>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              {tabs}
            </Tabs>
            <Button
              className="loginBtn"
              color="inherit"
              disabled={!btnConfig.enabled}
              onClick={logInCallback}
              startIcon={<AccountCircle />}
            >
              {btnConfig.text}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
