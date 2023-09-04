const fetch = require("node-fetch");
const assert = require("assert");

const BASE_URL = "http://localhost:3001";

// Helper function to send HTTP requests and validate responses
async function testRoute(route, method, data = {}) {
  const url = `${BASE_URL}${route}`;
  const options = { method };

  if (method === "POST" || method === "PUT") {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const responseBody = await response.text();

  return {
    status: response.status,
    body: responseBody,
  };
}

// Define your test cases for each route
async function runTests() {
  try {
    // Test the /admin route (GET)
    const adminTest = await testRoute("/admin", "GET");
    assert.strictEqual(
      adminTest.status,
      200,
      "Admin route should return a 200 status code"
    );
    console.log("Admin route test passed.");

    // Test the /admin/:id route (DELETE)
    const deleteAdminTest = await testRoute("/admin/1", "DELETE");
    assert.strictEqual(
      deleteAdminTest.status,
      200,
      "Admin delete route should return a 200 status code"
    );
    console.log("Admin delete route test passed.");

    // Test the /register route (POST)
    const registerTest = await testRoute("/register", "POST", {
      email: "newuser@example.com",
      password: "password123",
      // Add other required fields here
    });
    assert.strictEqual(
      registerTest.status,
      200,
      "Register route should return a 200 status code"
    );
    console.log("Register route test passed.");

    // Test the /login route (POST)
    const loginTest = await testRoute("/login", "POST", {
      email: "test@example.com",
      password: "password123",
    });
    assert.strictEqual(
      loginTest.status,
      200,
      "Login route should return a 200 status code"
    );
    console.log("Login route test passed.");

    // Test the /feed/:id route (GET)
    const feedTest = await testRoute("/feed/1", "GET");
    assert.strictEqual(
      feedTest.status,
      200,
      "Feed route should return a 200 status code"
    );
    console.log("Feed route test passed.");

    // Test the /feed/liked route (POST)
    const likePostTest = await testRoute("/feed/liked", "POST", {
      userId: 1,
      postId: 1,
    });
    assert.strictEqual(
      likePostTest.status,
      200,
      "Like Post route should return a 200 status code"
    );
    console.log("Like Post route test passed.");

    // Test the /feed/delete/:postid route (DELETE)
    const deletePostTest = await testRoute("/feed/delete/1", "DELETE");
    assert.strictEqual(
      deletePostTest.status,
      200,
      "Delete Post route should return a 200 status code"
    );
    console.log("Delete Post route test passed.");

    // Test the /feed/newpost route (POST)
    const newPostTest = await testRoute("/feed/newpost", "POST", {
      userId: 1,
      userName: "Test User",
      title: "New Post Title",
      insertionTime: Date.now(),
      content: "New Post Content",
    });
    assert.strictEqual(
      newPostTest.status,
      200,
      "New Post route should return a 200 status code"
    );
    console.log("New Post route test passed.");

    // Test the /friends route (GET)
    const friendsTest = await testRoute(
      "/friends?friendusername=test&userid=1",
      "GET"
    );
    assert.strictEqual(
      friendsTest.status,
      200,
      "Friends route should return a 200 status code"
    );
    console.log("Friends route test passed.");

    // Test the /friends/display/:id route (GET)
    const displayFriendsTest = await testRoute("/friends/display/1", "GET");
    assert.strictEqual(
      displayFriendsTest.status,
      200,
      "Display Friends route should return a 200 status code"
    );
    console.log("Display Friends route test passed.");

    // Test the /friends/follow route (POST)
    const followFriendTest = await testRoute("/friends/follow", "POST", {
      userId: 1,
      friendId: 2,
    });
    assert.strictEqual(
      followFriendTest.status,
      200,
      "Follow Friend route should return a 200 status code"
    );
    console.log("Follow Friend route test passed.");

    // Test the /logout route (POST)
    const logoutTest = await testRoute("/logout", "POST", {
      id: 1,
    });
    assert.strictEqual(
      logoutTest.status,
      200,
      "Logout route should return a 200 status code"
    );
    console.log("Logout route test passed.");

    // Test the /features route (GET)
    const featuresTest = await testRoute("/features", "GET");
    assert.strictEqual(
      featuresTest.status,
      200,
      "Features route should return a 200 status code"
    );
    console.log("Features route test passed.");

    // Test the /updatefeatures route (POST)
    const updateFeaturesTest = await testRoute("/updatefeatures", "POST", {
      id: 1,
    });
    assert.strictEqual(
      updateFeaturesTest.status,
      200,
      "Update Features route should return a 200 status code"
    );
    console.log("Update Features route test passed.");

    console.log("All tests passed successfully.");
  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

runTests();
