import React from "react";
import ReactDom from "react-dom";
import "./index.scss";
import {Test} from "../components";

ReactDom.render(<div><Test/><div className="page">这是React测试组件</div></div>, document.getElementById("root"));