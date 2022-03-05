const mongoose = require("mongoose");
const PerSonModel = require("./personModel");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CompanyModel = mongoose.model("Company", CompanySchema);

module.exports = CompanyModel;
