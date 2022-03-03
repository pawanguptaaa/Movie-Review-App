# Movie Review App

Created movie review app backend using Node/Express, MongoDB and Mongoose



## Installation

1- Clone the Movie Review App

```bash
  git clone https://github.com/pawanguptaaa/nodeApp.git
```
2- Install server NPM packages (inside root folder)

```bash
  npm install
```
3 -  Then create an .env file on the root and populate it with your MongoDB connection string in one of two ways:
#### Using a local Mongo database
```bash
  DB_HOST="localhost:27017/movie-node";
```
#### Using mLab.com
```bash
  DB_HOST="mongodb://<dbuser>:<dbpassword>@ds119650.mlab.com:19650/movie-node"
```
(Substitute your database username and password)
The package dotenv has already been installed and will allow you to access that .env file.

4 -Now Run the command
```bash
  npm run dev
```
   
