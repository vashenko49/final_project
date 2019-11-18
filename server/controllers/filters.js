const Filter = require("../models/Filter");
const queryCreator = require("../common/queryCreator");

const _ = require("lodash");

const { validationResult } = require("express-validator");


exports.createFilter = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const initialQuery = _.cloneDeep(req.body);
    const newFilter = new Filter(queryCreator(initialQuery));

    try {
        let filter = await Filter.findOne(newFilter);

        if (filter) {
            return res.status(400).json({
                message: `Filter ${filter.title} already exist`
            })
        }
        filter = new Filter(newFilter);

        await filter.save();
        res.status(200).json(filter);

    } catch (err) {
        res.status(500).json({
            message: 'Server Error!'
        })
    }
};

exports.getAllFilters = async (req, res) => {
    try {
        const filters = await Filter.find().sort({ data: -1 });

        res.status(200).json(filters);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
};
exports.updateFilter = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let filter = await Filter.findOne({ _id: req.params.id });

        if (!filter) {
            return res.status(400).json({
                message: `Filter with id ${req.params.id} is not found`
            })
        }

        const initialQuery = _.cloneDeep(req.body);
        const updatedFilter = queryCreator(initialQuery);

        filter = await Filter.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedFilter },
            { new: true }
        );

        res.status(200).json(filter);

    } catch (err) {
        res.status(500).json({
            message: `Error happened on server: ${err}`
        })
    }
};

exports.deleteFilter = async (req, res) => {
    try {
        await Filter.findOneAndRemove({ _id: req.params.id }); //don`t know about params.id

        res.status(200).json({ msg: 'Filter deleted' })
    } catch (err) {
        res.status(500).json({
            message: `Error happened on server: "${err}" `
        })
    }
};

