import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions/authActions";
import { Link } from "react-router-dom";

const Header = (props) => {
  let [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow px-5">
        <div className="nav-item bg-dark">
          <button
            className="btn nav-link px-3"
            role="button"
            onClick={props.toggleSidebar}
          >
            {/* img not loading */}
            {/* <img
              className="img-fluid"
              src="/vendor/fontawesome-free/svgs/solid/bars.svg"
              alt="toggle-sidebar"
            /> */}

            {/* custom class defined in App.css */}
            <div className="sidebar-bars-btn text-white">|||</div>
          </button>
        </div>
        <div className="ml-auto nav-item dropdown no-arrow">
          <div
            className="btn nav-link dropdown-toggle"
            type="button"
            id="userDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={toggle}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {props.user.username}
            </span>
            <img
              className="img-profile rounded-circle img-fluid"
              src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
              alt="profile"
            />
          </div>
          <div
            className={
              "dropdown-menu shadow-sm animated--grow-in" +
              (isOpen ? " show" : null)
            }
            aria-labelledby="userDropdown"
          >
            <Link
              to="/profile"
              className="dropdown-item text-primary"
              type="button"
              activeclassname="active"
            >
              Profile
            </Link>
            <Link
              to="/menu/myMenu"
              className="dropdown-item text-primary"
              type="button"
              activeclassname="active"
            >
              My Menu
            </Link>
            <Link
              to="/menu/updateMenu"
              className="dropdown-item text-primary"
              type="button"
              activeclassname="active"
            >
              Update Menu
            </Link>
            <Link
              to="/reviews"
              className="dropdown-item text-primary"
              type="button"
              activeclassname="active"
            >
              Review
            </Link>
            <Link
              to="/payment"
              className="dropdown-item text-primary"
              type="button"
              activeclassname="active"
            >
              Payment
            </Link>
            <div className="dropdown-divider"></div>
            <div
              onClick={props.logout}
              className="dropdown-item text-danger btn btn-block"
              type="button"
            >
              <div className=" row justify-content-center">
                <div className="col-8">Logout</div>
                <div className=" col-4">
                  <img
                    src="/vendor/fontawesome-free/svgs/solid/sign-out-alt.svg"
                    alt="logout"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
