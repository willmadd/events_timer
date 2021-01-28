import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";

function App() {
    return (
        <div className="container">
            <h1>Events Timer</h1>
            <Image />
        </div>
    );
}

export default App;

if (document.getElementById("events")) {
    ReactDOM.render(<App />, document.getElementById("events"));
}
