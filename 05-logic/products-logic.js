"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_model_1 = require("../03-models/category-model");
var error_model_1 = __importDefault(require("../03-models/error-model"));
var product_model_1 = require("../03-models/product-model");
var uuid_1 = require("uuid");
var path_1 = __importDefault(require("path"));
var safe_delete_1 = __importDefault(require("../01-utils/safe-delete"));
//פונ אשר מחזירה את כל האובייקטים הנמצאים תחת הקולקשיין המבוקש ובגלל שבאובייקטים אלו
//.populate יש גם פרופרטי שמקבלים ערך ממודלים אחרים אנו נשתנש בפונ ה
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, product_model_1.ProductModel.find().populate("category").exec()];
        });
    });
}
//ProductModel פונ' אשר סופרת את כמות האובייקטים בקולקשיין הנמצא תחת
//.count בעזרת הפונ המובנת
function countProducts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, product_model_1.ProductModel.find().count().exec()];
        });
    });
}
//פונ אשר מחזירה תמונה של מוצר ישן כדי לעדכן את המוצר החדש עם אותה תמונה
function getOneProduct(_id) {
    return __awaiter(this, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, product_model_1.ProductModel.findById(_id).populate("category").exec()];
                case 1:
                    product = _a.sent();
                    // במידה ואין אובייקט עם ערך איידי כזה אנו נחזיר שגיאה
                    if (!product)
                        throw new error_model_1.default(404, "Resource with _id ".concat(_id, " not found."));
                    // במידה ויש אובייקט כזה אנו נחזיר אותו
                    return [2 /*return*/, product];
            }
        });
    });
}
//CategoryModel פונ אשר מחזירה את כל האובייקטים הנמצאים בקולקשין שבתוך המודל
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, category_model_1.CategoryModel.find().exec()];
        });
    });
}
function deleteProduct(productName) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // כך אנו נישמור את האובייקט שלנו בדאטה בייס
                    console.log("productName in deleteProduct: ", productName);
                    console.log("productName type of: ", typeof productName);
                    return [4 /*yield*/, product_model_1.ProductModel.deleteOne({ name: productName })];
                case 1:
                    result = _a.sent();
                    console.log("the result: ", result);
                    return [2 /*return*/, result];
            }
        });
    });
}
//פונ אשר מוסיפה מוצר
//מקבלים אובייקט במודל "פרודקט" ועושים עליו ולידציה
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var extension, ImageName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //   const errors = product.validateSync();
                    //   if (errors) throw new ErrorModel(400, errors.message);
                    console.log("product in the server: ", product);
                    extension = product.image.name.substring(product.image.name.lastIndexOf("."));
                    ImageName = product.image.name;
                    // Handle Images
                    //image במידה וקיים ערך תחת הפרופרטי
                    //   if (product.image) {
                    //extension אנו נכניס את ערך הסיומת של קובץ התמונה שהוכנס לתוך המשתנה
                    // const extension = product.image.name.substring(
                    //   product.image.name.lastIndexOf(".")
                    // );
                    //extension ונוסיף לה את הסיומת שתחת המשתנה uuidניקח את שם התמונה שהוכנס וניתן לה שם ייחודי בעזרת ה
                    //imageName וכך גם ניצור ערך תחת הפרופרטי
                    // product.imageName = uuid() + extension;
                    //שאצלנו בפרוייקט imagesלאחר מכן ניקח את קובץ התמונה ונעביר אותה לתיקיית ה
                    return [4 /*yield*/, product.image.mv(path_1.default.join(__dirname, "..", "upload", "images", ImageName))];
                case 1:
                    // Handle Images
                    //image במידה וקיים ערך תחת הפרופרטי
                    //   if (product.image) {
                    //extension אנו נכניס את ערך הסיומת של קובץ התמונה שהוכנס לתוך המשתנה
                    // const extension = product.image.name.substring(
                    //   product.image.name.lastIndexOf(".")
                    // );
                    //extension ונוסיף לה את הסיומת שתחת המשתנה uuidניקח את שם התמונה שהוכנס וניתן לה שם ייחודי בעזרת ה
                    //imageName וכך גם ניצור ערך תחת הפרופרטי
                    // product.imageName = uuid() + extension;
                    //שאצלנו בפרוייקט imagesלאחר מכן ניקח את קובץ התמונה ונעביר אותה לתיקיית ה
                    _a.sent();
                    //Do not save image in Mongo:
                    // לאחר שהעברנו את התמונה לתיקייה בפרוייקט שלנו אנו נמחק אותה כדי שלא תתפוס מקום
                    // בדאטה בייס שלנו
                    // product.image = undefined;
                    //   }
                    // כך אנו נישמור את האובייקט שלנו בדאטה בייס
                    //   return product.save();
                    return [2 /*return*/, ""];
            }
        });
    });
}
//Update product
// פונ' שמקבלת אובייקט מסוג פרודקט-מודל
function updateProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbProduct, extension, updatedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = product.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    return [4 /*yield*/, getOneProduct(product._id)];
                case 1:
                    dbProduct = _a.sent();
                    // נזין את שם התמונה הקיימת של המוצר בתוך האובייקט שאנו רוצים לעדכן במידה והיוזר לא רוצה לשנות את התמונה הקיימת
                    product.imageName = dbProduct.imageName;
                    if (!product.image) return [3 /*break*/, 3];
                    // אנו נימחק את התמונה הישנה
                    (0, safe_delete_1.default)(path_1.default.join(__dirname, "..", "upload", "images", product.imageName));
                    extension = product.image.name.substring(product.image.name.lastIndexOf("."));
                    // ניצור שם תמונה חדש עם הסיומת המקורית
                    product.imageName = (0, uuid_1.v4)() + extension;
                    // ואז נישלח את התמונוה החדשה לתיקייה בפרוייקט שלנו בעזרת הנתיב המדוייק
                    return [4 /*yield*/, product.image.mv(path_1.default.join(__dirname, "..", "upload", "images", product.imageName))];
                case 2:
                    // ואז נישלח את התמונוה החדשה לתיקייה בפרוייקט שלנו בעזרת הנתיב המדוייק
                    _a.sent();
                    //נימחק את קובץ התמונה כדי שלא יכנס לדאטה בייס עצמו
                    product.image = undefined;
                    _a.label = 3;
                case 3: return [4 /*yield*/, product_model_1.ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec()];
                case 4:
                    updatedProduct = _a.sent();
                    if (!updatedProduct)
                        throw new error_model_1.default(404, "Resource with _id ".concat(product._id, " not found."));
                    return [2 /*return*/, updatedProduct];
            }
        });
    });
}
exports.default = {
    getAllProducts: getAllProducts,
    countProducts: countProducts,
    getOneProduct: getOneProduct,
    getAllCategories: getAllCategories,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
};
