import express from "express";
const app = express();
import bodyParser from "body-parser";
import { readFile, writeFile } from "fs";
import { parse } from "path";
import { type } from "os";

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const path = "./data/db.json"; //The path is relative to the root execution context of the node application

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
    newUsers.forEach((user) => {
      if (user.following) {
        user.following = user.following.filter((followingUserId) => followingUserId != userId);
      }
    });

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

app.post("/login", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    let isValidUser = false;
    let user = null;
    const parsedData = JSON.parse(data);
    parsedData.forEach((element) => {
      if (
        element.email === req.body.email &&
        element.password === req.body.password
      ) {
        isValidUser = true;
        user = element;
      }
    });
    if (isValidUser) {
      res.status(200);
      res.json({ user: user, checkbox: req.body.checkbox });
    } else {
      res.status(201);
      res.end();
    }
  });
});

app.get("/feed/:id", (req, res) => {
  const userId = req.params.id;
  let posts = [];
  let friendsId = [];
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    friendsId = parsedData.filter((user) => user.id == userId)[0].following;
    friendsId.push(parseInt(userId));

    parsedData.forEach((element) => {
      if (friendsId.includes(element.id)) {
        posts = posts.concat(element.posts);
      }
    });
    posts.sort(function (a, b) {
      return a.insertionTime - b.insertionTime;
    });
    posts.reverse();
    res.json({ posts: posts });
  });
});

app.post("/feed/liked", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    const userId = req.body.userId;
    const postId = req.body.postId;

    parsedData.forEach((element) => {
      if (element.posts) {
        element.posts.forEach((post) => {
          if (post.postId === postId) {
            if (post.likedBy.includes(userId)) {
              post.likedBy = post.likedBy.filter((id) => id !== userId);
            } else {
              post.likedBy.push(req.body.userId);
            }
          }
        });
      }
    });

    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.end();
  });
});

app.delete("/feed/delete/:postid", (req, res) => {
  const postId = req.params.postid;

  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    parsedData.forEach(user => {
      if (user.posts) {
        user.posts = user.posts.filter((post) => post.postId != postId);
      }
    });

    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.end();
  });
});

const generateNewPostId = (data) => {
  let globalPostCounter = 0;
  data.forEach((user) => {
    if (user.posts) {
      user.posts.forEach((post) => {
        const postIdNumber = parseInt(post.postId);
        if (postIdNumber > globalPostCounter) {
          globalPostCounter = postIdNumber;
        }
      });
    }
  });
  globalPostCounter++;
  return globalPostCounter;
};

const createNewPost = (body, data) => {
  const id = generateNewPostId(data);
  const newPost = {
    userId: body.userId,
    postId: id,
    userName: body.userName,
    title: body.title,
    likedBy: [],
    insertionTime: body.insertionTime,
    content: body.content,
  };
  return newPost;
};

app.post("/feed/newpost", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);
    const newPost = createNewPost(req.body, parsedData);

    parsedData.forEach((user) => {
      if (user.posts) {
        if (user.id === req.body.userId) {
          user.posts.push(newPost);
        }
      }
    });

    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.end();
  });
});

function searchByNamePrefix(searchTerm, newFormattedUsers, userID) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return newFormattedUsers.filter((user) =>
    user.username.toLowerCase().startsWith(lowerCaseSearchTerm) && user.id != userID
  );
}

function searchByNameSuffix(searchTerm, newFormattedUsers, userID) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return newFormattedUsers.filter((user) =>
    user.username.toLowerCase().endsWith(lowerCaseSearchTerm) && user.id != userID
  );
}

app.get("/friends", (req, res) => {
  const nameToSearch = req.query.friendusername;
  const userID = req.query.userid;
  const suffixFeature = req.query.suffixFeature === 'true'


  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data).slice(1);
    const newFormattedUsers = parsedData.map((user) => ({
      username: `${user.firstName} ${user.lastName}`,
      id: user.id,
    }));

    if (suffixFeature) {
      const searchResult = searchByNameSuffix(nameToSearch, newFormattedUsers, userID);
      res.json(searchResult);
    }
    else {
      const searchResult = searchByNamePrefix(nameToSearch, newFormattedUsers, userID);
      console.log(searchResult)
      res.json(searchResult);
    }
    res.end();

  });
});

app.get("/friends/display/:id", (req, res) => {
  const id = req.params.id
  let followingToReturn = []

  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    parsedData.forEach(user => {
      if (user.id == id) {
        followingToReturn = user.following
      }
    });
    res.json(followingToReturn);
  });

})

app.post("/friends/follow", (req, res) => {
  const userId = req.body.userId
  const friendId = req.body.friendId

  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    parsedData.forEach((user) => {
      if (user.id === userId) {
        if (user.following.includes(friendId)) {
          user.following = user.following.filter((id) => id !== friendId);
        } else {
          user.following.push(friendId);
        }
      }
    });

    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.end();
  });

});

app.post("/logout", (req, res) => {
  const idToUpdate = req.body.id

  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data);

    parsedData.forEach((user) => {
      if (user.id === idToUpdate) {
        if (user.lastLogOut) {
          user.lastLogOut = new Date();
        }
      }
    });

    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.end();
  });
})

app.get("/features", (req, res) => {
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data)
    const features = parsedData[0].features
    res.json(features);
  });
})

app.post("/updatefeatures", (req, res) => {
  const id = req.body.id
  readFile(path, (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const parsedData = JSON.parse(data)
    if (id === 1) {
      parsedData[0].features.deleteFeature = !parsedData[0].features.deleteFeature
    } else {
      parsedData[0].features.suffixFeature = !parsedData[0].features.suffixFeature
    }
    writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
    });
    res.end();
  });

})
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
