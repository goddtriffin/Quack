# Quack Server

## Setup (everytime before you get working)

`yarn setup` (`npm run setup`)

## Run

`node server.js`

`yarn start` (`npm run start`)

## Deploy

`yarn build` (`npm run build`)

`yarn serve` (`npm run serve`)

## Setup Docker for Mac 

Install Docker for Mac here: https://docs.docker.com/docker-for-mac/install/

Docker will be used to locally host our SQL database since we can't connect to Azure :sweat_smile: (Thanks iTap)

Once Docker is installed, make sure that in Preferences/Advanced, set at least 4GB of RAM for Docker

Once it is setup, in your terminal, run:

`docker create -v /var/opt/mssql --name mssql microsoft/mssql-server-linux /bin/tru`

To create the SQL database, run:

`docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Test@123' -p 1433:1433 --volumes-from mssql -d --name sql-server microsoft/mssql-server-linux` 
(Change the password to whatever you like)

To check if the database is running locally, run the command:

`docker ps -a` 
If the database STATUS doesn't say "Up *time*", you did something wrong. In that case, go here: https://medium.com/@reverentgeek/sql-server-running-on-a-mac-3efafda48861

Next, if you do not have "sql-cli" installed, run:

`npm install sql-cli`

Then, finally, connect to the database by running:

`mssql -u sa -p Test@123`

If you made it this far and everything works, you have been blessed by Steve Jobs himself and should not take that responsiblity lightly.

