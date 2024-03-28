const PositionModel = require("../models/position_model");
const position = new PositionModel();
module.exports = {
    findAll: async (req, res) => {
        try {
            const positions = await position.findAll();
            return res.status(200).json(positions);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    insert: async (req, res) => {
        const {name} = req.body;
        try {
            const results = await position.insert(name);
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}