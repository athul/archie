---
title: Telegram Bot for  GitHub Actions
date: "2020-04-01"
description: Make a Telegram bot with Node.js and use it with GitHub Actions for sending notifications to you about the repo.
tldr: Making GitHub Actions with Js Code
toc: true
---
## Telegram
[Telegram](https://telegram.org/) is a cloud-based mobile and desktop messaging app with a focus on security and speed. It is free to use and extensively hackable. It also has a good bot support system. The API is also easy to implement and has many wrappers for building bots with the API.

## GitHub Actions
[GitHub Actions](https://github.com/features/actions) is a CI/CD runtime for your GitHub repository. You can run almost anything from scripts to docker containers. You can build, test and deploy your code with GitHub Actions. All these actions are called workflows and workflows differ in the job they're doing. These maybe test workflows, build ones or deployment ones. You can find all the actions on GitHub in the [marketplace](https://github.com/marketplace?type=actions)

## Building the Bot
### Prerequisites
- Basic JavaScript Knowledge
- Basic GitHub Knowledge
- Telegram Account
  
> There are templates for building actions. Here we're gonna start from scratch

### Environment Setup
- **Node**, You can download node from their [website](https://nodejs.org/en/download/)
- NPM comes with node, so you don't have to worry about it.
- Initialize the Project
```shell
$ git init ## initialize a new git repository for version management
---
$ npm init
```
- **dotenv**, Dotenv can be downloaded via
```shell
$ npm i dotenv
---
$ yarn add dotenv
```
- **node-telegram-bot-api**, node-telegram-bot-api is a simple wrapper for building telegram bots. You can download it via
```shell
$ npm i node-telegram-bot-api
---
$ yarn add node-telegram-bot-api
```
- **@zeit/ncc**, NCC is a Simple CLI for compiling a Node.js module into a single file, together with all its dependencies, GCC-style. It's a dev dependency and can be downloaded
```shell
yarn add --dev @zeit/ncc
---
npm i -D @zeit/ncc
```


#### Folder Structure
The `dist` folder will be automatically created. `action.yml` will be made

```
.
├── dist
│   └── index.js
├── index.js
├── action.yml
├── README.md
└── package.json

```
- `index.js` is the file we're defining the bot
- `action.yml` is the file we'll define the action and it's behaviours

## Making the Bot
We need to get an API bot token from telegram. For that Go to Telegram and Search for `Botfather`. It's a bot.
![](bfather.png)
Create a new bot with the `/newbot` command and get the API key. We'll need that, also talk to `jsondump` bot and get your chat id. The output may be like this, so
```json
{
  "update_id": 143943779,
  "message": {
    "message_id": 181575,
    "from": {
      "id": 123456 // this is what we need
      "is_bot": false,
      "first_name": "Tg Name",
      "username": "TG Username",
      "language_code": "en"
    },
    "chat": {
      "id": 123456,
      "first_name": "Tg Name",
      "username": "TG Username",
      "type": "private"
    },
    "date": 1584119424,
    "text": "message"
  }
}
```
This will be needed for further use and We need to add it to the repo secrets which can be found in the repo settings. Be careful to add it as `token` and `chat` like as shown below
![](scr.png)

### Writing the Action and Building the Bot
Fire up the terminal/cmd and make a new folder. Install the dependencies. Run the following command
```shell
$ touch index.js action.yml
```
Open your favourite text editor within the folder or with the file. We'll define the bot in `index.js`

```javaScript   
require("dotenv").config
const Bot = require('node-telegram-bot-api');
const {
    INPUT_STATUS: ipstatus,
    INPUT_TOKEN: tgtoken,//Telegram api token
    INPUT_CHAT: chatid,// Telegram Chat ID
    INPUT_IU_TITLE: ititle,// Issue title
    INPUT_IU_NUM: inum,// Issue Number
    INPUT_IU_ACTOR: iactor,// Issue made by
    INPUT_IU_BODY: ibody,// Issue Body
    INPUT_PR_NUM: pnum,// PR Number
    INPUT_PR_STATE: prstate,// PR Opened, reponed or closed
    INPUT_PR_TITLE: ptitle,// PR Title
    INPUT_PR_BODY: pbody,// Body of the PR
    GITHUB_EVENT_NAME: ghevent,// Name of the trigger event
    GITHUB_REPOSITORY: repo,// Repository the trigger was made from
    GITHUB_ACTOR: ghactor,// User who triggered the action
    GITHUB_SHA: sha,// Commit ID
    GITHUB_WORKFLOW: ghwrkflw// Workflow Name
} = process.env;

const bot = new Bot(tgtoken)
```
First, we're defining the dotenv for config and initializing Telegram Bot. Here we're defining the alias variables for the *environment variables*. You might notice an `INPUT_` for almost every environment variable, this is because GitHub Actions pass the env variable with an INPUT prefix. Other env variables are action's default environment variables. Then we initialized the bot with the API token.

GitHub actions could be triggered with Issues, Pull Request or Pushes. You can find the trigger events [here](https://help.github.com/en/actions/reference/events-that-trigger-workflows). Here we're gonna get a message from the bot when an *Issue* or *Pull Request* or a *Push* event has happened.

```js
const evresp = (gevent) => {
    switch (gevent) {

        case "issues":
            return `
❗️❗️❗️❗️❗️❗️
        
Issue ${prstate}

Issue Title and Number  : ${ititle} | #${inum}

Commented or Created By : \`${iactor}\`

Issue Body : *${ibody}*

[Link to Issue](https://github.com/${repo}/issues/${inum})
[Link to Repo ](https://github.com/${repo}/)
[Build log here](https://github.com/${repo}/commit/${sha}/checks)`
        case "pull_request":
            return `
🔃🔀🔃🔀🔃🔀
PR ${prstate} 
        
PR Number:      ${pnum}
        
PR Title:       ${ptitle}
        
PR Body:        *${pbody}*
        
PR By:          ${ghactor}
        
[Link to Issue](https://github.com/${repo}/pull/${pnum})
[Link to Repo ](https://github.com/${repo}/)
[Build log here](https://github.com/${repo}/commit/${sha}/checks)`
        default:
            return `
⬆️⇅⬆️⇅
            
ID: ${ghwrkflw}
        
Action was a *${ipstatus}!*
        
\`Repository:  ${repo}\` 
        
On:          *${ghevent}*
        
By:            *${ghactor}* 
        
Tag:        ${process.env.GITHUB_REF}
        
[Link to Repo ](https://github.com/${repo}/)
            `
    }
}
```
In these lines of code, we're just initializing a switch statement for the responses. We're also declaring an anonymous function to use the switch responses via a function later. We're using all the defined variables in the switch. You can check the [trigger Events](https://help.github.com/en/actions/reference/events-that-trigger-workflows) to get how the event is triggered and what keyword should be used.

Now for the last part of the Js file, we just take the response from the switch and assign it to a constant. Then we use the `sendMessage` function of the `node-telegram-bot-api` to send the message to the bot with the chatid and the output as the arguments.
```js
const output = evresp(ghevent)
```
bot.sendMessage(chatid,output,{parse_mode : "Markdown"})
## Compiling and Minifying the Js code 
Since we have installed `@zeit/ncc` and this is used for the making the whole program with all the APIs to a single file and we need to use NCC for that. We just need to run
```shell 
yarn run ncc build index.js -C -m -o dist
``` 
or you might wanna add the following to you `package.json` file, and run `npm run test` to compile and minify the code.
```json
"scripts": {
    "test": "ncc build index.js -C -m -o dist"
  },
```
This will create a `dist` folder with and `index.js` file which contains the compiled code.

## Making it a valid action
For making this Js file a valid action, we need to add an `action.yml` file. The action.yml for this action is like this
```yml
name: 'Action Name'
description: 'Action Descreption'
author: '<author name>'
inputs: 
  chat:
    description: 'Chat to send: chat id or @channel_name'
    required: true
  token:
    description: 'Telegram Bot token'
    required: true
  status:
    description: 'Job status'
    required: true
  iu_title: 
    description: 'Issue Title'
    default: ${{ github.event.issue.title }}
  iu_num:
    description: 'Issue Number'
    default: ${{ github.event.issue.number }}
  iu_actor: 
    description: 'Issue Triggerer'
    default: ${{ github.event.issue.user.login }}
  iu_com:
    description: 'Issue Comment'
    default: ${{github.event.comment.body}}
  pr_state:
    description: 'State of the PR'
    default: ${{ github.event.action }}
  pr_num:
    description: 'PR Number'
    default: ${{ github.event.number }}
  pr_title:
    description: 'Title of the PR'
    default: ${{ github.event.pull_request.title }}
  pr_body:
    description: 'Body/Contents of the PR'
    default: ${{ github.event.pull_request.body }}
runs:
  using: "node12"
  main: "dist/index.js"
branding:
  icon: 'repeat'  
  color: 'green'
```
Here we're defining the Input variables to be loaded for the action in GitHub's runtime environemt. All these `default` data are taken from the response of the webhooks which are send by GitHub when a trigger event is occured. You can find out more in the [Action Documentation Here](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context).

```yml
runs:
  using: "node12"
  main: "dist/index.js"
```
Here we are defining that this is a node action and should run in an environment with node, and the file which should be run, here the `index.js` file in the `dist` folder. That should do it. Create a new commit and push it to a repo. **Create a new tag** and this action will appear in the [marketplace](https://github.com/marketplace?type=actions).

### Defining a workflow to test your action
GitHub Action workflows are defined using the `.yml` syntax. Here is an example of a sample workflow for this action

```yml
name: <Workflow Name>

on:
  push:
  pull_request:
    types: [opened, closed]
  issues:
    types: [opened, closed, reopened]
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: <AnyName>
        uses: <username>/<repo>@master
        if: always()
        with:
          chat: ${{ secrets.chat }}
          token: ${{ secrets.token }}
          status: ${{ job.status }}
```


The Complete code for the bot is
```js
//Initializing dotenv and the bot
require("dotenv").config
const Bot = require('node-telegram-bot-api');
// aliasing the environment variables 
const {
    INPUT_STATUS: ipstatus, 
    INPUT_TOKEN: tgtoken, //Telegram api token
    INPUT_CHAT: chatid,// Telegram Chat ID
    INPUT_IU_TITLE: ititle,// Issue title
    INPUT_IU_NUM: inum,// Issue Number
    INPUT_IU_ACTOR: iactor, // Issue made by
    INPUT_IU_BODY: ibody, // Issue Body
    INPUT_PR_NUM: pnum, // PR Number
    INPUT_PR_STATE: prstate, // PR Opened, reponed or closed
    INPUT_PR_TITLE: ptitle, // PR Title
    INPUT_PR_BODY: pbody, // Body of the PR
    GITHUB_EVENT_NAME: ghevent, // Name of the trigger event
    GITHUB_REPOSITORY: repo, // Repository the trigger was made from
    GITHUB_ACTOR: ghactor, // User who triggered the action
    GITHUB_SHA: sha, // Commit ID
    GITHUB_WORKFLOW: ghwrkflw // Workflow Name
} = process.env;

const bot = new Bot(tgtoken)
// Function to return the response for the specific trigger
const evresp = (gevent) => {
    switch (gevent) {
//Switch statement for issues
        case "issues":
            return `
❗️❗️❗️❗️❗️❗️
        
Issue ${prstate}

Issue Title and Number  : ${ititle} | #${inum}

Commented or Created By : \`${iactor}\`

Issue Body : *${ibody}*

[Link to Issue](https://github.com/${repo}/issues/${inum})
[Link to Repo ](https://github.com/${repo}/)
[Build log here](https://github.com/${repo}/commit/${sha}/checks)`
// Switch statement for Pull Requests
        case "pull_request":
            return `
🔃🔀🔃🔀🔃🔀
PR ${prstate} 
        
PR Number:      ${pnum}
        
PR Title:       ${ptitle}
        
PR Body:        *${pbody}*
        
PR By:          ${ghactor}
        
[Link to Issue](https://github.com/${repo}/pull/${pnum})
[Link to Repo ](https://github.com/${repo}/)
[Build log here](https://github.com/${repo}/commit/${sha}/checks)`
        default:
// switch statement for Pushes
            return `
⬆️⇅⬆️⇅
            
ID: ${ghwrkflw}
        
Action was a *${ipstatus}!*
        
\`Repository:  ${repo}\` 
        
On:          *${ghevent}*
        
By:            *${ghactor}* 
        
Tag:        ${process.env.GITHUB_REF}
        
[Link to Repo ](https://github.com/${repo}/)
            `
    }
}
// assigning the output to a variable
const output = evresp(ghevent)
// sending the message
bot.sendMessage(chatid,output,{parse_mode : "Markdown"})
```


------

You can try out many different items using actions and this is just a sample action to get you started. Maybe sending Cat GIFs if the build succeded on the pull request or sending a welcome message to a first time contributor. You imagination is the limit😄 and **Never Stop being ⚡️**