const PositionModel = require("../models/position_model");
const position = new PositionModel();
module.exports = {
    findAllPositions: async (req, res) => {
        try {
            const results = await position.findAll();
            return res.json({
                status: 200,
                message: results
            });
        } catch (error) {
           return res.json({
                status: 500,
                message: error,
            });
        }
    },
    newPosition: async (req, res) => {
        const {name} = req.body;
        try {
            const results = await position.insert(name);
            return res.json({
                status: 200,
                message: "New Position",
                id: results
            });
        } catch (error) {
           return res.json({
                status: 500,
                message: error,
            });
        }
    }
}