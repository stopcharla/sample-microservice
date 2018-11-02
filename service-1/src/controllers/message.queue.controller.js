var Order = require('../models').orders;

var handleReceivedMessage = function handleReceivedMessage(data) {
    let orderDoc = JSON.parse(data.toString());
    let id = orderDoc["_id"];
    delete orderDoc["_id"];
    Order.update({_id:id},{$set: orderDoc}).exec().then((doc)=>{
        console.log("inference result saved to db:",doc);
    }).catch((err) => {
        console.log("error while saving inference result to db:",err);
    });
}

module.exports = {
    handleReceivedMessage: handleReceivedMessage
}