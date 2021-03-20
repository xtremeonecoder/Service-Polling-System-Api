# Service Polling System - RESTfull API

As a part of scaling the number of services running within a modern tech companies, people need a way to make sure that all the services are running smoothly. This is a simple service polling system api that enables web service status checking automatically, and periodically does a HTTP GET operation to each in the background and saves the response ("OK" or "FAIL"). Apart from the polling logic, the API also provides all the necessary endpoints for getting services visualised and easily managed all the services together with their status as well as status modification date and time.

A simple RESTful API for managing different web services smoothly in large-scale tech companies. The application is developed on the top of Node.js environment using Express.js Framework and other essential NPM Packages, such as - Lodash, @Hapi/Joi, Mongoose, and so forth. The application uses Node-Fetch package for fetching service response from the external URLs.

## Technologies Used:

- Frontend: React Application: [**_Repo_**](https://github.com/xtremeonecoder/Service-Polling-System-App)
- Backend: Object Oriented Javascript
- Backend: Express.js Framework
- Backend: Javascript Object Notation (JSON)
- Backend: Node Fetch (HTTP Fetch Client)
- Backend: Node Cron (Scheduler)
- Backend: MongoDB
- Backend: Mongoose Framework

## Why Used These Technologies:

- For simplicity.
- For better performance.
- To able the open source resources and make use of them.
- To maintain flexibility and scalability of the application.

## Application Development and Testing Platform:

- Operating System: Windows
- Application Environment: Node.js (6.14.11 and 7.6.3)
- Tested on Local Development Server
- Compiling Javascript Codes: Babel

## Application Features:

1. A set of comprehensive **_CRUD_** (Create, Retrieve, Update and Delete) API Endpoints for **_Web Services Management_**.

   - Get **_All Services_** api endpoint.
   - Get **_Users Services_** api endpoint.
   - Get **_Specific Service_** api endpoint.
   - Create new **_Web Service_** api endpoint.
   - Update existing **_Web Service_** api endpoint.
   - Delete existing **_Web Service_** api endpoint.

2. Added services and their polling status will be stored into the database, therefore when the server is restarted all the data will be kept.
3. An automated job/task will be running in the server background and polling all the services.
4. Default period for **_Service Poller_** is set to 30 seconds. You can change the period between 1 to 60 seconds using frontend **_Settings Panel_**.
5. You can **_Start_** or **_Stop_** the **_Service Poller_** any time using frontend **_Settings Panel_** (0 for stop, and 1 for start).
6. The background automatic job/task saves the polling status of the services into the database along with the date and time.
7. The background automatic job/task can be controlled from the frontend application using **_Settings Panel_**.
8. A set of comprehensive **_Settings API Endpoints_** (Create, Retrieve and Update) for **_Service Polling Task Scheduler_**.

   - Get **_All Settings_** api endpoint.
   - Get **_Specific Settings_** api endpoint.
   - Automatically creates necessary **_Settings_** on installation.
   - Update existing **_Settings_** api endpoint.

9. The results from the poller are not automatically shown to the user, rather user has to reload the frontend **_Services Page_** to see results.
10. The application provides informative and nice looking animations on add/remove services enabling the popup notification and optimistic approach.
11. The application protects the poller from misbehaving services (i.e. answering really slowly, expected errors, unexpected errors, bad requests).
12. Service URL Validation ("sdgf" is probably not a valid service).
13. The application supports multi users functionalities. Users can register using their email.

    - Users have to register with the application before using it.
    - User cannot access to the application until they login.
    - Users can only see their own services.
    - Users cannot see the services added by another users.

## How to install the application:

1. Install node.js on your machine.
2. Install MongoDB Driver.
3. Clone the repository, then keep the folder somewhere in you machine.
4. Rename the directory as something like - **_service-poller-api_**.
5. CD to the directory of Backend API **_service-poller-api_**.
6. Or open **_terminal_** or **_command-line_** window from the project root directory.
7. Install the **_service-poller-api_** applications using `npm install`.
8. The installation process may take several minutes, once installation finished.
9. Run **_service-poller-api_** using **_terminal_** or **_command-line_** window:

   - Using `npm start` or `node index.js`.
   - Using nodemon `nodemon index.js` (you have to install nodemon npm package).

10. CD to the directory of Frontend Application, for instance - **_service-poller-frontend_**.
11. Or open **_terminal_** or **_command-line_** window from the project root directory.
12. Run **_service-poller-frontend_** using **_terminal_** or **_command-line_** window (command: `npm start`).
13. **_http://localhost/4000_** is the url for exploring the backend api.
14. **_http://localhost/3000_** is the url for exploring the frontend application.
