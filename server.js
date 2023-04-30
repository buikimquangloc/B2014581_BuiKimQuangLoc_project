const app = require("./app"); // import module app
const config = require("./app/config"); //import module config


//chạy  server
const PORT = config.app.port; // lắng nghe kết nối tới server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});