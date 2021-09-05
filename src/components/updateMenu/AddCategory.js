import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddCategory({ menu, isMenuLoaded }) {
  let [categoryNameForm, setCategoryNameForm] = useState({
    category: null,
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
  }
  function clearSelectCategory() {
    setCategoryNameForm({
      category: null,
    });
  }

  let [selectCategoryOperation, setSelectCategoryOperation] = useState({
    add: true,
    update: false,
  });
  function toggleSelectCategoryOperation(opt) {
    setSelectCategoryOperation({ add: false, update: false, [opt]: true });
  }

  return (
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
                "nav-link " + (selectCategoryOperation.add ? "active" : " ")
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
                "nav-link " + (selectCategoryOperation.update ? "active" : " ")
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
                      menu?.categories?.map((category, indx) => {
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
                  categoryNameForm.category !== null ? "col-7 mt-3" : "d-none"
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
                categoryNameForm.category !== null
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
  );
}

export default AddCategory;
