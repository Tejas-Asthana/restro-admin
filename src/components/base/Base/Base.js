import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

export default class Base extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showSidebar: true,
    };
  }

  toggleSidebar = () => {
    this.setState((prev) => {
      return {
        showSidebar: !prev.showSidebar,
      };
    });
  };

  render() {
    return (
      <div id="wrapper">
        <Sidebar showSidebar={this.state.showSidebar} />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header toggleSidebar={this.toggleSidebar} />
            <div style={{ minHeight: "650px" }}>{this.props.children}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
