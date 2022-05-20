# Purpose

This site is deployed onto a Digital Ocean Docker host droplet by cloning the
repository and running Docker Compose. This reduces the environmental 
configuration to installing Git and Docker.

As a result, using dotnet command line tools such as those required for Entity
Framework Core migrations, is more complicated than simply running the
"dotnet ef database update" command in a shell on the droplet.

The docker-compose file in this directory, along with 
../server/Dockerfile.db-migration, make it possible to run database migrations
in a Docker container.



# Instructions

From this directory:

1. Run `docker-compose build` to ensure the `db-migrater` image contains the
   most recent code updates
2. Run `docker-compose up` to have a `db-migrater` container run the 
   `dotnet ef database update` command on the production database



# Notes

Rebuilding the image can be avoided if the code is mounted instead of built 
into the image, but this first iteration works well enough since deployments
are infrequent.
