const apierror = require("../api-error");
const Mservice = require("../services/service");
const MongoDB = require("../utils/mongodb.util");

exports.create = (req, res) => {
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ meessage: "findAll handler" });
};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler" });
};

exports.update = (req, res) => {
    res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
    res.send({ message: "detele handler" });
};

exports.deleteAll = (req, res) => {
    res.send = ({ message: "deleteAll handler" });
};

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new apierror(400, "Name can not be empty"));
    }
    try {
        const mservice = new Mservice(MongoDB);
        const document = await mservice.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new apierror(500, "An error occurred while creating")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const mservice = new Mservice(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await mservice.findByName(name);
        } else {
            document = await mservice.find({});
        }
    } catch (error) {
        return next(
            new apierror(500, "An error occurred while retrieving")
        );
    }
    return res.send(document);
};

exports.findOne = async (req, res, next) => {
    try {
        const mservice = new Mservice(MongoDB.client);
        const document = await mservice.fingById(req.params.id);
        if (!document) {
            return next(new apierror(404, "not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new apierror(500, `Error retrieving`)
        );
    }
}

exports.update = async () => {
    if (Object.keys(req.body) === 0) {
        return next(new apierror(400, "Data to update can not be empty"));
    }

    try {
        const mservice = new Mservice(MongoDB.client);
        const document = await mservice.update(req.params.id, req.body);
        if (!document) {
            return next(new apierror(404, "not found"));
        }
        return res.send({ message: "you were updated" });
    } catch (error) {
        return next(
            new apierror(500, `error updating`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const mservice = new Mservice(MongoDB.client);
        const document = await mservice.delete(req.params.id);
        if (!document) {
            return next(new apierror(400, "not found"));
        }
        return res.send({ message: "you were deleted" });
    } catch (error) {
        return next(
            new apierror(500, `you don't delete with id=${req.params.id}`)
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const mservice = new Mservice(MongoDB.client);
        const document = await mservice.findAllFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new apierror(500, "An error occor while retrieving favorite")
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const mservice = new Mservice(MongoDB.client);
        const deletecount = await mservice.deleteAll();
        return res.send({
            message: `${deletecount} you were deleted`,
        });
    } catch (error) {
        return next(
            new apierror(500, "An error occurred while removing all")
        );
    }
};