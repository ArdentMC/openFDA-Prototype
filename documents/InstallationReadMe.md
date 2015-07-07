The application is created show that it can be deployed in any environment through the portability of NodeJS, Docker and Kubernetes.

## To Deploy through NodeJS Locally:
* Clone the repository
* Change directory to the root folder
* Build the application by typing: `grunt build`
* Run the application with: `node server.js`

## To Deploy with Docker using Docker Compose:
* Install Docker and Docker-Compose
 * [Install Docker](https://github.com/ArdentMC/openFDA-Prototype/wiki/Docker-Installation)
 * [Docker Compose](https://docs.docker.com/compose/install/)
* Change directory to the root project folder
* Execute the command: `docker-compose up`

## To Deploy with Docker locally or on a server manually:
To deploy manually requires a either a docker image be created or one downloaded from a repository.
The image is presently available on DockerHub

### Local
`docker run -d -p 27017:27017 --name DB_1 mongo`
`docker run -d -p 80:3000 --link <mongo container ID>:DB_1 kindafearless/openfda-prototype`

### SSH
`docker --tls -H tcp://<server address>:<port> run -d -p 27017:27017 --name DB_1 mongo`
`docker --tls -H tcp://<server address>:<port> run -d -p 80:3000 --link <mongo container ID>:DB_1 kindafearless/openfda-prototype`

## To Deploy with Kubernetes:
Deploying with Kubernetes requires a docker image be available, either locally or in an image repository.
The image is presently available on DockerHub

Install Kubernetes in your environment
* https://github.com/GoogleCloudPlatform/kubernetes/tree/master/docs/getting-started-guides

Once installed, use the following installation scripts to standup the cluster:
* [Kubernetes Scripts](https://github.com/ArdentMC/openFDA-Prototype/tree/master/scripts/kubernetes)

* Add the installation scripts to the instance you wish to deploy on.
* Access the command prompt.
* Create the MongoDB and Prototype Replication Controllers and pods by running:
`kubectl create -f mongo-openfda-rc.json`
`kubectl create -f openfda-rc.json`
* Create the MongoDB and Prototype ervices by executing:
`kubectl create -f mongo-service.json`
`kubectl create -f openfda-service.json`

### Performing a rolling update with Kubernetes
To keep your deployment up to date with the latest docker image, you can easily perform live deployments with the following command.

*Note: To support rolling updates, proper versioning, by updating the name and version labels of replication controllers, will help alleviate confusion.*
`kubectl rolling-update openfda-standalone-rc-0.x.x -f openfda-standalone-rc.json`
