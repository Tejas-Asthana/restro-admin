import React from "react";

function Forms(props) {
  return (
    <form method={props.method} action={props.action}>
      <div
        style={{ display: props.username.show ? "block" : "none" }}
        className="form-group"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={props.username.value}
          onChange={(e) => props.onChangeMethod(e)}
          required={props.username.isRequired}
        />
      </div>
      <div
        style={{ display: props.email.show ? "block" : "none" }}
        className="form-group"
      >
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={props.email.value}
          onChange={(e) => props.onChangeMethod(e)}
          aria-describedby="emailHelp"
          required={props.email.isRequired}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div
        style={{ display: props.password.show ? "block" : "none" }}
        className="form-group"
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={props.password.value}
          onChange={(e) => props.onChangeMethod(e)}
          required={props.password.isRequired}
        />
      </div>
      <div
        style={{ display: props.checkbox.show ? "block" : "none" }}
        className="form-group form-check"
      >
        <input type="checkbox" className="form-check-input" id="remember" />
        <label className="form-check-label" htmlFor="remember">
          Check me out
        </label>
      </div>
      <button
        onClick={(e) => props.handleSubmitMethod(e)}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
}

export default Forms;
