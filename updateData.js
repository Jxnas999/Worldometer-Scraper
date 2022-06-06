const axios = require("axios");
const puppeteer = require("puppeteer");

async function postToDataBase(arr) {
  const parsed = JSON.parse(arr);
  for (let i = 0; parsed.length; i++) {
    const currObj = JSON.stringify(parsed[i]);
    const currObjPars = JSON.parse(currObj);

    try {
      const res = await axios.post(process.env.DATABASE_POST, currObjPars);
    } catch (err) {
      console.error(err);
    }
  }
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/");

  const grabNums = await page.evaluate(() => {
    const divNumbers = document.querySelectorAll(".rts-counter");
    let numbers = [];
    divNumbers.forEach((x) => {
      numbers.push(x.innerText);
    });
    return numbers;
  });

  grabNums.splice(44, 1);
  grabNums.splice(45, 1);

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

  let final = [{}];

  for (let i = 0; i < grabItems.length + grabNums.length; i++) {
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

    final.push({
      item: grabItems[i],
      counter: grabNums[i],
      category: category,
    });
  }

  final.splice(45, 1);
  final.splice(63);
  final.shift();
  const JSONObject = JSON.stringify(final);
  postToDataBase(JSONObject);
  console.log(final);
  await browser.close();
})();
