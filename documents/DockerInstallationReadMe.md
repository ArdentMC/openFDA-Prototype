## Windows: 

Detailed installation instructions here: https://docs.docker.com/installation/windows/

## Ubuntu:

Run 

    wget -qO- https://get.docker.com/ | sh

This executes a shell script to install docker and dependencies.

Add a user to the docker user group so you don't need to sudo

    sudo usermod -aG docker username

Log out, back in, and you are done.
