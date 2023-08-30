import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import MyPost from "./MyPost";

const Feed = ({ userInfo, deleteFeature }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`/feed/${userInfo.id}`)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="feed">
      <MyPost userInfo={userInfo} />
      {posts.map((post, index) => (
        <Post key={index} postInfo={post} userId={userInfo.id} deleteFeature={deleteFeature} />
      ))}
    </div>
  );
};

export default Feed;
