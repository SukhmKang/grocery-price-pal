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
var react_1 = __importDefault(require("react"));
var react_loader_spinner_1 = require("react-loader-spinner");
var GenerateButton = /** @class */ (function (_super) {
    __extends(GenerateButton, _super);
    function GenerateButton(props) {
        var _this = _super.call(this, props) || this;
        _this.makeFetchList = _this.makeFetchList.bind(_this);
        _this.state = {
            spinner: false,
            error: false
        };
        return _this;
    }
    GenerateButton.prototype.makeFetchList = function () {
        var _this = this;
        var _a = this.props, gridItemList = _a.gridItemList, setShowResults = _a.setShowResults, setWalmartItems = _a.setWalmartItems;
        var selectedItems = gridItemList.filter(function (item) { return item.selected == true; });
        var selectedString = selectedItems.map(function (item) { return item.name; }).join('_');
        console.log(selectedString);
        this.setState({
            spinner: true
        });
        fetch("/fetch_item_lists/".concat(selectedString), {
            method: "GET"
        }).then(function (res) { return res.json(); }).then(function (res) {
            _this.setState({
                spinner: false,
                error: false,
            });
            setWalmartItems(res);
            setShowResults(true);
            console.log(res);
        }).catch(function (e) {
            console.log(e);
            _this.setState({
                spinner: false,
                error: true,
            });
        });
    };
    GenerateButton.prototype.render = function () {
        var makeFetchList = this.makeFetchList;
        var _a = this.state, spinner = _a.spinner, error = _a.error;
        return ((0, jsx_runtime_1.jsxs)("div", { children: [!spinner && (0, jsx_runtime_1.jsx)("button", __assign({ onClick: makeFetchList }, { children: "Generate List" })), spinner && (0, jsx_runtime_1.jsx)(react_loader_spinner_1.FidgetSpinner, { backgroundColor: "#F4442E", ballColors: ['#000000', '#000000', '#000000'], height: 70, width: 70 }), error && (0, jsx_runtime_1.jsx)("img", { src: "https://upload.wikimedia.org/wikipedia/commons/0/06/Face-sad.svg" })] }));
    };
    return GenerateButton;
}(react_1.default.Component));
exports.default = GenerateButton;
