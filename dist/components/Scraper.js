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
var react_loader_spinner_1 = require("react-loader-spinner");
function WalmartItemToString(w, index) {
    var _a;
    return (_a = w.title) !== null && _a !== void 0 ? _a : "Missing title";
}
var Scraper = /** @class */ (function (_super) {
    __extends(Scraper, _super);
    function Scraper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            spinner: true,
            displayText: "",
            itemsList: [],
            error: false
        };
        return _this;
    }
    Scraper.prototype.makeFetchList = function () {
        // fetch(`/fetch_item_lists/${this.props.queryListString}`, {
        //     method: "GET"
        // }).then(res => res.json()
        // ).then((res : WalmartItem[][]) => {
        //     this.setState({
        //     spinner: false,
        //     error: false,
        //     itemsList: res,
        //     displayText: res.map((r, index) => WalmartItemToString(r, index)).join(", ")
        //     });
        //     this.props.onFetchReady(res);
        //     console.log(res);
        // }).catch((e) => {
        //     console.log(e);
        //     this.setState({
        //         spinner: false,
        //         error: true,
        //         displayText: ""
        //     });
        // });
    };
    Scraper.prototype.componentDidMount = function () {
        if (this.props.queryListString) {
            this.makeFetchList();
        }
    };
    Scraper.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if ((prevProps.queryListString !== this.props.queryListString) && this.props.queryListString) {
            this.makeFetchList();
        }
    };
    Scraper.prototype.render = function () {
        if (this.state.spinner) {
            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_loader_spinner_1.FidgetSpinner, { backgroundColor: "#F4442E", ballColors: ['#000000', '#000000', '#000000'], height: 70, width: 70 }) }));
        }
        else if (this.state.error) {
            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: "https://upload.wikimedia.org/wikipedia/commons/0/06/Face-sad.svg" }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { children: "Request succeeded" }) }));
        }
        ;
    };
    return Scraper;
}(react_1.default.Component));
exports.default = Scraper;
