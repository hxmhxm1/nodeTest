const mongoose = require('mongoose')

const Schema = mongoose.Schema
const listSchema = new Schema({
  id: {type: String, required: true},
  title: {type: String, required: true},
  time: {type: String},
  type: {type: String},
  account: {type: String},
  remarks: {type: String}
})
const ListModel = mongoose.model('list', listSchema)

module.exports = ListModel