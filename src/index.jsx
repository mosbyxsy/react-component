import React from "react";
import ReactDom from "react-dom";
import "./index.scss";
import logo from "./hiynn-design.png"

function App() {
    return (<div>
        <img src={logo}/>
    </div>)
}

ReactDom.render(<div className="page">你还<App/></div>, document.getElementById("root"));