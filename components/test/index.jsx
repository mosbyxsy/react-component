import React from "react";
import "./style/index.scss";

/*
在webpack4中，process.env.NODE_ENV会被自动设置为
production或者development,不用手动设置
console.log(process.env.NODE_ENV);
*/

let testMap = new Map();

console.log("foobar".includes("foo"));

export class ClassTest extends React.Component {
    render() {
        return (<div>
            测试
        </div>);
    }
}

export default function Test() {
    return (<div>
        <div>
            <label htmlFor="demo" className="page">请输入</label>
            <input id="demo"/>
        </div>
    </div>)
}