"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModel = void 0;
var mongoose_1 = require("mongoose");
//שכמת ולידציה
var CredentialsSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
        required: [true, "Missing id"],
        minlength: [2, "id too short"],
        maxlength: [100, "id too long"],
        //מוחק רווחים לא רצויים וכאלה
        trim: true,
        versionKey: false,
    },
});
//cart-item-model הסבר ב
exports.CredentialsModel = (0, mongoose_1.model)("CredentialsModel", CredentialsSchema, "users");
