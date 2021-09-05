import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddDish({ menu, isMenuLoaded }) {
  let [isCategoryOpen, setIsCategoryOpen] = useState(false);
  function toggleCategory() {
    setIsCategoryOpen((prev) => !prev);
  }
  let [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  function toggleSubCategory() {
    setIsSubCategoryOpen((prev) => !prev);
  }
  let [isDishOpen, setIsDishOpen] = useState(false);
  function toggleDish() {
    setIsDishOpen((prev) => !prev);
  }

  //   let [isUpdateDishOpen, setIsUpdateDishOpen] = useState(false);
  //   function toggleUpdateDish() {
  //     setIsUpdateDishOpen((prev) => !prev);
  //   }

  let [selectOperation, setSelectOperation] = useState({
    add: true,
    update: false,
  });
  function toggleSelectOperation(opt) {
    setSelectOperation({ add: false, update: false, [opt]: true });
  }

  // form section 3 (add/update a dish)
  let [categoryNameForm, setCategoryNameForm] = useState({
    category: null,
  });
  let [subCategoryNameForm, setSubCategoryNameForm] = useState({
    subCategory: null,
  });
  let [dishNameForm, setDishNameForm] = useState({
    dish: null,
  });
  let [FormThree, setForm] = useState({
    category: null,
    subCategory: null,
    dish: null,
  });
  // function updateCategoryFormThree(e) {
  //   e.preventDefault();
  //   setCategoryNameForm({ ...categoryNameForm, category: e.target.value });
  //   setForm({
  //     ...FormThree,
  //     catId: categoryNameForm.catId,
  //     category: categoryNameForm.category,
  //   });
  // }
  function updateSubCategoryForm(e) {
    e.preventDefault();
    setSubCategoryNameForm({
      ...subCategoryNameForm,
      subCategory: e.target.value,
    });
    setForm({
      ...FormThree,
      subCategory: subCategoryNameForm.subCategory,
    });
  }
  let [subCategoryArray, setSubCategoryArray] = useState([]);

  function handleOnClickSelectCategory(category) {
    setCategoryNameForm({ category: category.name });
    setSubCategoryArray(category.subCategories);
  }

  let [dishArray, setDishArray] = useState([]);

  function handleOnClickSelectSubCategory(subCategory) {
    setSubCategoryNameForm({ subCategory: subCategory.name });
    setDishArray(subCategory.dishes);
  }

  let [dishInfo, setDishInfo] = useState([]);
  function handleOnClickSelectDish(dish) {
    setDishNameForm({ dish: dish.title });
    console.log(dish);
    setDishInfo(dish);
  }
  function clearSelectCategory() {
    setCategoryNameForm({
      category: null,
    });
  }
  function clearSelectSubCategory() {
    setSubCategoryNameForm({
      subCategory: null,
    });
  }
  function clearSelectDish() {
    setDishNameForm({
      dish: null,
    });
  }
  return (
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
                onClick={toggleCategory}
              >
                Select category
              </button>
              <div
                className={
                  "dropdown-menu shadow-sm animated--grow-in" +
                  (isCategoryOpen ? " show" : null)
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
                          toggleCategory();
                          handleOnClickSelectCategory(category);
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
            className={categoryNameForm.category !== null ? "col-7" : "d-none"}
          >
            <span className="px-3 py-2 rounded bg-info text-white">
              {categoryNameForm.category}
            </span>
            <span onClick={clearSelectCategory} role="button" className="ml-3">
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
                onClick={toggleSubCategory}
              >
                Select Sub Category
              </button>
              <div
                className={
                  "dropdown-menu shadow-sm animated--grow-in" +
                  (isSubCategoryOpen ? " show" : null)
                }
                aria-labelledby="dropdownMenu2"
              >
                {isMenuLoaded && categoryNameForm.category !== null ? (
                  subCategoryArray.map((subCategory, indx) => {
                    return (
                      <button
                        key={indx}
                        className="dropdown-item text-primary"
                        type="button"
                        onClick={() => {
                          toggleSubCategory();
                          handleOnClickSelectSubCategory(subCategory);
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
              subCategoryNameForm.subCategory !== null
                ? "col-7 mt-3 "
                : " d-none"
            }
          >
            <span className="px-3 py-2 rounded bg-info text-white">
              {subCategoryNameForm.subCategory}
            </span>
            <span
              role="button"
              className="ml-3"
              onClick={clearSelectSubCategory}
            >
              clear
            </span>
          </div>
        </div>

        <br />

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              className={"nav-link" + (selectOperation.add ? " active" : " ")}
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
                "nav-link" + (selectOperation.update ? " active" : " ")
              }
              id="profile-tab"
              data-toggle="tab"
              to="#update"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => toggleSelectOperation("update")}
              disabled={subCategoryNameForm !== null ? false : true}
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
                  <label className="custom-control-label" htmlFor="isSpicy">
                    Spicy
                  </label>
                </div>
                <div className="custom-control custom-checkbox col-2 text-center">
                  <input
                    type="checkbox"
                    className=" custom-control-input"
                    id="isVeg"
                  />
                  <label className="custom-control-label" htmlFor="isVeg">
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
                    onClick={toggleDish}
                  >
                    Select Dish
                  </button>
                  <div
                    className={
                      "dropdown-menu shadow-sm animated--grow-in" +
                      (isDishOpen ? " show" : null)
                    }
                    aria-labelledby="dropdownMenu2"
                  >
                    {isMenuLoaded &&
                    subCategoryNameForm.subCategory !== null &&
                    categoryNameForm.category !== null ? (
                      dishArray.map((dish, indx) => {
                        return (
                          <button
                            key={indx}
                            className="dropdown-item text-primary"
                            type="button"
                            onClick={() => {
                              toggleDish();
                              handleOnClickSelectDish(dish);
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
                  dishNameForm.dish !== null ? "col-7 mt-3 " : " d-none"
                }
              >
                <span className="px-3 py-2 rounded bg-info text-white">
                  {dishNameForm.dish}
                </span>
                <span role="button" className="ml-3" onClick={clearSelectDish}>
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
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.title
                        : "select a dish"
                    }
                    placeholder="type here ..."
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="updateHalfPrice">Half Price (in ₹)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateHalfPrice"
                    name="updateHalfPrice"
                    value={
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.priceHalf
                        : "₹"
                    }
                    placeholder="₹₹"
                  />
                </div>
                <div className="form-group col-3">
                  <label htmlFor="updateFullPrice">Full Price (in ₹)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateFullPrice"
                    name="updateFullPrice"
                    value={
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.priceFull
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
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.desc
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
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.spicy
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
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.veg
                        : null
                    }
                  />
                  <label className="custom-control-label" htmlFor="updateIsVeg">
                    Veg
                  </label>
                </div>
                <div className="custom-control custom-checkbox col-2 text-center">
                  <input
                    type="checkbox"
                    className=" custom-control-input"
                    id="updateJainAvailable"
                    checked={
                      categoryNameForm.category !== null &&
                      subCategoryNameForm.subCategory !== null &&
                      dishNameForm.dish !== null
                        ? dishInfo.jainAvailable
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
  );
}

export default AddDish;
