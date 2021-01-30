import React from "react";
import ReactDOM from "react-dom";
import Image from "./ImageThree";
import '../../sass/app.scss';
import Header from "./Header";
// import "../../sass/styles/globalstyles.scss";

function App() {
    return (
        <div className="container">
            <Header />
            <Image />
        </div>
    );
}

export default App;

if (document.getElementById("events")) {
    ReactDOM.render(<App />, document.getElementById("events"));
}
