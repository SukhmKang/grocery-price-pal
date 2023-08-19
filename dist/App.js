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
;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            inputText: "",
            gridItemList: ItemGridList_1.default
        };
        _this.changeSelected = _this.changeSelected.bind(_this);
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
        console.log(this.state);
        // this.forceUpdate();
    };
    App.prototype.render = function () {
        var changeSelected = this.changeSelected;
        var _a = this.state, inputText = _a.inputText, gridItemList = _a.gridItemList;
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "This is App" }), (0, jsx_runtime_1.jsx)(ShoppingCart_1.default, { gridItemsList: gridItemList, changeSelected: changeSelected }), (0, jsx_runtime_1.jsx)(ItemGrid_1.default, { gridItemsList: gridItemList, changeSelected: changeSelected })] }));
    };
    return App;
}(react_1.Component));
exports.default = App;
