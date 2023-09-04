import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import LogOutButton from "./LogOutButton";

const Admin = ({ userInfo }) => {

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

  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [rows, setRows] = useState([]);

  const [features, setFeatures] = useState({
    deleteFeature: true,
    suffixFeature: true
  })
  const [additionalPages, setAdditionalPages] = useState({
    contactPage: true,
    betsPage: true
  })

  const handleDelete = (id) => {
    axios
      .delete(`/admin/${id}`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo.email !== "admin") {
      navigate("/dashboard/feed");
    }


    axios
      .get("/admin")
      .then((response) => {
        setUsers(response.data);
        const initialRows = response.data.map((user) => (
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            activity: `${new Date(user.lastLogOut).toLocaleDateString(
              "en-GB"
            )}  ${new Date(user.lastLogOut).getHours()}:${new Date(user.lastLogOut).getMinutes().toString().padStart(2, "0")}`
          }));
        setRows(initialRows);
      })
      .catch((error) => console.error(error));

    axios
      .get("/features")
      .then((response) => {
        setFeatures(response.data)
      })
      .catch((error) => console.error(error));

    axios
      .get("/pages")
      .then((response) => {
        setAdditionalPages(response.data)
      })
      .catch((error) => console.error(error));

  }, [userInfo, navigate]);

  if (!userInfo || userInfo.email !== "admin") {
    return null;
  }

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows); // You need to manage rows state using React.useState or Redux, etc.
  };

  const columns = [
    { field: "id", headerName: "userId", width: 100 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "activity", headerName: "Last seen", width: 170 },
    {
      field: "delete",
      headerName: "Delete User",
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              handleDeleteRow(params.row.id)
              handleDelete(params.row.id)
            }}
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "20px" }}>
            Delete
          </Button>

        );
      },
    },
  ];

  const handleDeleteFeature = () => {
    axios
      .post("/updatefeatures", { id: 1 })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  const handleSuffixFeature = () => {
    axios
      .post("/updatefeatures", { id: 2 })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  const handleContactPage = () => {
    axios
      .post("/updatepages", { id: 1 })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

  }
  const handleBetsPage = () => {
    axios
      .post("/updatepages", { id: 2 })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }


  return (
    <div className="admin" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="logout" style={{ position: "absolute", top: 0, left: 0, padding: "16px" }}>
        <LogOutButton />
      </div>
      <div className="users"
        style={{
          marginTop: "85px",
          marginBottom: "20px",
          width: "100%", // Take up full width
          maxWidth: "1000px", // Set maximum width
          padding: "0 16px", // Add padding for responsiveness
          boxSizing: "border-box", // Include padding in the width
        }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5} // Show less rows on smaller screens
          autoHeight // Automatically adjust height
        />
      </div>
      <div
        className="features"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          width: "100%", // Take up full width
          maxWidth: "500px", // Set maximum width
          padding: "0 16px", // Add padding for responsiveness
          boxSizing: "border-box", // Include padding in the width
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardHeader title="Features" />
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
                onClick={handleDeleteFeature}
                control={<FollowingSwitch defaultChecked={features.deleteFeature} />}
                label="Delete Post"
              />
              <FormControlLabel
                onClick={handleSuffixFeature}
                control={<FollowingSwitch defaultChecked={features.suffixFeature} />}
                label="Suffix Search"
              />
            </div>
          </CardActions>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardHeader title="Additional pages" />
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
                onClick={handleContactPage}
                control={<FollowingSwitch defaultChecked={additionalPages.contactPage} />}
                label="Contact page"
              />
              <FormControlLabel
                onClick={handleBetsPage}
                control={<FollowingSwitch defaultChecked={additionalPages.betsPage} />}
                label="Bets page"
              />
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Admin;

