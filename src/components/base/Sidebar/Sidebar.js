import React, { Fragment } from "react";
import SidebarNavButton from "./Helper/SidebarNavButton";
import NavObjectArray from "./Helper/_nav";

const navButtons = NavObjectArray.map((data, index) => {
  return (
    <SidebarNavButton
      key={index}
      title={data.title}
      redirectionLink={data.redirectionLink}
      faviconclass={data.faviconclass}
      isActive={data.isActive}
    />
  );
});

const Sidebar = (props) => {
  return (
    <Fragment>
      <ul
        className={
          "navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" +
          (props.showSidebar ? " d-block" : " d-none")
        }
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-text mx-3">Restaurant admin</div>
        </a>

        <hr className="sidebar-divider my-0" />

        {navButtons}
      </ul>
    </Fragment>
  );
};

export default Sidebar;
