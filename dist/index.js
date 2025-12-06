"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 8080;
// Very simple in-memory store to start
const store = new Map();
function generateCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < length; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}
// API to create short URL
app.post("/api/shorten", (req, res) => {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "url is required" });
    }
    const code = generateCode();
    store.set(code, url);
    const baseUrl = process.env.BASE_URL || "";
    res.json({ code, shortUrl: `${baseUrl}/${code}` });
});
// Redirect handler
app.get("/:code", (req, res) => {
    const code = req.params.code;
    const url = store.get(code);
    if (!url)
        return res.status(404).send("Not found");
    res.redirect(url);
});
app.get("/", (_req, res) => {
    res.send("URL shortener is running");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map