import { useState } from "react";
import "./App.css";
import React from "react";
import * as math from "mathjs";
class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
      equation: "0",
    };
  }
  componentDidMount() {
    document.querySelectorAll(".key").forEach((key) => {
      key.style.gridArea = `${key.id}`;
      key.addEventListener("click", this.handleClick);
    });
  }
  handleClick = (e) => {
    const value = e.target.dataset.value;
    if (value === "clear") {
      this.setState({
        output: "0",
        equation: "0",
      });
    } else if (value === "equals") {
      if (isNaN(this.state.equation[this.state.equation.length - 1])) {
        this.setState(
          {
            equation: this.state.equation.slice(0, -1),
          },
          () => {
            this.setState({
              output: this.state.equation
                ? `${math.evaluate(this.state.equation)}`
                : 0,
              equation: this.state.equation + "=",
            });
          }
        );
      } else {
        this.setState({
          output: this.state.equation
            ? `${math.evaluate(this.state.equation)}`
            : 0,
          equation: this.state.equation + "=",
        });
      }
    } else if (!isNaN(parseInt(value))) {
      if (this.state.equation[this.state.equation.length - 1] === "=") {
        this.setState(
          {
            output: "0",
            equation: "0",
          },
          () => {
            this.setState({
              equation: `${value}`,
              output: `${value}`,
            });
          }
        );
      } else if (
        this.state.output.length === 2 &&
        isNaN(parseInt(this.state.output[0])) &&
        this.state.output[1] === "0"
      ) {
        let fixedOutput = this.state.output.slice(0, -1) + value;
        let fixedEquation = this.state.equation.slice(0, -1) + value;
        this.setState({
          output: fixedOutput,
          equation: fixedEquation,
        });
      } else if (this.state.output === "0") {
        this.setState({
          output: `${value}`,
          equation: `${value}`,
        });
      } else {
        this.setState({
          equation: this.state.equation + value,
          output: this.state.output + value,
        });
      }
    } else if (value === ".") {
      if (this.state.output.includes(".")) return;
      else if (this.state.equation[this.state.equation.length - 1] === "=") {
        this.setState(
          {
            output: "0",
            equation: "0",
          },
          () => {
            this.setState({
              equation: `${0 + value}`,
              output: `${0 + value}`,
            });
          }
        );
      } else if (isNaN(this.state.output[this.state.output.length - 1])) {
        this.setState({
          equation: this.state.equation + 0 + value,
          output: this.state.output + 0 + value,
        });
      } else {
        this.setState({
          equation: this.state.equation + value,
          output: this.state.output + value,
        });
      }
    } else {
      if (this.state.equation[this.state.equation.length - 1] === "=") {
        this.setState(
          {
            equation: this.state.output + value,
          },
          () => {
            this.setState({
              output: value,
            });
          }
        );
      } else if (
        this.state.equation[this.state.equation.length - 1] === "-" &&
        isNaN(this.state.equation[this.state.equation.length - 2])
      ) {
        this.setState({
          equation: this.state.equation.slice(0, -2) + value,
          output: this.state.output.slice(0, -2) + value,
        });
      } else if (
        (isNaN(this.state.equation[this.state.equation.length - 1]) &&
          value !== "-") ||
        this.state.equation[this.state.equation.length - 1] === "-" ||
        (isNaN(this.state.equation[this.state.equation.length - 1]) &&
          isNaN(this.state.equation[this.state.equation.length - 2]))
      ) {
        this.setState({
          equation: this.state.equation.slice(0, -1) + value,
          output: this.state.output.slice(0, -1) + value,
        });
      } else {
        this.setState({
          equation: this.state.equation + value,
          output: `${value}`,
        });
      }
    }
  };
  render() {
    return (
      <main>
        <section className="displaySection">
          <div className="equation">{this.state.equation}</div>
          <div id="display">{this.state.output}</div>
        </section>
        {/*prettier-ignore*/}
        <section className="keysContainer">
          <div id="clear" className="key" data-value="clear">AC</div>
          <div id="divide" className="key" data-value="/">/</div>
          <div id="multiply" className="key" data-value="*">x</div>
          <div id="subtract" className="key" data-value="-">-</div>
          <div id="add" className="key" data-value="+">+</div>
          <div id="equals" className="key" data-value="equals">=</div>
          <div id="decimal" className="key" data-value=".">.</div>
          <div id="nine" className="key" data-value="9">9</div>
          <div id="eight" className="key" data-value="8">8</div>
          <div id="seven" className="key" data-value="7">7</div>
          <div id="six" className="key" data-value="6">6</div>
          <div id="five" className="key" data-value="5">5</div>
          <div id="four" className="key" data-value="4">4</div>
          <div id="three" className="key" data-value="3">3</div>
          <div id="two" className="key" data-value="2">2</div>
          <div id="one" className="key" data-value="1">1</div>
          <div id="zero" className="key" data-value="0">0</div>
        </section>
      </main>
    );
  }
}

export default Calc;
