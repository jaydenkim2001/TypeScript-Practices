import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.action.hover,
  width: "90%",
  padding: 10,
  paddingLeft: "15px",
  marginTop: "15px",
  marginBottom: "100%",
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.background.default,
  borderRadius: 999,
  fontWeight: 700,
  padding: "10px",
  marginTop: "18px",
  marginBottom: 8,
  "&:hover": {
    backgroundColor: theme.palette.text.secondary,
  },
}));

const EmptyPlaylist = () => {
  return (
    <ContentBox>
      <Typography variant="h2" fontWeight={700}>
        {" "}
        Create your first playlist{" "}
      </Typography>
      <Typography variant="h2" fontWeight={80} marginTop={"3px"}>
        {" "}
        It's easy, we'll help you{" "}
      </Typography>
      <CreateButton>Create Playlist</CreateButton>
    </ContentBox>
  );
};

export default EmptyPlaylist;
