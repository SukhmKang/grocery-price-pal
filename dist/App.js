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
var ItemGridList_1 = __importDefault(require("./components/ItemGridList"));
var ItemGrid_1 = __importDefault(require("./components/ItemGrid"));
var ShoppingCart_1 = __importDefault(require("./components/ShoppingCart"));
var GenerateButton_1 = __importDefault(require("./components/GenerateButton"));
var ResultsDisplay_1 = __importDefault(require("./components/ResultsDisplay"));
;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            gridItemList: ItemGridList_1.default,
            showCart: false,
            showResults: false,
            walmartItems: []
        };
        _this.changeSelected = _this.changeSelected.bind(_this);
        _this.setShowCart = _this.setShowCart.bind(_this);
        _this.setShowResults = _this.setShowResults.bind(_this);
        _this.setWalmartItems = _this.setWalmartItems.bind(_this);
        return _this;
    }
    App.prototype.changeSelected = function (name, selected) {
        var gridItemList = this.state.gridItemList;
        var newList = gridItemList.map(function (item) {
            if (item.name == name) {
                return ({
                    name: item.name,
                    image_src: item.image_src,
                    selected: selected
                });
            }
            else {
                return item;
            }
        });
        this.setState({
            gridItemList: newList
        });
    };
    App.prototype.setShowCart = function (show) {
        this.setState({
            showCart: show
        });
    };
    App.prototype.setShowResults = function (show) {
        this.setState({
            showResults: show
        });
    };
    App.prototype.setWalmartItems = function (items) {
        this.setState({
            walmartItems: items
        });
    };
    App.prototype.render = function () {
        var _a = this, changeSelected = _a.changeSelected, setShowCart = _a.setShowCart, setShowResults = _a.setShowResults, setWalmartItems = _a.setWalmartItems;
        var _b = this.state, gridItemList = _b.gridItemList, showCart = _b.showCart, showResults = _b.showResults, walmartItems = _b.walmartItems;
        return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Welcome to Grocery Price Pal!" }), !showResults &&
                    (0, jsx_runtime_1.jsx)(ShoppingCart_1.default, { gridItemList: gridItemList, changeSelected: changeSelected, showCart: showCart, setShowCart: setShowCart }), !showResults &&
                    (0, jsx_runtime_1.jsx)(GenerateButton_1.default, { gridItemList: gridItemList, setShowResults: setShowResults, setWalmartItems: setWalmartItems }), !showResults &&
                    (0, jsx_runtime_1.jsx)(ItemGrid_1.default, { gridItemList: gridItemList, changeSelected: changeSelected }), showResults &&
                    (0, jsx_runtime_1.jsx)(ResultsDisplay_1.default, { setShowResults: setShowResults, walmartItems: walmartItems })] })));
    };
    return App;
}(react_1.Component));
exports.default = App;
