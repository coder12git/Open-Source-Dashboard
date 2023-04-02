


  
  
  
  
  <a id="about"> </a>

# Open Source Projects Dashboard 🌟




This project is submitted for [MLH - OpenHacks 2023 Hackathon](https://openhacks-17975.devpost.com/)



- Devpost Link of project - [Open Source Projects Dashboard](https://devpost.com/software/open-source-projects-dashboard)



- [Project Demo](https://youtu.be/MtL7ERfRdGw)






![open-0](https://user-images.githubusercontent.com/108334168/229336274-4c4ed53e-ad2d-4730-af61-b5b8a3068971.png)






A web app that displays the status of an **open-source project**, that can help project maintainers and contributors stay informed about the project's progress and identify areas where they can make improvements.





## Technology Stack Used:
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>


- EJS: For webpage templating
- Github API - To retrieve data about the project

## What it does?

1. Upon visiting our web app the user is presented with a home Page where they need to provide the Github username and the repo name of the open source project.

2. Once the user click on Submit button, they will be render to the dashboard page where they can see the following information about that open source project -
- Project Description
- Project URL
- Language Used
- Total Number of Stars and Forks
- Released Version
- Open Issues
- Closed Issues
- Open Pull Requests
- Contributors Leaderboard 
- Commits



## How we built it ⚙️

We have used the Github API to retrieve data about the project, such as the number of open issues, the number of contributions, and a summary of recent activity and 
once we have retrieved the data on backend then we have display it in a simple, easy-to-read format on frontend.


## Installation/Execution ✅

1. Clone the repository
2. Navigate into the repo and run

   ```
   npm install
   ```

3. Create a file named `config.env` in the root directory of the project
4. Copy contents of `config.copy.env` to `config.env` and replace all the environment variables
5. To start the server run
   ```
   npm start
   ```

## Challenges we ran into 💻
1. Fetching and Installing Dependencies 
2. Fixing Backend Errors

## Accomplishments that we're proud of 🏆

We were able to complete the idea behind the challenge and create a hack that can help both project maintainers and contributors to stay inform about the project's progress and identify areas where they can make improvements. With the right data and a user-friendly interface, our app can become a valuable tool for the open source community.


## What's next for Open Source Projects Dashboard?

Building a complete full-stack web application and helping the user to experience the best out of it.



## Show your support

Please ⭐️ this repository if this project helped you!



