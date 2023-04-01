const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const accessToken = process.env.YOUR_ACCESS_TOKEN;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.post("/dashboard", async (req, res) => {
  const owner = req.body.userName;
  const repo = req.body.repoName;

  try {
    const { default: fetch } = await import("node-fetch");

    // Retrieve summary of the project's and techstacks used
    const projectSummmary = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await projectSummmary.json();
    const projectName = data.name;
    const projectDescription = data.description;
    const projectURL = data.homepage;
    const language = data.language;
    const forks = data.forks_count;
    const stars = data.stargazers_count;

    // Retrieve data about the project's issues
    const issuesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const issuesData = await issuesResponse.json();
    const openIssues = issuesData.filter((issue) => issue.state === "open");
    const closedIssues = issuesData.filter((issue) => issue.state === "closed");

    //Retrieve data about the project's pull requests
    const pullRequests = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=open`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const pullData = await pullRequests.json();

    // Retrieve data about the project's contributions
    const contributionsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/stats/contributors`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const contributionsData = await contributionsResponse.json();

    //Retrieve data about the total commits
    const commits = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const commitsData = await commits.json();

    // Retrieve data about the released date nad version
    const releaseVersionAndDate = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const releaseData = await releaseVersionAndDate.json();
    const version = releaseData.tag_name;
    const date = releaseData.published_at;

    // Send the data to the client

    res.render("dashboard", {
      projectName: projectName,
      projectDescription: projectDescription,
      projectURL: projectURL,
      language: language,
      stars: stars,
      forks: forks,
      openIssues: openIssues,
      closedIssues: closedIssues,
      pullData: pullData,
      contributionsData: contributionsData,
      commitsData: commitsData,
      version: version,
      date: date,
    });
  } catch (error) {
    console.log(error);
    res.send("Error occurred");
  }
});

module.exports.main = app;
