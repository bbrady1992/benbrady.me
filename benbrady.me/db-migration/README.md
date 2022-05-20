# Purpose

This site is deployed onto a Digital Ocean Docker host droplet by cloning the
repository and running Docker Compose. This reduces the environmental 
configuration to installing Git and Docker.

As a result, using dotnet command line tools, such as those required for Entity
Framework Core migrations, is more complicated than simply running the
"dotnet ef database update" command in a shell on the droplet.

This Dockerfile/docker-compose configuration containerizes the dotnet CLI
tools needed to apply DB migrations.


# Instructions

From this directory:

1. Run `docker-compose up` to have a `db-migrater` container run the 
   `dotnet ef database update` command on the production database
