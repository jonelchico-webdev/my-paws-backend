const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const PetType = mongoose.model("petTypes");
const keys = require("../config/keys");

// *********** GET BREEDS *********** //

module.exports.breeds = async (req, res) => {

    console.log(req)
};


