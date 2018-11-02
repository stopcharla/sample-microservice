const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
    orderId: {
        type: String,
        unique: true
    },
    userId: {
        type: String,
        required:true
    },
    orderedFrom: {
        type: String,
        required:true
    },
    orderedItems: [String],
    amount: {
        type: Number,
        required: true
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    }

});

var ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;
