import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Post = ({ postInfo, userId }) => {

  const navigate = useNavigate();
  const nameInitials = (userName) => {
    const splittedName = userName.split(" ");
    const firstInitial = splittedName[0].charAt(0).toUpperCase();
    const secondtInitial = splittedName[1].charAt(0).toUpperCase();
    const initials = firstInitial + "" + secondtInitial;
    return initials;
  };

  const [liked, setLiked] = useState(false);

  const [features, setFeatures] = useState({
    deleteFeature: true,
    suffixFeature: true
  })

  const handleLikeClick = () => {
    if (new Date().getTime() < JSON.parse(localStorage.getItem("userInfo")).expiry) {
      axios
        .post("/feed/liked", { userId: userId, postId: postInfo.postId })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
      setLiked((prevLiked) => !prevLiked);
    } else {
      window.location.reload(true);
    }
  };

  const handleDeletePost = () => {
    if (new Date().getTime() < JSON.parse(localStorage.getItem("userInfo")).expiry) {
      axios
        .delete(`/feed/delete/${postInfo.postId}`)
        .then((response) => { console.log(response) })
        .catch((error) => console.error(error));
    }
    window.location.reload(true);
  }

  useEffect(() => {
    const likedByCurrentUser = postInfo.likedBy.includes(userId);
    setLiked(likedByCurrentUser);
    setTimeout(() => {
      axios
        .get("/features")
        .then((response) => {
          setFeatures(response.data)
        })
        .catch((error) => console.error(error));
    }, 200)
  }, []);

  const myDate = new Date(postInfo.insertionTime);

  const formattedDate = `${myDate.toLocaleDateString(
    "en-GB"
  )}  ${myDate.getHours()}:${myDate.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: 500 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[700] }} aria-label="post-content">
              {nameInitials(postInfo.userName)}
            </Avatar>
          }
          title={postInfo.title}
          subheader={formattedDate}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: 19 }}
          >
            {postInfo.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={handleLikeClick}
            color={liked ? "error" : "default"}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {((postInfo.userId == userId) && features.deleteFeature) ?
            <IconButton
              onClick={handleDeletePost}
              aria-label="delete"
              sx={{
                marginLeft: "auto",
                color: "rgba(0, 0, 0, 0.54)",
              }}
            >
              <DeleteOutlinedIcon />
            </IconButton> : null}
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
