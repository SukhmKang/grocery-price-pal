"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./App.css");
var Scraper_1 = __importDefault(require("./components/Scraper"));
var Container_1 = __importDefault(require("react-bootstrap/Container"));
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var Col_1 = __importDefault(require("react-bootstrap/Col"));
var InputGroup_1 = __importDefault(require("react-bootstrap/InputGroup"));
var Form_1 = __importDefault(require("react-bootstrap/Form"));
var react_bootstrap_1 = require("react-bootstrap");
;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.setState({
            inputText: ""
        });
        _this.sendInput = _this.sendInput.bind(_this);
        return _this;
    }
    App.prototype.sendInput = function () {
        var formText = document.getElementById("submit-form").value;
        this.setState({
            inputText: formText
        });
    };
    App.prototype.render = function () {
        var inputText = this.state.inputText;
        var sendInput = this.sendInput;
        return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "App" }, { children: (0, jsx_runtime_1.jsxs)(Container_1.default, __assign({ fluid: true }, { children: [(0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)(Col_1.default, { children: (0, jsx_runtime_1.jsxs)(InputGroup_1.default, __assign({ className: "mb-3" }, { children: [(0, jsx_runtime_1.jsx)(Form_1.default.Control, { "aria-label": "Example text with two button addons", id: "submit-form" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, __assign({ variant: "outline-secondary", id: "button-addon2", onClick: sendInput }, { children: "Button" }))] })) }) }), (0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)(Col_1.default, { children: (0, jsx_runtime_1.jsx)(Scraper_1.default, { queryString: inputText }) }) })] })) })));
    };
    return App;
}(react_1.Component));
exports.default = App;
