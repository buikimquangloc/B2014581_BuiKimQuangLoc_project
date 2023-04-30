// tạo API

const express = require("express");  //Yêu cầu express để sử dụng
const cors = require("cors"); // yêu cầu sử dụng cors

const contactrouter = require("./app/router/route");

const apierror = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());    //thay đổi các yêu cầu được gửi đến từ json sang object

app.get("/", (req, res) => {  //định nghĩa route chho GET
    res.json({ message: "Welcome to moto web!!" });
})

app.use("/api/contact", contactrouter);
app.use("/api/contact", contactrouter);

app.use((req, res, nnext) => {
    return next(new apierror(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    });
});

module.exports = app; // xuất mode ra ngoài và sử dụng file khác của node.js