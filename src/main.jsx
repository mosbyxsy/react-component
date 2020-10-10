import React from "react";
import logo from "./hiynn-design.png";

export default function App() {
    return (<div>
        <div>
            <label htmlFor="demo">请输入</label>
            <input id="demo"/>
        </div>
        <img src={logo} width="50" height="50"/>
    </div>)
}