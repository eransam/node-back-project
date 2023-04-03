"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var category_model_1 = require("./category-model");
//סכמת ולידציה
var ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        //מוחק רווחים ושדות מיותרים
        trim: true,
        //פקודה זו גורמת לערך המוזן בשדה זה להיות ייחודי בדאטה בייס
        //זאת אומרת שלא יוכל להיות אובייקט אחר עם שם זהה לשם אובייקט שכבר קיים במערכת 
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    imageName: {
        type: String,
    },
    image: {
        type: Object,
    },
    categoryId: mongoose_1.Schema.Types.ObjectId
}, {
    //מייצר שדה גירסה בדאטה בייס
    versionKey: false,
    //cart-item-model הסבר ב 
    toJSON: { virtuals: true },
    //id: false // Don't duplicate _id into id field
    //לא נקבל באופן אוטומטי עוד שדה של איידי
    id: false
});
//cart-item-model הסבר ב 
ProductSchema.virtual('category', {
    ref: category_model_1.CategoryModel,
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true
});
//cart-item-model הסבר ב 
exports.ProductModel = (0, mongoose_1.model)('ProductModel', ProductSchema, 'products');
