const app = require("./app"); // import module app
const config = require("./app/config"); //import module config
const MongoDB = require("./app/utils/mongodb.util");

async function startserver() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the Database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startserver();