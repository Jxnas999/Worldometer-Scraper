![worldometers-logo](https://user-images.githubusercontent.com/54753449/201200154-9697b314-ab73-46f4-91c9-d0dd800b2100.gif)
# Public-WorldDataAPI 



### Getting started
To install the Webscraper clone the GitHub Repo first.

```sh
git clone https://github.com/Jxnas999/Public-WorldDataAPI
```


Now open the terminal and type the following to install all the packages
```sh
npm install
```


## Connect your own Database
To be able to receive data and put it into your Database you can either stick with mongoDB (like I did in this project) or you can use your own Database. If you decide to also use mongoDB create a Database in your account and change **process.env.MONGOLAB_URI** in **dbConnection.js**.

## Initialize and/or Update Data
To fill the database with data for the first time, you need to start the server. Afterwards, you just run **Webscraper.js**. The script will now ask you if you want to update(1) or initialize(2) the data. If you don't have any data in your database, press 2. If you want to update already existing data within your database, press 1. The data now gets automatically scraped and put into your database. 

## IMPORTANT NOTE
If you plan on running the script on a publically available server make sure to protect the routes within **DataRoute.js.** Otherwise you make yourself vunerable for attacks!!
