const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { readFile, writeFile } = require("fs");

const PORT = process.env.PORT || 3001;

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// For the CORS errors but we used a proxy to fetch the data at the beginning
// because couldn't resolve the CORS error for this specific first fetch
// Otherwise it's needed for the post requests for example
app.use(cors());
app.use(bodyParser.json());

const path = "./data/users.json"; //The path is relative to the root execution context of the node application
// readFile(path, (err, data) => {
//   if (err) {
//     console.log("File read failed:", err);
//     return;
//   }
//   const parsedData = JSON.parse(data);
//   parsedData[0].password = "12345";
//   console.log("File data:", parsedData);

//   writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
//     if (err) {
//       console.log("Failed to write updated data to file");
//       return;
//     }
//   });
// });

//
//
//
//
//
//
//
//
//
//
app.get("/api", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    res.json(parsedData);
  });
});

app.post("/api", (req, res) => {
  console.log(req.body);
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    parsedData.push(req.body);
    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
