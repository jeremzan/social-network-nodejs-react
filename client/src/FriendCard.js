import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const FriendCard = ({ friend, userInfo }) => {

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    axios
      .get(`/friends/display/${userInfo.id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.includes(friend.id)) {
          setIsFollowing(true)
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const nameInitials = (userName) => {
    const splittedName = userName.split(" ");
    const firstInitial = splittedName[0].charAt(0).toUpperCase();
    const secondtInitial = splittedName[1].charAt(0).toUpperCase();
    const initials = firstInitial + "" + secondtInitial;
    return initials;
  };

  const handleFollowToggle = () => {
    axios
      .post("/friends/follow", { userId: userInfo.id, friendId: friend.id })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };


  const FollowingSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

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
              {nameInitials(friend.username)}
            </Avatar>
          }
          title={friend.username}
        />
        <CardActions
          disableSpacing
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "16px",
          }}
        >
          <div style={{ marginLeft: "auto" }}>
            <FormControlLabel
              onClick={handleFollowToggle}
              control={<FollowingSwitch defaultChecked={isFollowing} />}
              label="Following"
            />
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default FriendCard;
