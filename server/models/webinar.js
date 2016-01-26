var mongoose = require('mongoose');

var WebinarSchema = new mongoose.Schema({
       title: {type: String},
       description: {type: String},
       speakerName: {type: String},
       speakerDetails: {type: String},
       date: {type: String},
       time: {type: String}
});

var Webinar = mongoose.model('Webinar', WebinarSchema);



module.exports = Webinar;
