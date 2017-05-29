# Phungible Site
## Dev Requirements
Requires `node >= 6.10.0`

## Setup
Run `npm install` in root

## Development
Run `npm start`.  Open `http://localhost:8080`.  Edit html, css, and jquery files in `src` directory.  The files will automatically be rebuilt.  Reload the page to see the changes.

## Available scripts
`npm start` - Initiate build, run server at `http://localhost:8080`, and watch files in `src/` for changes (`start` is a special script that can also be run in the standard script format of `npm run start`)

`npm test` - Initiate code test and linting (`test` is a special script that can also be run in the standard script format of `npm run test`)

`npm run build:prod` - build production files.

`npm run server` - Open server at `http://localhost:8080` serving files from `public`

## Git Processes

### Making changes
* Checkout main repo with `git checkout master`
* Copy repo to another branch with `git checkout -b <descriptive-branch-name>`
* Make changes.
* Run `npm test` and correct any issues.
* Run `git commit -am "Some comment"'
* Repeat changes/commit cycle until unit of work is complete.
* Push your change to the server with `git push origin <descriptive-branch-name>`
* Login to gitlab.
* Create pull request to central "Phungible" master.

### Updating local repo
`Origin` - version of repo on remote server.

`Upstream` - repo under central "Phungible" organization on git server.

* Pause work by with `git stash` to stash your current changes
* Checkout master branch with `git checkout master`
* Run `git fetch --all` to retrieve updates from both `origin` and `upstream`.
* Run `git merge upstream/master` to get updates from central "Phungible" repo
* Return to work by checking out original branch with `git checkout <my-branch-name>`.
* Retrieve changes from stash with `git stash pop`
