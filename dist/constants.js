"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUTRITION_REGEX = exports.NUTRITION_OPTIONS = void 0;
exports.NUTRITION_OPTIONS = [
    "Total Fat",
    "Saturated Fat",
    "Trans Fat",
    "Cholesterol",
    "Sodium",
    "Total Carbohydrate",
    "Dietary Fiber",
    "Sugars",
    "Protein",
];
exports.NUTRITION_REGEX = new RegExp("(" + exports.NUTRITION_OPTIONS.join("|") + ")");
