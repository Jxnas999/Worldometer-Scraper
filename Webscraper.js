const axios = require("axios");
const puppeteer = require("puppeteer");
const prompt = require('prompt');


getData()
function getData(){
(async () => {
  //Start Webscraper
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/");

  //Get all the counters.
  const grabNums = await page.evaluate(() => {
    const divNumbers = document.querySelectorAll(".rts-counter");
    let numbers = [];
    divNumbers.forEach((x) => {
      numbers.push(x.innerText);
    });
    return numbers;
  });
  //On the Website itself Item number 44 and 45 do not display a counter therefore we cut them out.
  grabNums.splice(44, 2);


  //Now we grab all the names of the Items
  const grabItems = await page.evaluate(() => {
    const divItems = document.querySelectorAll(
      ".counter-item, .counter-item-double"
    );

    let Items = [];
    divItems.forEach((x) => {
      Items.push(x.innerText);
    });
    return Items;
  });


//Categorize Items based on their position in the Array.

let final = [];
  for (let i = 0; i < grabItems.length; i++) {
    let category = "";
    if (i <= 6) {
      category = "Population";
    } else if (i <= 12) {
      category = "Economics";
    } else if (i <= 22) {
      category = "Media";
    } else if (i <= 27) {
      category = "Environment";
    } else if (i <= 33) {
      category = "Food";
    } else if (i <= 36) {
      category = "Water";
    } else if (i <= 47) {
      category = "Energy";
    } else if (i > 47) {
      category = "Health";
    }

//Assemble Item, counter and category to final object
    final.push({
      item: grabItems[i],
      counter: grabNums[i],
      category: category,
    });
  }

  const JSONObject = JSON.stringify(final);
  
  //Update or initialize
  prompt.start();
  console.log('Press 1 to Update all of the counters in your Database. Press 2 to initialize an empty Database and fill it with Data.')
  prompt.get(['number'], function(err, result) {
    
    if(err){
      console.log(err)
      return 1;
    }
    else if(result.number == 1){
      console.log('UPDATE')
      updateDataBase(JSONObject)
    }
    else if(result.number == 2){
      console.log('INITILIAZE')
      postToDataBase(JSONObject);
  }
    else {
      console.log('Invalid number.')
      getData()
    }
  })
  


  await browser.close();
})();
}

async function postToDataBase(arr) {
  const parsed = JSON.parse(arr);
    for (let i = 0; i < parsed.length; i++) {
    const currObj = JSON.parse(JSON.stringify(parsed[i]));
    console.log(currObj)
    try {
      await axios.post(`http://localhost:3001/data`, 
      {
        item: currObj.item,
        counter: currObj.counter,
        category: currObj.category
      })
    } catch (error) {      
      console.log(error)
    }
  }  
}

async function updateDataBase(arr){
  const parsed = JSON.parse(arr);

    for (let i = 0; i < parsed.length; i++) {
    const currObj = JSON.parse(JSON.stringify(parsed[i]));
    console.log(currObj.counter)
    try {
      await axios.put(`http://localhost:3001/data/${currObj.item}`, {counter: currObj.counter})
    } catch (error) {
      console.log(error)
    }
  }  
 
}