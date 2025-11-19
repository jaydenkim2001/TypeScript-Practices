import { Typography } from "@mui/material";
import React from "react";

interface AlbumCardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const AlbumCard = ({ name, image, artistName }: AlbumCardProps) => {
  return (
    <div>
      <img src={image} />
      <Typography>{name}</Typography>
      <Typography>{artistName}</Typography>
    </div>
  );
};

export default AlbumCard;
