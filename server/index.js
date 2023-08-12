const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { readFile, writeFile } = require("fs");
const { parse } = require("path");

const PORT = process.env.PORT || 3001;

// const cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// For the CORS errors but we used a proxy to fetch the data at the beginning
// because couldn't resolve the CORS error for this specific first fetch
// Otherwise it's needed for the post requests for example
// app.use(cors());

app.use(bodyParser.json());

const path = "./data/db.json"; //The path is relative to the root execution context of the node application
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
app.get("/admin", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const users = parsedData.slice(1);
    res.json(users);
  });
});

app.delete("/admin/:id", (req, res) => {
  const userId = req.params.id;
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const newUsers = parsedData.filter((user) => user.id != userId);
    writeFile(path, JSON.stringify(newUsers, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.json(newUsers.slice(1));
  });
});

app.post("/register", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    const parsedData = JSON.parse(data);
    let isValidEmail = true;
    parsedData.forEach((element) => {
      if (element.email === req.body.email) {
        isValidEmail = false;
      }
    });

    if (isValidEmail) {
      const newId = parsedData[parsedData.length - 1].id + 1;
      const newUser = req.body;
      newUser.id = newId;
      parsedData.push(newUser);

      writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
          console.log("Failed to write updated data to file");
          return;
        }
      });
      res.status(200);
      res.end();
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
