## Running

Run, and create if it doesn't exist, a container.

    docker run image-name

Run a container and name it

    docker run --name container-name image-name

Run a container and link it to another container

    docker run --link container-to-link:tag image-name

Note: When linking, the tag used will effect environment variables.

Run image and access terminal (in this case ubuntu)

    docker run -it ubuntu:14.04

Create and run a server (example - tomcat) in detached mode and with port mapping to expose it's ports to the client. Detached mode allows the server to run in the background.

    docker run -d -P tomcat:7

## Stopping

Stop a running container

    docker stop container-name

## Listing Images

Display available images

    docker images

Display running images

    docker ps

Display all images, running and historical

    docker ps -a

## Useful Commands

Get command line access to a running container

    docker exec -it container-id bash

Delete a container

    docker rm container-id

Delete a local image

    docker rmi repository-name:tag 
    docker rmi image-id

Changes made to a docker image are not saved when the image is shut down. To maintain those changes, they must be committed.

    docker commit image-id new-image-name:0.0
