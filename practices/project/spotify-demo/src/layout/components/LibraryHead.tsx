import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import EmptyPlaylist from "./EmptyPlaylist";

const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginLeft: "60px",
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const LibraryHead = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <BookmarkIcon />
      <Typography
        variant="h2"
        fontWeight={700}
        sx={{ transform: "translateY(1px)" }}
      >
        Your Playlist
      </Typography>
      <StyledAddIcon />
    </Box>
    
  );
};

export default LibraryHead;
