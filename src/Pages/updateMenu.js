import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Base from "../components/base/Base/Base";
import Store from "../store/store";
import { loadUser, generateTokenConfig } from "../actions/authActions";

let Profile = (props) => {
  // let [isCategoryOpenOne, setIsCategoryOpenOne] = useState(false);
  // function toggleCategoryOne() {
  //   setIsCategoryOpenOne((prev) => !prev);
  // }

  let [isCategoryOpenTwo, setIsCategoryOpenTwo] = useState(false);
  function toggleCategoryTwo() {
    setIsCategoryOpenTwo((prev) => !prev);
  }
  let [isSubCategoryOpenTwo, setIsSubCategoryOpenTwo] = useState(false);
  function toggleSubCategoryTwo() {
    setIsSubCategoryOpenTwo((prev) => !prev);
  }

  let [isCategoryOpenThree, setIsCategoryOpenThree] = useState(false);
  function toggleCategoryThree() {
    setIsCategoryOpenThree((prev) => !prev);
  }
  let [isSubCategoryOpenThree, setIsSubCategoryOpenThree] = useState(false);
  function toggleSubCategoryThree() {
    setIsSubCategoryOpenThree((prev) => !prev);
  }
  let [isDishOpenThree, setIsDishOpenThree] = useState(false);
  function toggleDishThree() {
    setIsDishOpenThree((prev) => !prev);
  }

  let [isUpdateDishOpen, setIsUpdateDishOpen] = useState(false);
  function toggleUpdateDish() {
    setIsUpdateDishOpen((prev) => !prev);
  }

  let [selectOperation, setSelectOperation] = useState({
    add: true,
    update: false,
  });
  function toggleSelectOperation(opt) {
    setSelectOperation({ add: false, update: false, [opt]: true });
  }

  let [selectCategoryOperation, setSelectCategoryOperation] = useState({
    add: true,
    update: false,
  });
  function toggleSelectCategoryOperation(opt) {
    setSelectCategoryOperation({ add: false, update: false, [opt]: true });
  }

  let [selectSubCategoryOperation, setSelectSubCategoryOperation] = useState({
    add: true,
    update: false,
  });
  function toggleSelectSubCategoryOperation(opt) {
    setSelectSubCategoryOperation({ add: false, update: false, [opt]: true });
  }

  // form section 1 (add/update category)
  let [menu, setMenu] = useState({});
  let [isMenuLoaded, setIsMenuLoaded] = useState(false);

  let [categoryNameForm, setCategoryNameForm] = useState({
    id: null,
    category: "",
  });
  function updateCategoryForm(e) {
    e.preventDefault();
    setCategoryNameForm({ ...categoryNameForm, category: e.target.value });
  }

  let [isCategoryOpenOne, setIsCategoryOpenOne] = useState(false);
  function toggleCategoryOne() {
    setIsCategoryOpenOne((prev) => !prev);
  }
  function handleOnClickSelectCategory(id, category) {
    setCategoryNameForm({ id, category });
    // console.log(categoryNameForm);
  }
  function clearSelectCategory() {
    setCategoryNameForm({
      id: null,
      category: "",
    });
  }

  // form section 2 (add/update sub-category)
  let [categoryNameFormTwo, setCategoryNameFormTwo] = useState({
    catId: null,
    category: "",
  });
  let [subCategoryNameFormTwo, setSubCategoryNameFormTwo] = useState({
    subCatId: null,
    subCategory: "",
  });
  let [FormTwo, setFormTwo] = useState({
    catId: null,
    category: "",
    subCatId: null,
    subCategory: "",
  });
  function updateCategoryFormTwo(e) {
    e.preventDefault();
    setCategoryNameFormTwo({ ...categoryNameForm, category: e.target.value });
    setFormTwo({
      ...FormTwo,
      catId: categoryNameFormTwo.catId,
      category: categoryNameFormTwo.category,
    });
  }
  function updateSubCategoryFormTwo(e) {
    e.preventDefault();
    setSubCategoryNameFormTwo({
      ...subCategoryNameFormTwo,
      subCategory: e.target.value,
    });
    setFormTwo({
      ...FormTwo,
      subCatId: subCategoryNameFormTwo.subCatId,
      subCategory: subCategoryNameFormTwo.subCategory,
    });
  }
  function handleOnClickSelectCategoryTwo(catId, category) {
    setCategoryNameFormTwo({ catId, category });
    // console.log(categoryNameForm);
  }
  function handleOnClickSelectSubCategoryTwo(subCatId, subCategory) {
    setSubCategoryNameFormTwo({ subCatId, subCategory });
    // console.log(categoryNameForm);
  }
  function clearSelectCategoryTwo() {
    setCategoryNameFormTwo({
      catId: null,
      category: "",
    });
  }
  function clearSelectSubCategoryTwo() {
    setSubCategoryNameFormTwo({
      subCatId: null,
      category: "",
    });
  }

  // form section 3 (add/update a dish)
  let [categoryNameFormThree, setCategoryNameFormThree] = useState({
    catId: null,
    category: "",
  });
  let [subCategoryNameFormThree, setSubCategoryNameFormThree] = useState({
    subCatId: null,
    subCategory: "",
  });
  let [dishNameFormThree, setDishNameFormThree] = useState({
    dishId: null,
    dish: "",
  });
  let [FormThree, setFormThree] = useState({
    catId: null,
    category: "",
    subCatId: null,
    subCategory: "",
    dishId: null,
    dish: "",
  });
  function updateCategoryFormThree(e) {
    e.preventDefault();
    setCategoryNameFormThree({ ...categoryNameForm, category: e.target.value });
    setFormThree({
      ...FormThree,
      catId: categoryNameFormThree.catId,
      category: categoryNameFormThree.category,
    });
  }
  function updateSubCategoryFormThree(e) {
    e.preventDefault();
    setSubCategoryNameFormThree({
      ...subCategoryNameFormThree,
      subCategory: e.target.value,
    });
    setFormThree({
      ...FormThree,
      subCatId: subCategoryNameFormThree.subCatId,
      subCategory: subCategoryNameFormThree.subCategory,
    });
  }
  function handleOnClickSelectCategoryThree(catId, category) {
    setCategoryNameFormThree({ catId, category });
    // console.log(categoryNameForm);
  }
  function handleOnClickSelectSubCategoryThree(subCatId, subCategory) {
    setSubCategoryNameFormThree({ subCatId, subCategory });
    // console.log(categoryNameForm);
  }
  function handleOnClickSelectDishThree(dishId, dish) {
    setDishNameFormThree({ dishId, dish });
    // console.log(categoryNameForm);
  }
  function clearSelectCategoryThree() {
    setCategoryNameFormThree({
      catId: null,
      category: "",
    });
  }
  function clearSelectSubCategoryThree() {
    setSubCategoryNameFormThree({
      subCatId: null,
      category: "",
    });
  }
  function clearSelectDishThree() {
    setDishNameFormThree({
      dishId: null,
      dish: "",
    });
  }

  useEffect(() => {
    props.loadUser();
    // console.log(Store.store.getState());
    !props.user
      ? props.history.push("/login")
      : axios
          .get(
            `http://localhost:5000/api/admin/getMenu/${props.user.id}`,
            generateTokenConfig(Store.store.getState)
          )
          .then((res) => {
            JSON.stringify(res.data.data);
            setMenu(res.data.data);
            setIsMenuLoaded(true);
          })
          .catch((err) => {
            throw err;
          });
    // console.log(menu);
  }, []);

  return !props.isAuthenticated ? (
    <>{props.history.push("/login")}</>
  ) : (
    <Fragment>
      <Base>
        <div className="container-fluid">
          <div className="card shadow-sm">
            <div className=" card-header">
              <h1 className="ml-3">UPDATE MENU</h1>
            </div>
            <div className="card-body">
              <section id="add-category">
                <div className="row">
                  <div className="col-3 col-md-4">
                    <hr />
                  </div>
                  <div className="col-6 col-md-4 text-center">
                    <h4 className="mb-4 text-primary">Category</h4>
                  </div>
                  <div className="col-3 col-md-4">
                    <hr />
                  </div>
                </div>
                <div className="container">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <Link
                        className={
                          "nav-link " +
                          (selectCategoryOperation.add ? "active" : " ")
                        }
                        id="addCategory-tab"
                        data-toggle="tab"
                        to="#addCategory"
                        role="tab"
                        aria-controls="addCategory"
                        aria-selected="true"
                        onClick={() => toggleSelectCategoryOperation("add")}
                      >
                        Add
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        className={
                          "nav-link " +
                          (selectCategoryOperation.update ? "active" : " ")
                        }
                        onClick={() => toggleSelectCategoryOperation("update")}
                        id="updateCategory-tab"
                        data-toggle="tab"
                        to="#updateCategory"
                        role="tab"
                        aria-controls="updateCategory"
                        aria-selected="false"
                      >
                        Update
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={
                        "tab-pane fade " +
                        (selectCategoryOperation.add ? "show active" : " ")
                      }
                      id="addCategory"
                      role="tabpanel"
                      aria-labelledby="addCategory-tab"
                    >
                      <form className="mt-3 row align-items-center">
                        <div className="form-group col-11">
                          <label htmlFor="addCategory">Category Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addCategory"
                            name="addCategory"
                            placeholder="type here ..."
                          />
                        </div>
                        <div className="col-1">
                          <button type="submit" className="btn btn-primary">
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className={
                        "tab-pane fade " +
                        (selectCategoryOperation.update ? "show active" : " ")
                      }
                      id="updateCategory"
                      role="tabpanel"
                      aria-labelledby="updateCategory-tab"
                    >
                      <div className="row align-items-center justify-content-between my-2 mb-4">
                        <div className="col-5  ">
                          <div className="dropdown ">
                            <button
                              className="btn btn-outline-info dropdown-toggle mt-3"
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              onClick={toggleCategoryOne}
                            >
                              Select Category
                            </button>
                            <div
                              className={
                                "dropdown-menu shadow-sm animated--grow-in" +
                                (isCategoryOpenOne ? " show" : null)
                              }
                              aria-labelledby="dropdownMenu2"
                            >
                              {isMenuLoaded ? (
                                menu.categories.map((category, indx) => {
                                  return (
                                    <button
                                      key={indx}
                                      className="dropdown-item text-primary"
                                      type="button"
                                      onClick={() => {
                                        toggleCategoryOne();
                                        handleOnClickSelectCategory(
                                          category.id,
                                          category.name
                                        );
                                      }}
                                    >
                                      {category.name}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="container text-center">
                                  <div
                                    className="spinner-border"
                                    style={{ width: "3rem", height: "3rem" }}
                                    role="status"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            categoryNameForm.id !== null
                              ? "col-7 mt-3"
                              : "d-none"
                          }
                        >
                          <span className="px-3 py-2 rounded bg-info text-white">
                            {categoryNameForm.category}
                          </span>
                          <span
                            role="button"
                            className="ml-3"
                            onClick={clearSelectCategory}
                          >
                            clear
                          </span>
                        </div>
                      </div>
                      <form
                        className={
                          categoryNameForm.id !== null
                            ? "mt-3 row align-items-center "
                            : "d-none"
                        }
                      >
                        <div className="form-group col-11">
                          <label htmlFor="updateCategory">Category Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="updateCategory"
                            name="category"
                            value={categoryNameForm.category}
                            onChange={(e) => updateCategoryForm(e)}
                            placeholder="type here ..."
                          />
                        </div>
                        <div className="col-1">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
              {/* add category ends here */}

              {/* Form section 2 */}
              {/* add sub-category starts here */}
              <section className="mt-4" id="add-sub-category">
                <div className="row">
                  <div className="col-3 col-md-4">
                    <hr />
                  </div>
                  <div className="col-6 col-md-4 text-center">
                    <h4 className="mb-4 text-primary">Add Sub-category</h4>
                  </div>
                  <div className="col-3 col-md-4">
                    <hr />
                  </div>
                </div>
                <div className="container">
                  <div className="row align-items-center justify-content-between my-2 mb-4">
                    <div className="col-5  ">
                      <div className="dropdown ">
                        <button
                          className="btn btn-outline-info dropdown-toggle"
                          type="button"
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={toggleCategoryTwo}
                        >
                          Select category
                        </button>
                        <div
                          className={
                            "dropdown-menu shadow-sm animated--grow-in" +
                            (isCategoryOpenTwo ? " show" : null)
                          }
                          aria-labelledby="dropdownMenu2"
                        >
                          {isMenuLoaded ? (
                            menu.categories.map((category, indx) => {
                              return (
                                <button
                                  key={indx}
                                  className="dropdown-item text-primary"
                                  type="button"
                                  onClick={() => {
                                    toggleCategoryTwo();
                                    handleOnClickSelectCategoryTwo(
                                      category.id,
                                      category.name
                                    );
                                  }}
                                >
                                  {category.name}
                                </button>
                              );
                            })
                          ) : (
                            <div className="container text-center">
                              <div
                                className="spinner-border"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        categoryNameFormTwo.catId !== null ? "col-7" : "d-none"
                      }
                    >
                      <span className="px-3 py-2 rounded bg-info text-white">
                        {categoryNameFormTwo.category}
                      </span>
                      <span
                        onClick={clearSelectCategoryTwo}
                        role="button"
                        className="ml-3"
                      >
                        clear
                      </span>
                    </div>
                  </div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <Link
                        className={
                          "nav-link " +
                          (selectSubCategoryOperation.add ? " active" : " ")
                        }
                        onClick={() => toggleSelectSubCategoryOperation("add")}
                        id="addSubCategory-tab"
                        data-toggle="tab"
                        to="#addSubCategory"
                        role="tab"
                        aria-controls="addSubCategory"
                        aria-selected="true"
                      >
                        Add
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        className={
                          "nav-link " +
                          (selectSubCategoryOperation.update ? " active" : " ")
                        }
                        onClick={() =>
                          toggleSelectSubCategoryOperation("update")
                        }
                        id="updateSubCategory-tab"
                        data-toggle="tab"
                        to="#updateSubCategory"
                        role="tab"
                        aria-controls="updateSubCategory"
                        aria-selected="false"
                      >
                        Update
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={
                        "tab-pane fade " +
                        (selectSubCategoryOperation.add ? "show active" : " ")
                      }
                      id="addSubCategory"
                      role="tabpanel"
                      aria-labelledby="addSubCategory-tab"
                    >
                      <form className="mt-3 row align-items-center">
                        <div className="form-group col-11">
                          <label htmlFor="addCategory">Sub Category Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addCategory"
                            name="addCategory"
                            placeholder="type here ..."
                          />
                        </div>
                        <div className="col-1">
                          <button type="submit" className="btn btn-primary">
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className={
                        "tab-pane fade " +
                        (selectSubCategoryOperation.update
                          ? "show active"
                          : " ")
                      }
                      id="updateSubCategory"
                      role="tabpanel"
                      aria-labelledby="updateSubCategory-tab"
                    >
                      <div className="row align-items-center justify-content-between my-2 mb-4">
                        <div className="col-5  ">
                          <div className="dropdown ">
                            <button
                              className="btn btn-outline-info dropdown-toggle mt-3"
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              onClick={toggleSubCategoryTwo}
                            >
                              Select Sub Category
                            </button>
                            <div
                              className={
                                "dropdown-menu shadow-sm animated--grow-in" +
                                (isSubCategoryOpenTwo ? " show" : null)
                              }
                              aria-labelledby="dropdownMenu2"
                            >
                              {isMenuLoaded &&
                              categoryNameFormTwo.catId !== null ? (
                                menu.categories[
                                  categoryNameFormTwo.catId
                                ].subCategories.map((subCategory, indx) => {
                                  return (
                                    <button
                                      key={indx}
                                      className="dropdown-item text-primary"
                                      type="button"
                                      onClick={() => {
                                        toggleSubCategoryTwo();
                                        handleOnClickSelectSubCategoryTwo(
                                          subCategory.id,
                                          subCategory.name
                                        );
                                      }}
                                    >
                                      {subCategory.name}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="container text-center">
                                  <div
                                    className="spinner-border"
                                    style={{ width: "3rem", height: "3rem" }}
                                    role="status"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            subCategoryNameFormTwo.subCatId !== null
                              ? "col-7 mt-3 "
                              : " d-none"
                          }
                        >
                          <span className="px-3 py-2 rounded bg-info text-white">
                            {subCategoryNameFormTwo.subCategory}
                          </span>
                          <span
                            role="button"
                            className="ml-3"
                            onClick={clearSelectSubCategoryTwo}
                          >
                            clear
                          </span>
                        </div>
                      </div>
                      <form
                        className={
                          subCategoryNameFormTwo.subCatId !== null
                            ? "mt-3 row align-items-center "
                            : "d-none"
                        }
                      >
                        <div className="form-group col-11">
                          <label htmlFor="updateSubCategory">
                            Sub Category Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="updateSubCategory"
                            name="subCategory"
                            value={subCategoryNameFormTwo.subCategory}
                            onChange={(e) => updateSubCategoryFormTwo(e)}
                            placeholder="type here ..."
                          />
                        </div>
                        <div className="col-1">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
              {/* add sub-category ends here */}

              <br />

              {/* add dish starts here */}
              <section className="mt-4" id="add-dish">
                <div className="row">
                  <div className="col-3 col-md-4">
                    <hr />
                  </div>
                  <div className="col-6 col-md-4 text-center">
                    <h4 className="mb-3 text-primary">Add Dish</h4>
                  </div>
                  <div className="col-3 col-md-4">
                    <hr />
                  </div>
                </div>
                <div className="container">
                  {/* select a category from here */}
                  <div className="row align-items-center justify-content-between my-2 mb-4">
                    <div className="col-5  ">
                      <div className="dropdown ">
                        <button
                          className="btn btn-outline-info dropdown-toggle"
                          type="button"
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={toggleCategoryThree}
                        >
                          Select category
                        </button>
                        <div
                          className={
                            "dropdown-menu shadow-sm animated--grow-in" +
                            (isCategoryOpenThree ? " show" : null)
                          }
                          aria-labelledby="dropdownMenu2"
                        >
                          {isMenuLoaded ? (
                            menu.categories.map((category, indx) => {
                              return (
                                <button
                                  key={indx}
                                  className="dropdown-item text-primary"
                                  type="button"
                                  onClick={() => {
                                    toggleCategoryThree();
                                    handleOnClickSelectCategoryThree(
                                      category.id,
                                      category.name
                                    );
                                  }}
                                >
                                  {category.name}
                                </button>
                              );
                            })
                          ) : (
                            <div className="container text-center">
                              <div
                                className="spinner-border"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        categoryNameFormThree.catId !== null
                          ? "col-7"
                          : "d-none"
                      }
                    >
                      <span className="px-3 py-2 rounded bg-info text-white">
                        {categoryNameFormThree.category}
                      </span>
                      <span
                        onClick={clearSelectCategoryThree}
                        role="button"
                        className="ml-3"
                      >
                        clear
                      </span>
                    </div>
                  </div>

                  <br />

                  {/* select a sub-category from here */}
                  <div className="row align-items-center justify-content-between my-2 mb-4">
                    <div className="col-5  ">
                      <div className="dropdown ">
                        <button
                          className="btn btn-outline-info dropdown-toggle mt-3"
                          type="button"
                          id="dropdownMenu2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          onClick={toggleSubCategoryThree}
                        >
                          Select Sub Category
                        </button>
                        <div
                          className={
                            "dropdown-menu shadow-sm animated--grow-in" +
                            (isSubCategoryOpenThree ? " show" : null)
                          }
                          aria-labelledby="dropdownMenu2"
                        >
                          {isMenuLoaded &&
                          categoryNameFormThree.catId !== null ? (
                            menu.categories[
                              categoryNameFormThree.catId
                            ].subCategories.map((subCategory, indx) => {
                              return (
                                <button
                                  key={indx}
                                  className="dropdown-item text-primary"
                                  type="button"
                                  onClick={() => {
                                    toggleSubCategoryThree();
                                    handleOnClickSelectSubCategoryThree(
                                      subCategory.id,
                                      subCategory.name
                                    );
                                  }}
                                >
                                  {subCategory.name}
                                </button>
                              );
                            })
                          ) : (
                            <div className="container text-center">
                              <div
                                className="spinner-border"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        subCategoryNameFormThree.subCatId !== null
                          ? "col-7 mt-3 "
                          : " d-none"
                      }
                    >
                      <span className="px-3 py-2 rounded bg-info text-white">
                        {subCategoryNameFormThree.subCategory}
                      </span>
                      <span
                        role="button"
                        className="ml-3"
                        onClick={clearSelectSubCategoryThree}
                      >
                        clear
                      </span>
                    </div>
                  </div>

                  <br />

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <Link
                        className={
                          "nav-link" + (selectOperation.add ? " active" : " ")
                        }
                        id="home-tab"
                        data-toggle="tab"
                        to="#add"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                        onClick={() => toggleSelectOperation("add")}
                      >
                        Add
                      </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                      <Link
                        className={
                          "nav-link" +
                          (selectOperation.update ? " active" : " ")
                        }
                        id="profile-tab"
                        data-toggle="tab"
                        to="#update"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                        onClick={() => toggleSelectOperation("update")}
                      >
                        Update
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={
                        "tab-pane fade mt-3 " +
                        (selectOperation.add ? " show active" : " none")
                      }
                      id="add"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <form className="mt-3 align-items-center">
                        <div className="row">
                          <div className="form-group col-6">
                            <label htmlFor="dishName">Dish Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="dishName"
                              name="dishName"
                              placeholder="type here ..."
                            />
                          </div>
                          <div className="form-group col-3">
                            <label htmlFor="halfPrice">Half Price (in ₹)</label>
                            <input
                              type="text"
                              className="form-control"
                              id="halfPrice"
                              name="halfPrice"
                              placeholder="₹₹"
                            />
                          </div>
                          <div className="form-group col-3">
                            <label htmlFor="fullPrice">Full Price (in ₹)</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullPrice"
                              name="fullPrice"
                              placeholder="₹₹"
                            />
                          </div>
                        </div>
                        <div className="row align-items-center justify-content-lg-between">
                          <div className="col-8 form-group">
                            <label htmlFor="desc">Dish description</label>
                            <textarea
                              className="form-control"
                              id="desc"
                              name="desc"
                              rows="1"
                            ></textarea>
                          </div>
                        </div>
                        <div className="row align-items-center justify-content-lg-between">
                          <div className="custom-control custom-checkbox col-2 text-center">
                            <input
                              type="checkbox"
                              className=" custom-control-input"
                              id="isSpicy"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="isSpicy"
                            >
                              Spicy
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox col-2 text-center">
                            <input
                              type="checkbox"
                              className=" custom-control-input"
                              id="isVeg"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="isVeg"
                            >
                              Veg
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox col-2 text-center">
                            <input
                              type="checkbox"
                              className=" custom-control-input"
                              id="jainAvailable"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="jainAvailable"
                            >
                              Jain available
                            </label>
                          </div>
                        </div>
                        <div className="row mt-4 justify-content-end align-items-center">
                          <div className="col-1">
                            <button type="submit" className="btn btn-primary">
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className={
                        "tab-pane fade mt-3 " +
                        (selectOperation.update ? " show active" : " none")
                      }
                      id="update"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      {/* select a category from here */}
                      <div className="row align-items-center justify-content-between my-2 mb-4">
                        <div className="col-5  ">
                          <div className="dropdown ">
                            <button
                              className="btn btn-outline-info dropdown-toggle mt-3"
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              onClick={toggleDishThree}
                            >
                              Select Dish
                            </button>
                            <div
                              className={
                                "dropdown-menu shadow-sm animated--grow-in" +
                                (isDishOpenThree ? " show" : null)
                              }
                              aria-labelledby="dropdownMenu2"
                            >
                              {isMenuLoaded &&
                              subCategoryNameFormThree.subCatId !== null &&
                              categoryNameFormThree.catId !== null ? (
                                menu.categories[
                                  categoryNameFormThree.catId
                                ].subCategories[
                                  subCategoryNameFormThree.subCatId
                                ].dishes.map((dish, indx) => {
                                  return (
                                    <button
                                      key={indx}
                                      className="dropdown-item text-primary"
                                      type="button"
                                      onClick={() => {
                                        toggleDishThree();
                                        handleOnClickSelectDishThree(
                                          dish.id,
                                          dish.title
                                        );
                                      }}
                                    >
                                      {dish.title}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="container text-center">
                                  <div
                                    className="spinner-border"
                                    style={{ width: "3rem", height: "3rem" }}
                                    role="status"
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            dishNameFormThree.dishId !== null
                              ? "col-7 mt-3 "
                              : " d-none"
                          }
                        >
                          <span className="px-3 py-2 rounded bg-info text-white">
                            {dishNameFormThree.dish}
                          </span>
                          <span
                            role="button"
                            className="ml-3"
                            onClick={clearSelectDishThree}
                          >
                            clear
                          </span>
                        </div>
                      </div>
                      <form className="mt-3 align-items-center">
                        <div className="row">
                          <div className="form-group col-6">
                            <label htmlFor="updateDishName">Dish Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="updateDishName"
                              name="updateDishName"
                              value={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId].title
                                  : "select a dish"
                              }
                              placeholder="type here ..."
                            />
                          </div>
                          <div className="form-group col-3">
                            <label htmlFor="updateHalfPrice">
                              Half Price (in ₹)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="updateHalfPrice"
                              name="updateHalfPrice"
                              value={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId].priceHalf
                                  : "₹"
                              }
                              placeholder="₹₹"
                            />
                          </div>
                          <div className="form-group col-3">
                            <label htmlFor="updateFullPrice">
                              Full Price (in ₹)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="updateFullPrice"
                              name="updateFullPrice"
                              value={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId].priceFull
                                  : "₹"
                              }
                              placeholder="₹₹"
                            />
                          </div>
                        </div>
                        <div className="row align-items-center justify-content-lg-between">
                          <div className="col-8 form-group">
                            <label htmlFor="updateDesc">Dish description</label>
                            <textarea
                              className="form-control"
                              id="updateDesc"
                              name="updateDesc"
                              value={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId].desc
                                  : "dish discription"
                              }
                              rows="1"
                            ></textarea>
                          </div>
                        </div>
                        <div className="row align-items-center justify-content-lg-between">
                          <div className="custom-control custom-checkbox col-2 text-center">
                            <input
                              type="checkbox"
                              className=" custom-control-input"
                              id="updateIsSpicy"
                              checked={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId].spicy
                                  : null
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="updateIsSpicy"
                            >
                              Spicy
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox col-2 text-center">
                            <input
                              type="checkbox"
                              className=" custom-control-input"
                              id="updateIsVeg"
                              checked={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId].veg
                                  : null
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="updateIsVeg"
                            >
                              Veg
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox col-2 text-center">
                            <input
                              type="checkbox"
                              className=" custom-control-input"
                              id="updateJainAvailable"
                              checked={
                                categoryNameFormThree.catId !== null &&
                                subCategoryNameFormThree.subCatId !== null &&
                                dishNameFormThree.dishId !== null
                                  ? menu.categories[categoryNameFormThree.catId]
                                      .subCategories[
                                      subCategoryNameFormThree.subCatId
                                    ].dishes[dishNameFormThree.dishId]
                                      .jainAvailable
                                  : null
                              }
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="updateJainAvailable"
                            >
                              Jain available
                            </label>
                          </div>
                        </div>
                        <div className="row mt-4 justify-content-end align-items-center">
                          <div className="col-1">
                            <button type="submit" className="btn btn-primary">
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Base>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loadUser })(Profile);
