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
require("./ShoppingCart.css");
var ShoppingCart = /** @class */ (function (_super) {
    __extends(ShoppingCart, _super);
    function ShoppingCart(props) {
        return _super.call(this, props) || this;
    }
    ShoppingCart.prototype.render = function () {
        var _a = this.props, gridItemList = _a.gridItemList, changeSelected = _a.changeSelected, showCart = _a.showCart, setShowCart = _a.setShowCart;
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return setShowCart(true); } }, { children: "ShoppingCart" })), showCart && (0, jsx_runtime_1.jsx)("div", __assign({ className: "popup-cart" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "popup-box" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Your Shopping Cart" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "cart-list" }, { children: gridItemList.map(function (item, i) {
                                    if (item.selected) {
                                        return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "cart-item" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: item.name }), (0, jsx_runtime_1.jsx)("p", { children: item.image_src }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return changeSelected(item.name, false); } }, { children: "Remove" }))] }), i));
                                    }
                                }) })), (0, jsx_runtime_1.jsx)("button", __assign({ className: "close-button", onClick: function () { return setShowCart(false); } }, { children: "Close" }))] })) }))] }));
    };
    return ShoppingCart;
}(react_1.default.Component));
exports.default = ShoppingCart;
