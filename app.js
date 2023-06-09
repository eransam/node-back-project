"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors = require("cors");
var express_1 = __importDefault(require("express"));
// import dal from './04-dal/dal'
// dal.connect()
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var errors_handler_1 = __importDefault(require("./02-middleware/errors-handler"));
var log_requests_1 = __importDefault(require("./02-middleware/log-requests"));
var sanitize_1 = __importDefault(require("./02-middleware/sanitize"));
var products_controller_1 = __importDefault(require("./06-controllers/products-controller"));
var images_controller_1 = __importDefault(require("./06-controllers/images-controller"));
var cate_controller_1 = __importDefault(require("./06-controllers/cate-controller"));
var carts_controller_1 = __importDefault(require("./06-controllers/carts-controller"));
var cart_items_controller_1 = __importDefault(require("./06-controllers/cart-items-controller"));
var orders_controller_1 = __importDefault(require("./06-controllers/orders-controller"));
var auth_controller_1 = __importDefault(require("./06-controllers/auth-controller"));
var path_1 = __importDefault(require("path"));
var server = (0, express_1.default)();
server.use(cors()); // Use this after the variable declaration
if (process.env.NODE_ENV === "production") {
    server.use(express_1.default.static(path_1.default.join(__dirname, "../public/")));
    server.get("*", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, "../public", "index.html"));
    });
}
else {
    server.get("/", function (req, res) {
        res.send("API is running...");
    });
}
server.use("/api", (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 10,
    message: "Rate exceeded. Please try again soon",
}));
server.use(express_1.default.json());
server.use((0, express_fileupload_1.default)());
server.use(log_requests_1.default);
server.use(sanitize_1.default);
server.use("/api", products_controller_1.default);
server.use("/", images_controller_1.default);
server.use("/api", carts_controller_1.default);
server.use("/api", cart_items_controller_1.default);
server.use("/api", orders_controller_1.default);
server.use("/api", cate_controller_1.default);
server.use("/api/auth", auth_controller_1.default);
server.use(errors_handler_1.default);
var port = process.env.PORT || 8080;
server.listen(port, function () { return console.log("Listening on PORT ".concat(port, "...")); });
