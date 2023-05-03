const { MongoClient } = require("mongodb"); //lấy module mongodb từ npm

class MongoDB {
    static connect = async (uri) => {
        if (this.client) return this.client;
        this.client = await MongoClient.connect(uri);
        return this.client;
    };
}
module.exports = MongoDB;