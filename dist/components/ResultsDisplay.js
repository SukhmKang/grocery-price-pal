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
var react_1 = __importDefault(require("react"));
var ResultsDisplay = /** @class */ (function (_super) {
    __extends(ResultsDisplay, _super);
    function ResultsDisplay(props) {
        return _super.call(this, props) || this;
    }
    ResultsDisplay.prototype.render = function () {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "This is ResultsDisplay" }) }));
    };
    return ResultsDisplay;
}(react_1.default.Component));
exports.default = ResultsDisplay;
