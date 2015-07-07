[www.NOSHalert.com](http://www.NOSHalert.com) - a prototype built by ArdentMC based on the [openFDA API] (http://open.fda.gov)

[![Build Status](https://travis-ci.org/ArdentMC/openFDA-Prototype.svg?branch=master)](https://travis-ci.org/ArdentMC/openFDA-Prototype)

## The Team
* Product Owner and Leader: Jim Correll
* Scrum Master: Amy Rosen
* Front End Developer: Gene Staten
* Back End Developer: Justin Downs
* DevOps Engineer: Elise Walker
* Our Users: Everyone we could lay hands on

## Our Approach
The approach we took in developing this prototype - any piece software, really - follows a few simple rules:
* Incorporate user feedback as soon as possible, ideally before any code is written
* Get a working product in the hands of our users as soon as possible
* Based on user feedback and gathered metrics, continuously iterate upon the design in small batch sizes

To that end, after studying the openFDA API, our development cycle began with a meeting with a handful of our prospective users, brainstorming ideas that appealed to them first and foremost.  We continually remind ourselves that the products we create are not for ourselves, but for the people using them.

Once we settled on a chosen product idea (and saved notes on a few backup ideas in case we needed to pivot after initial release), we started developing a very specific 'tracer bullet' piece of functionality that formed the central feature of our intended product. At the same time, we began implementing our CI/CD pipeline that was so critical in getting each new iterative release into the hands of our users as quickly as possible.  Our users previewed this very early release and were able to give us quality feedback that allowed us to make incremental improvements on the original idea.  This became our regular, sustainable routine.  Each day, we made small enhancements, fixed a few defects and fed the user feedback loop essential to agile, iterative development.

We featured an open development environment, extending the concept of leveraging a public source repository even further by inviting users to attend our daily calls and provide direct feedback to the user stories we were coding against, even reprioritizing them on the fly at times.  And finally, our users named the app itself.  We invited everyone in the company to vote on one of four name finalists, and thus, NOSHalert was born.

Formally, what we have today can be considered a 'release.'  But we also had one very early in this process, and have had multiple releases on a daily basis ever since.  We didn't target a 'final' set of requirements, we merely developed against the most important requirements as defined by our users, and iteratively improved upon them.  Today, after wrapping development up for the purposes of submission, we still have a backlog of user stories and issues that would be completed had this been a continuing project.

This version is labeled as the released prototype for purposes of version control, but we don't considered it the 'final' version of the prototype.  Even the word prototype might be a misnomer it today's agile development climate.  It merely represents the latest releasable version at this point in time.  With a backlog of features to address, how can it be considered finished?

## Epilogue
If the feedback loop with our users is the most important component of creating applications, then automating the delivery of that application to users becomes just as critical. The following points represent key factors in support of that deployment pipeline.

* We developed and instantiated our TravisCI pipeline very early in our product creation cycle, without slowing down our developers
* Our developers created automated unit tests to ensure we could deliver quality software to our users at each release
* We leveraged continuous monitoring tools and notifications in two areas:  TravisCI to monitor the health of our builds and deployments, and monitoring tools available in our chosen cloud platform to monitor the health of our application and services
* We deployed our prototype into an application container, that allowed us to be more flexible in choosing a hosting environment


## Getting Started
Installation instructions for this software can be found here - [Installation Instructions](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/InstallationReadMe.md)

The technologies chosen for this application, including front and back end libraries, deployment technologies, and hosting platform can be found here - [Application Architecture](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/AppArchitectureReadMe.md)

## General Reference
* [How to Docker](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/HowToDocker.md)
 * [Docker Installation](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/DockerInstallationReadMe.md)
 * [Build Docker Image](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/BuildDockerImage.md)
* [Kubernetes](https://github.com/ArdentMC/openFDA-Prototype/blob/master/documents/BuildDockerImage.md)
