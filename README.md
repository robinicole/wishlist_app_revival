# Deploy instructions 
## Build the project locally
```bash 
make build
```

 and run it locally:
 ```bash
 make run
 ```

 ## Deploy the frontend 
 The frontend is hosted as a static react app on Github.io. The deployment is done automatically with
 ```
 make deploy_frontend
 ```
 it creates a static build of the frontend app, copy it then push it to the github-io repository specified in the `GITHUB_IO_PATH`

## Deploy the backend
The backend is hosted on Heroku, and the target `make deploy_backend` does a `git push --force` to the master branch of a heroku project which triggers a build of the backend. 

To associate an heroku account to this backend, you should add it to git with:
```bash
git remote add heroku {your heroku git repo}
```
