"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Weather Object
 */
/* jshint node: true */

var mongoose = require('mongoose'),
    MetaDataObject;

var metaDataObjectSchema = new mongoose.Schema({
    location: {
    	state: String,
    	city: String
    }
}, {
    collection: 'meta_data'
});

MetaDataObject = mongoose.model('MetaDataObject', metaDataObjectSchema);
module.exports = MetaDataObject;
