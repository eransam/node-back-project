"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var role_enum_1 = __importDefault(require("./role-enum"));
//סכמת ולידציה
var UserSchema = new mongoose_1.Schema({
    firstName: {
        //סוג השדה
        type: String,
        //שדה חובה
        required: [true, "Missing  first name"],
        minlength: [2, "First name too short"],
        maxlength: [100, "First name too long"],
        //מונע רווחים ותווים מיותרים
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [1, "Last name too short"],
        maxlength: [100, "Last name too long"],
        //מונע רווחים ותווים מיותרים
        trim: true,
    },
    userId: {
        type: Number,
        required: [true, "Missing username"],
        minlength: [2, "Username too short"],
        maxlength: [100, "Username too long"],
        //מונע רווחים ותווים מיותרים
        trim: true,
    },
    role: {
        type: Number,
        required: [true, "Missing role"],
        enum: role_enum_1.default,
        //RoleEnum.User כך שדה זה יקבל באופן דיפולטיבי את הערך הנמצא תחת
        //הוא הטייפ אותו יצרנו באופן ידני RoleEnum ה
        default: role_enum_1.default.User,
        min: [0, "Role can't be negative"],
        max: [1, "Role can't exceed 1"],
    },
}, {
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false,
});
//cart-item-model הסבר ב
exports.UserModel = (0, mongoose_1.model)("UserModel", UserSchema, "users");
