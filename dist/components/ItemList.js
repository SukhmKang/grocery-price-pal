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
var GroceryItemNode_1 = __importDefault(require("./GroceryItemNode"));
var Button_1 = __importDefault(require("react-bootstrap/Button"));
function getListPerm(items, ordering) {
    return ordering.map(function (n) { return items[n]; });
}
var ItemList = /** @class */ (function (_super) {
    __extends(ItemList, _super);
    function ItemList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ordering: (new Array).fill(0).map(function (x, ind) { return ind; }),
            fetchItemDetails: (function () {
                fetch("/fetch_detailed_items/".concat(encodeURIComponent(_this.props.items[0].urlLink)), {
                    method: "GET"
                }).then(function (res) { return res.json(); }).then(function (res) { return console.log(res); }).catch(function (e) { return console.log(e); });
            }).bind(_this)
        };
        return _this;
    }
    ItemList.prototype.render = function () {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Button_1.default, __assign({ onClick: this.state.fetchItemDetails }, { children: "See Detailed Info" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex-container" }, { children: (0, jsx_runtime_1.jsx)("ul", { children: this.props.items.map(function (item, ind) { return (new GroceryItemNode_1.default).listItemFromItem(item, ind); }) }) }))] }));
    };
    return ItemList;
}(react_1.default.Component));
exports.default = ItemList;
