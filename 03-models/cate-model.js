"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CateModel = void 0;
var mongoose_1 = require("mongoose");
//סכמת ולידציה
var CateSchema = new mongoose_1.Schema({}, {
    //versionKey: false, // Don't create __v field for versioning
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false
});
exports.CateModel = (0, mongoose_1.model)('CateModel', CateSchema, 'cate');
