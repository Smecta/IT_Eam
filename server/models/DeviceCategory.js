const mongoose  = require("mongoose")

const schema = new mongoose.Schema({
    name: { type : String },
    // parent: { type: mongoose.SchemaTypes.ObjectId, ref:'DeviceCategory'},
})

module.exports = mongoose.model('DeviceCategory', schema)