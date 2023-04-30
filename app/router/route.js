const express = require("express");
const contact = require("../controller/controller");

const router = express.Router();

router.route("/")   // khai báo đường dẫn
    .get(contact.findAll)
    .post(contact.create)
    .delete(contact.delete);

router.route("/favorite")  // đường dẫn để lấy danh sách yêu thích
    .get(contact.findAllFavorite);

router.route("/:id")
    .get(contact.findOne)
    .put(contact.update)
    .delete(contact.delete);

module.exports = router;   // export router này ra bên ngoài module để sử dụng trong ứng dụng chính