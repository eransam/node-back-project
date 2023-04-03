"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var mongoose_1 = require("mongoose");
var cart_model_1 = require("./cart-model");
var user_model_1 = require("./user-model");
var city_enum_1 = __importDefault(require("./city-enum"));
//סכמת ולידציה
var OrderSchema = new mongoose_1.Schema({
    finalPrice: {
        type: Number,
        min: [0, "Final price can't be negative"],
        max: [100000, "Final price can't exceed 100,000"]
    },
    shipCity: {
        type: String,
        required: [true, "Missing ship city"],
        minlength: [2, "Ship city too short"],
        maxlength: [100, "Ship city too long"],
        //כאן אנו יוצרים שדה השסוג שלו הוא האינטרפייס שיצרנו באופן עצמי 
        //CityEnum שזה אומר ששדה זה יכול להכיל רק את הערכים הקבועים אשר נמצאים התוך ה 
        enum: city_enum_1.default
    },
    shipStreet: {
        type: String,
        required: [true, "Missing ship street"],
        minlength: [2, "Ship street too short"],
        maxlength: [100, "Ship street too long"],
        //מוחק רווחים ותווים מיותרים
        trim: true,
    },
    shipDate: {
        type: Date,
        required: [true, "Missing shipping date"],
    },
    creditCard: {
        type: Number,
        required: [true, "Missing credit card"],
        //מכילה תבנית רגקס אשר שדה זה יהיה חייב לעמוד באותה תבנית match הפקודה 
        match: [/^[0-9]{14,16}$/, "Credit card must be a minimum of 14 numbers and max 16 numbers"],
        trim: true
    },
    //כאן אנו נעדכן שוב ששדות אלו מגיעים ממודלים חיצוניים
    userId: mongoose_1.Schema.Types.ObjectId,
    cartId: mongoose_1.Schema.Types.ObjectId
}, {
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false,
    //פקודה אשר אנו חייבים לכתוב כדי לקשר למודל זה מודלים חיצוניים
    toJSON: { virtuals: true },
    //id: false // Don't duplicate _id into id field
    //לא נקבל באופן אוטומטי עוד שדה של איידי
    id: false,
    //Mongoose adds createdAt and updatedAt properties to your schema. By default,
    timestamps: true
});
//Virtual Fields: 
////cart-item-model הסבר ב 
OrderSchema.virtual('user', {
    ref: user_model_1.UserModel,
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});
////cart-item-model הסבר ב 
OrderSchema.virtual('cart', {
    ref: cart_model_1.CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true
});
////cart-item-model הסבר ב 
exports.OrderModel = (0, mongoose_1.model)('OrderModel', OrderSchema, 'orders');
