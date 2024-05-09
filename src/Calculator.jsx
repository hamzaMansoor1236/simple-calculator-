import { useState } from "react";
import "./calculator.css";
import axios from "axios";

function App() {


  const [display, setDisplay] = useState("0");
  const [operatorCount, setOperatorCount] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const [expression, setExpression] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function allClear() {
    setDisplay("0");
    setOperatorCount(0);
    setDotCount(0);
    setExpression("");
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
      } 
      else {
      
        if (expression === "") {
          setDisplay(display.slice(0, -1));
        } 
      }
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
    if (operatorCount === 0) {
      setOperatorCount(1);
      if (display[display.length - 1] === ".") {
        setDisplay(display + "0" + opr);
      } else {
        setDisplay(display + opr);
      }
      setDotCount(0);
    } else {
      setDisplay(display.slice(0, -1) + opr);
      setOperatorCount(1);
    }
  }

  function clickedDot(opr) {

    if (dotCount === 0) {
      if (operatorCount === 1) {
        setDotCount(() => {
          return dotCount + 1;
        });

        setDisplay(() => {
          return display + "0" + opr;
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
  }

  async function evaluateExpression() {

    const options = {
      method: "GET",
      url: "https://evaluate-expression.p.rapidapi.com/",
      params: {
        expression: display,
      },
      headers: {
        "X-RapidAPI-Key":import.meta.env.VITE_X_RapidAPI_Key,
        "X-RapidAPI-Host":import.meta.env.VITE_X_RapidAPI_Host,
      },
    };

    try {
      setIsLoading(true);
      setExpression(display + "=");
      const response = await axios.request(options);
      setIsLoading(false);
      setDisplay(response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setDisplay("Error");
    }
  }

  return (
    <div className="calculator">
      <div className="display" id="display">
        <p className="expression expression-text">{expression}</p>
        {isLoading ? <p className="loading">Loading...</p> : display}
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
