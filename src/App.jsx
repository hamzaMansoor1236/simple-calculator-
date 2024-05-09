import "./App.css";

function App() {
  return (
    <div className="calculator">
      <div className="display" id="display">
        0
      </div>
      <div className="buttons">
        <button>C</button>
        <button>%</button>
        <button className="operator">/</button>
        <button className="operator">*</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="operator">-</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button className="operator">+</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button className="operator">=</button>

        {/* zero */}
        <button style={{ gridColumn: "span 2" }}>0</button>

        <button>.</button>
      </div>
    </div>
  );
}

export default App;
