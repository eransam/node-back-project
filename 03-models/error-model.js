"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//כאן אנו מייצרים מודל לזריקת שגיאות
var ErrorModel = /** @class */ (function () {
    function ErrorModel(status, message) {
        this.status = status;
        this.message = message;
    }
    return ErrorModel;
}());
exports.default = ErrorModel;
