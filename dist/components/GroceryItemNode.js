"use strict";
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
var Row_1 = __importDefault(require("react-bootstrap/Row"));
var Col_1 = __importDefault(require("react-bootstrap/Col"));
var react_bootstrap_icons_1 = require("react-bootstrap-icons");
require("../assets/scss/GroceryItemNode.scss");
var GroceryItemNode = /** @class */ (function () {
    function GroceryItemNode() {
    }
    GroceryItemNode.prototype.listItemFromItem = function (item, ind) {
        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(Row_1.default, { children: [(0, jsx_runtime_1.jsx)(Col_1.default, { children: (0, jsx_runtime_1.jsx)("img", { src: item.image }) }), (0, jsx_runtime_1.jsxs)(Col_1.default, { children: [(0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsxs)("h2", __assign({ className: 'cardheader' }, { children: ["Asparagus ", (0, jsx_runtime_1.jsx)(react_bootstrap_icons_1.Egg, {})] })) }), (0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)("h2", { children: item.title }) })] }), (0, jsx_runtime_1.jsx)(Col_1.default, { children: (0, jsx_runtime_1.jsx)(Row_1.default, { children: (0, jsx_runtime_1.jsx)("h2", { children: item.price }) }) })] }) }, "li-".concat(ind)));
    };
    return GroceryItemNode;
}());
exports.default = GroceryItemNode;
