/**
 * Service Polling System - RESTfull-API
 *
 * @category   Application_Backend
 * @package    service-polling-system
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

// include cron job package
const cron = require("node-cron");

// include express framework
const fetch = require("node-fetch");

// include models
const services = require("./../models/service");
const setting = require("./../../settings/models/setting");

function fetchWebContent(service) {
  fetch(service.url)
    .then(async (response) => {
      // update service status
      await services.updateService(service._id, {
        status: response.status === 200,
      });
    })
    .catch(async (error) => {
      // update service status
      await services.updateService(service._id, {
        status: false,
      });
    });
}

// initiate and define tasks scheduler
function initScheduler({ interval, taskContinue }) {
  const task = cron.schedule(`*/${interval} * * * * *`, () => {
    services
      .getServices()
      .then((result) => {
        if (result.length > 0) {
          result.map((service) => fetchWebContent(service));
        }
      })
      .catch((error) => {
        // nothing to do here
        //console.log(error.message);
      });
  });

  // start or stop
  taskContinue ? task.start() : task.stop();
}

module.exports = function startServicePoller() {
  // default settings
  let interval = 30;
  let taskContinue = true;

  // get settings or add them
  Promise.all([
    setting.getSettingByKey("scheduleTaskInterval"),
    setting.getSettingByKey("taskSchedulerStatus"),
  ])
    .then(async ([result1, result2]) => {
      // get interval settings from database
      if (result1 && result1.value) {
        interval = parseInt(result1.value);
      } else {
        // create a settings for task interval
        await setting.createSetting({
          key: "scheduleTaskInterval",
          value: `${interval}`,
        });
      }

      // get task status settings from database
      if (result2 && result2.value) {
        taskContinue = parseInt(result2.value) ? true : false;
      } else {
        // create a settings for task status
        await setting.createSetting({
          key: "taskSchedulerStatus",
          value: taskContinue ? "1" : "0",
        });
      }

      // return necessary data
      return { interval, taskContinue };
    })
    .then((data) => {
      // finally initiate the scheduler
      initScheduler(data);
    })
    .catch((error) => {
      console.log("error: ", error.message);
    });
};
