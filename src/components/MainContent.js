import React from "react";

import CurrenciesList from "./CurrenciesList";
import Profile from "./Profile";

class MainContent extends React.Component {
  getContent(passedProps) {
    let content = <CurrenciesList passedProps={passedProps} />;
    if (passedProps != null && passedProps.activeTab === 1) {
      content = <Profile />;
    }

    return content;
  }

  render() {
    const { passedProps } = this.props;
    let content = this.getContent(passedProps);
    return content;
  }
}

export default MainContent;
