/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

const mongoose = require("mongoose");
require("mongoose-type-url");

// document schema
const schemaService = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: mongoose.SchemaTypes.Url,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// document model
const Service = mongoose.model("Service", schemaService);

// fetch all
async function getServices() {
  return await Service.find().sort({ updatedAt: -1 });
}

// fetch all services of user
async function getUserServices(userId) {
  return await Service.find({ userId }).sort({ updatedAt: -1 }).exec();
}

// fetch one
async function getService(id) {
  return await Service.findById(id);
}

// create
async function createService(data) {
  const service = new Service(data);
  return await service.save();
}

// update
async function updateService(id, data) {
  return await Service.findByIdAndUpdate(id, data, { new: true });
}

// delete
async function removeService(id) {
  return await Service.findByIdAndRemove(id);
}

module.exports = {
  getServices,
  getUserServices,
  getService,
  createService,
  updateService,
  removeService,
  Service,
  schemaService,
};
