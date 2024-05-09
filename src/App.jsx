import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [operatorCount, setOperatorCount] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  function allClear() {
    setDisplay("0");
    setOperatorCount(0);
    setDotCount(0);

  }


  function clearEntry() {
    let lastElement = display[display.length - 1];
    if (
      lastElement === "+" ||
      lastElement === "-" ||
      lastElement === "*" ||
      lastElement === "/" ||
      lastElement === "%"
    ) {
      setDisplay(display.slice(0, -1));
      setOperatorCount(0);
      return;
    } else if (lastElement === ".") {
      setDisplay(display.slice(0, -1));
      setDotCount(0);
      return;
    } else {
      if (display.length === 1) {
        setDisplay(display.slice(0, -1));
        setDisplay("0");
      } else {
        setDisplay(display.slice(0, -1));
      }
      console.log(display.length);
    }
  }

  function clickedNumber(number) {
    if (number === "0" && display === "0") {
      setDisplay("0");
      return;
    } else if (number === "0" && display !== "0") {
      if (display.length >= 1) {
        setDisplay(display + number);
        setOperatorCount(0);
        return;
      } else {
        setDisplay(number);
        setOperatorCount(0);
        return;
      }
    } else {
      if (display === "0") {
        setDisplay(number);
        setOperatorCount(0);
      } else {
        setDisplay(display + number);
        setOperatorCount(0);
      }
    }
  }

  function clickedOperator(opr) {
    console.log("Before operation operator count = " + operatorCount);
    if (operatorCount === 0) {
      setOperatorCount(1);
      setDisplay(display + opr);
      setDotCount(0);
    } else {
      setDisplay(display.slice(0, -1) + opr);

      setOperatorCount(1);
    }
    console.log("After operation operator count = " + operatorCount);
  }

  function clickedDot(opr) {
    console.log("Before dot click dot count = " + dotCount);

    if (dotCount === 0) {
      if (operatorCount === 1) {
        setDotCount(() => {
          return dotCount + 1;
        });

        setDisplay(() => {
          return (display + "0" + opr);
        });
      } else {
        setDotCount(() => {
          return dotCount + 1;
        });

        setDisplay(() => {
          return display + opr;
        });
      }
    }
    

    console.log("After dot click dot count = " + dotCount);
  }

  function evaluateExpression() {
    console.log("Evaluate expression clicked");
  }

  return (
    <div className="calculator">
      <div className="display" id="display">
        {display}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            allClear();
          }}
        >
          AC
        </button>
        <button
          onClick={() => {
            clearEntry();
          }}
        >
          CE
        </button>
        <button
          onClick={() => {
            clickedOperator("%");
          }}
        >
          %
        </button>
        <button
          className="operator"
          onClick={() => {
            clickedOperator("/");
          }}
        >
          /
        </button>
        <button
          onClick={() => {
            clickedNumber("7");
          }}
        >
          7
        </button>
        <button
          onClick={() => {
            clickedNumber("8");
          }}
        >
          {" "}
          8
        </button>
        <button
          onClick={() => {
            clickedNumber("9");
          }}
        >
          9
        </button>
        <button
          className="operator"
          onClick={() => {
            clickedOperator("*");
          }}
        >
          *
        </button>
        <button
          onClick={() => {
            clickedNumber("4");
          }}
        >
          4
        </button>
        <button
          onClick={() => {
            clickedNumber("5");
          }}
        >
          5
        </button>
        <button
          onClick={() => {
            clickedNumber("6");
          }}
        >
          6
        </button>
        <button
          className="operator"
          onClick={() => {
            clickedOperator("-");
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            clickedNumber("1");
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            clickedNumber("2");
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            clickedNumber("3");
          }}
        >
          3
        </button>
        <button
          className="operator"
          onClick={() => {
            clickedOperator("+");
          }}
        >
          +
        </button>

        <button
          style={{ gridColumn: "span 2" }}
          onClick={() => {
            clickedNumber("0");
          }}
        >
          0
        </button>
        <button
          onClick={() => {
            clickedDot(".");
          }}
        >
          .
        </button>
        <button className="operator" onClick={evaluateExpression}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
