const mongoose = require("mongoose");

const petTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    breeds: [
        {
            name: {
                type: String,
            }
        }
    ]
});

mongoose.model("petTypes", petTypeSchema);
