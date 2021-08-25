import React from "react";
import { Link } from "react-router-dom";

const SidebarNavButton = (values) => {
  return (
    <li className="nav-item">
      <Link className="nav-link text-center" to={values.redirectionLink}>
        <i className={values.iconClass} />
        <span>{values.title}</span>
      </Link>
    </li>
  );
};

export default SidebarNavButton;
