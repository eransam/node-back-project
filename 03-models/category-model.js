"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var mongoose_1 = require("mongoose");
//סכמת ולידציה
var CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    }
}, {
    //versionKey: false, // Don't create __v field for versioning
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false
});
// //cart-item-model הסבר ב 
exports.CategoryModel = (0, mongoose_1.model)('CategoryModel', CategorySchema, 'categories');
