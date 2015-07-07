# Build Docker Image with Instructions

To add instructions to building an image, you use a Dockerfile.

Example Dockerfile

    # Image to build from
    FROM Ubuntu:14.04
    # Command to run
    RUN adduser ardentmc
    # Specify an action to take once container is created, can be overridden at runtime
    CMD ["ping", "127.0.0.1", "-c", "100"]
    # Specify an action to take once container is created, cannot be overridden at runtime
    ENTRYPOINT ["ping", "127.0.0.1", "-c", "100"]
    # Port Mapping
    EXPOSE 80 443

### To create a dockerfile 

Make a file named **Dockerfile** in the desired directory.
Add your instructions to the docker file
Build with the following command

    docker build -t new-image-name:0.0 .

*Note: "." at the end. That designates current directory as the location to look for the Dockerfile.*

*Also Note: "-t". This specifies that a tag will be set, so the rather than being tagged as "latest" it will receive the version "0.0".*
