"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
var mongoose_1 = require("mongoose");
var cart_model_1 = require("./cart-model");
var product_model_1 = require("./product-model");
//כאן אנו יוצרים ולידציות למודל זה 
var CartItemSchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "Missing quantity"],
        min: [0, "Quantity can't be negative"],
        max: [100, "Quantity can't exceed 100 items"]
    },
    total: {
        type: Number,
        min: [0, "Total can't be negative"],
    },
    //כאן אנו שוב מעדכנים ששדות אלה הם ממודל אחר
    productId: mongoose_1.Schema.Types.ObjectId,
    cartId: mongoose_1.Schema.Types.ObjectId
}, {
    //כאן אנו רושמים פקודה אשר מאשרת להכניס לתוך המודל הזה שדות ממודלים
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});
//Virtual Fields: 
//אשר אנו רוצים לקשר שדות שלו במודל הנוכחי ProductModel כך אנו מצביעים על מודל אחר 
CartItemSchema.virtual('product', {
    ref: product_model_1.ProductModel,
    //כאן אנו מבציעים על השדה שהזנו במודל הנוכחי
    localField: 'productId',
    //(ProductModel) וכאן אנו קובעים שערכו יהיה ערך השדה הזה של המודל המקושר 
    //_id יהיה הערך של השדה  productId וכך ערכו של השדה 
    foreignField: '_id',
    //גורמת למידע להגיע כאובייקט ולא כמערך
    justOne: true
});
//Virtual Fields:
//כנ''ל 
CartItemSchema.virtual('cart', {
    ref: cart_model_1.CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true
});
//כך אנו מייצאים את המודל הזה החוצה
//CartItemModel = שם המודל 
//ICartItemModel = האינטרפייס של המודל שבתוכו יש את כל השדות
//CartItemSchema = הולידציה של שדות המודל
//items = לאיזה קולקשיין בדאטה בייס הוא מקושר
exports.CartItemModel = (0, mongoose_1.model)('CartItemModel', CartItemSchema, 'items');
