// tạo API

const express = require("express");  //Yêu cầu express để sử dụng
const cors = require("cors"); // yêu cầu sử dụng cors

const app = express();

app.use(cors());
app.use(express.json());    //thay đổi các yêu cầu được gửi đến từ json sang object

app.get("/", (req, res) => {  //định nghĩa route chho GET
    res.json({ message: "Welcome to moto web!!" });
})

module.exports = app; // xuất mode ra ngoài và sử dụng file khác của node.js