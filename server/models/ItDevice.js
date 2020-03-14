const mongoose  = require("mongoose")

const schema = new mongoose.Schema({
    device_number: { type: String },
    device_name: { type: String },
    // device_category: { type: mongoose.SchemaTypes.ObjectId, ref:'DeviceCategory' },
    device_categories: [{ type: mongoose.SchemaTypes.ObjectId, ref:'DeviceCategory' }],
    device_detail: { type: String },
    device_unit: { type: mongoose.SchemaTypes.ObjectId, ref:'DeviceUnit' },
    device_count: { type: Number },
    device_price: { type: Number },
    record_date: { type: Date, default: Date.now },
    depreciable_life: { type: String },
    device_user: { type: String },
    device_department: { type: String },
    device_location: { type: String },
    remark: { type: String },
    // scores:{
    //     difficult:{ type: Number },
    //     skills:{ type: Number },
    //     attack:{ type: Number },
    //     survive:{ type: Number },
    // },
    // skills:[{
    //     icon:{type: String},
    //     name:{type: String},
    //     description:{type: String},
    //     tips:{type: String},

    // }],
})

module.exports = mongoose.model('ItDevice', schema)