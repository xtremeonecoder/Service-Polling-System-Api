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
const schemaSettings = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

// document model
const Settings = mongoose.model("Settings", schemaSettings);

// fetch all
async function getSettings() {
  return await Settings.find().sort({ updatedAt: -1 });
}

// fetch settings by key
async function getSettingByKey(key) {
  return await Settings.findOne({ key }).exec();
}

// fetch one
async function getSetting(id) {
  return await Settings.findById(id);
}

// create
async function createSetting(data) {
  const setting = new Settings(data);
  return await setting.save();
}

// update
async function updateSetting(id, data) {
  return await Settings.findByIdAndUpdate(id, data, { new: true });
}

// delete
async function removeSetting(id) {
  return await Settings.findByIdAndRemove(id);
}

module.exports = {
  getSettings,
  getSettingByKey,
  getSetting,
  createSetting,
  updateSetting,
  removeSetting,
  Settings,
  schemaSettings,
};
