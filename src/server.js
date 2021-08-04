const express = require("express");
const app = express();
const port = 3000;
const Apify = require("apify");

app.get("/scan", (req, res) => {
  try {
    Apify.main(async () => {
      // Create a RequestList
      const requestList = await Apify.openRequestList("start-urls", [
        { url: "http://www.devhints.io/go" },
        // { url: "https://www.deejaygeroso.com/" },
      ]);
      // Function called for each URL
      const handlePageFunction = async ({ request, $ }) => {
        const title = $("title").text();
        console.log(`URL: ${request.url}\nTITLE: ${title}`);
      };
      // Create a CheerioCrawler
      const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction,
      });
      // Run the crawler
      await crawler.run();
    });
  } catch (error) {
    console.log("error", error);
  }
  res.send("Website scanning");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
