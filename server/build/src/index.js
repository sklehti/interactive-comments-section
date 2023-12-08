"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databaseRoutes_1 = __importDefault(require("./routes/databaseRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("./build"));
// const PORT = 3001;
const PORT = process.env.PORT || 3001;
// get data from database
app.use("/api/database", databaseRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on: port ${PORT}`);
});
