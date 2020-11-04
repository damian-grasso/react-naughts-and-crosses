import React, { Component } from "react";
import ReactDOM from "react-dom";
import Form from "./components/FormComponent/Form";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <Form/>
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;