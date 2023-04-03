"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("./user-model");
//יצירת ולידציות למודל
var CartSchema = new mongoose_1.Schema({
    userId: mongoose_1.Schema.Types.ObjectId,
    //false כאן אנו קובעים שהערך הדיפולטיבי של שדה זה הוא 
    isClosed: {
        type: Boolean,
        default: false
    }
}, {
    //versionKey: false, // Don't create __v field for versioning
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false,
    //מאפשר לקשר למודל זה שדות ממודלים אחרים
    toJSON: { virtuals: true },
    //id: false // Don't duplicate _id into id field
    //לא נקבל באופן אוטומטי עוד שדה של איידי
    id: false,
    //When you enable timestamps, Mongoose adds createdAt and updatedAt properties to your schema. By default,
    //createdAt and updatedAt are of type Date. When you update a document, Mongoose automatically increments updatedAt.
    timestamps: true
});
//Virtual Fields: 
//הקיים במודל הנוכחי יקבל את  userId ופה אנו נקבע שהשדה (user-model) user מקובץ ה UserModelמקשר את מודל ה
//במודל המקושר _id הערך של השדה 
CartSchema.virtual('user', {
    ref: user_model_1.UserModel,
    localField: 'userId',
    foreignField: '_id',
    //גורמת למידע להגיע כאובייקט ולא כמערך
    justOne: true
});
//cart-item-model הסבר ב 
exports.CartModel = (0, mongoose_1.model)('CartModel', CartSchema, 'carts');
