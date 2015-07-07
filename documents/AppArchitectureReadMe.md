# Open Source Technologies Selected

* [NodeJS](https://nodejs.org/)
 * JavaScript runtime environment.
* [MeanJS](http://meanjs.org/)
 * Baseline JavaScript solution.
* [Docker](https://www.docker.com/)
 * Container framework.
* [Kubernetes](http://kubernetes.io/)
 * Container-oriented cluster management.
* [AngularJS](https://angularjs.org/)
 * JavaScript modular framework
* [Bootstrap](http://getbootstrap.com/)
 * JavaScript user interface component library.
* [Karma](http://karma-runner.github.io/0.12/index.html)
 * JavaScript Test Runner
* [GruntJS](http://gruntjs.com/)
 * JavaScript Task Runner
* [Travis-CI](https://travis-ci.org/)
 * Continuous Integration
* [MongoDB](https://www.mongodb.org/)
 * NoSQL Database

## Continuous Integration

Continuous Integration is managed using Travis-CI, an open source CI pipeline commonly used in conjunction with GitHub. Travis-CI was chosen as a simple, yet powerful alternative to more complex CI software like Jenkins because of it's ease of use and reliability.

## System Architecture

### Building Blocks
The website is built on NodeJS due to the runtime's flexibility and strong open source community. The application uses MongoDB for storage and is intended to be deployed as a docker image. The team chose to base the application with MeanJS to give us a solid foundation to start from.

### Container Deployment
Scripts for deploying the application in it's standalone form, as a Docker container, or within a Kubernetes cluster are provided.

* See: [Installation Instructions](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/InstallationReadMe.md) for how to use these scripts.*

### Hosted Architecture for the Prototype
The prototype application is currently hosted on Google Cloud platform, leveraging 5 virtual machines as described in our [Kubernetes](https://github.com/ArdentMC/openFDA-Prototype/wiki/Kubernetes) information document.

The application is replicated times across the cluster with a separate MongoDB instance. Each container is based off the [google/nodejs](https://registry.hub.docker.com/u/google/nodejs/) base image. Kubernetes handles the cluster and load balancing.
