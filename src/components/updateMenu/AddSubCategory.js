import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddSubCategory({ menu, isMenuLoaded }) {
  let [isCategoryOpen, setIsCategoryOpen] = useState(false);
  function toggleCategory() {
    setIsCategoryOpen((prev) => !prev);
  }
  let [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  function toggleSubCategory() {
    setIsSubCategoryOpen((prev) => !prev);
  }

  let [categoryNameForm, setCategoryNameForm] = useState({
    category: null,
  });
  let [subCategoryNameForm, setSubCategoryNameForm] = useState({
    subCategory: null,
  });
  let [FormTwo, setFormTwo] = useState({
    category: "",
    subCategory: "",
  });
  function updateSubCategoryForm(e) {
    e.preventDefault();
    setSubCategoryNameForm({
      ...subCategoryNameForm,
      subCategory: e.target.value,
    });
    setFormTwo({
      ...FormTwo,
      subCategory: subCategoryNameForm.subCategory,
    });
  }

  let [subCategoryArray, setSubCategoryArray] = useState([]);

  function handleOnClickSelectCategory(category) {
    setCategoryNameForm({ category: category.name });
    setSubCategoryArray(category.subCategories);
  }
  function handleOnClickSelectSubCategory(subCategory) {
    setSubCategoryNameForm({ subCategory });
    // console.log(categoryNameForm);
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

  let [selectSubCategoryOperation, setSelectSubCategoryOperation] = useState({
    add: true,
    update: false,
  });
  function toggleSelectSubCategoryOperation(opt) {
    setSelectSubCategoryOperation({ add: false, update: false, [opt]: true });
  }

  return (
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
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              className={
                "nav-link " + (selectSubCategoryOperation.add ? " active" : " ")
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
              onClick={() => toggleSelectSubCategoryOperation("update")}
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
              (selectSubCategoryOperation.update ? "show active" : " ")
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
                              handleOnClickSelectSubCategory(subCategory.name);
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
            <form
              className={
                subCategoryNameForm.subCategory !== null
                  ? "mt-3 row align-items-center "
                  : "d-none"
              }
            >
              <div className="form-group col-11">
                <label htmlFor="updateSubCategory">Sub Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="updateSubCategory"
                  name="subCategory"
                  value={subCategoryNameForm.subCategory}
                  onChange={(e) => updateSubCategoryForm(e)}
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
  );
}

export default AddSubCategory;
