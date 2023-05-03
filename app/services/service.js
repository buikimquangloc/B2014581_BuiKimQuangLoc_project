const { object, ObjectId } = require("mongodb");
const { deleteAll } = require("../controller/controller");

class Mservice {
    constructor(client) {
        this.Contact = client.db().collection("contact");
    }
    extractData(payload) {
        const moto = {
            name: payload.name,
            phienban: payload.phienban,
            gia: payload.gia,
            mausac: payload.mausac,
            dungtich: payload.dungtich
        };
        object.key(moto).forEach(
            (key) => moto[key] === undefined && delete moto[key]
        );
        return moto;
    }
    async create(payload) {
        const mote = this.extractData(payload);
        const result = await this.Contact.findOneAndUpdate(
            moto,
            { $set: { favorite: moto.favorite === true } },
            { returnDocument: "after", upset: true }
        );
        return result.value;
    }
    async find(filter) {
        const cusor = await this.Contact.find(filter);
        return await cusor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const uptade = this.extractData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletcount;
    }
}


module.exports = Mservice;