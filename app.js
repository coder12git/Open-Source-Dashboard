const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const express = require('express');



const app = express();

const owner = 'pallets';
const repo = 'flask';
const accessToken = process.env.YOUR_ACCESS_TOKEN;

app.get('/', async (req, res) => {

  const { default: fetch } = await import('node-fetch');
  
  // Retrieve summary of the project's and techstacks used
  const projectSummmary = await fetch(`https://api.github.com/repos/${owner}/${repo}`,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  const data =  await projectSummmary.json();
  const projectName = data.name;
  const projectDescription = data.description;
  const projectURL = data.homepage;
  const language = data.language;
  const forks = data.forks_count;
  const stars = data.stargazers_count;

  // Retrieve data about the project's issues
  const issuesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const issuesData = await issuesResponse.json();
  const openIssues = issuesData.filter(issue => issue.state === 'open');
  const closedIssues = issuesData.filter(issue => issue.state === 'closed');

  //Retrieve data about the project's pull requests
  const pullRequests = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open`,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const pullData = await pullRequests.json();

  
  // Retrieve data about the project's contributions
  const contributionsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const contributionsData = await contributionsResponse.json();

  //Retrieve data about the total commits
  const commits = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const commitsData = await commits.json();

  // Retrieve data about the released date nad version
  const releaseVersionAndDate = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`,{
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const releaseData = await releaseVersionAndDate.json();
  const version = releaseData.tag_name;
  const date = releaseData.published_at;


  // Send the data to the client
  res.send(`
    <h1>Project Status</h1>
    <ul>
      <li>${projectName}</li>
      <li>${projectDescription}</li>
      <li>${projectURL}</li>
      <li>${language}</li>
      <li>Stars : ${stars} and forks : ${forks}</li>
      <li>Open issues: ${openIssues.map(issue =>{
        return issue.title;
      })}</li>
      <li>Closed issues: ${closedIssues.map(issue => {
        return issue.title;
      })}</li>
      <h1>Open Pull Requests</h1>
      <li>${pullData.map(pull =>{
        return pull.title
      })}</li>
      <li>${contributionsData.sort((a,b) => b.total-a.total).map(contributor => {
        return (
          `
          <p>${contributor.author.login} ${contributor.total}</p>
          `
        );
      })}</li>
      <li>${commitsData.map(commit =>{
        return `<p>${commit.commit.message}</p>`
      })}</li>
      <li>Released version: ${version} Date: ${date}</li>
    </ul>
  `);
});



module.exports.main = app;