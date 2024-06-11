import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const LaunchDetails = ({ launch }) => {
  const [rocket, setRocket] = useState(null);
  const [launchpad, setLaunchpad] = useState(null);

  useEffect(() => {
    const fetchRocket = async () => {
      const response = await axios.get(
        `https://api.spacexdata.com/v4/rockets/${launch.rocket}`
      );
      setRocket(response.data);
    };

    const fetchLaunchpad = async () => {
      const response = await axios.get(
        `https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`
      );
      setLaunchpad(response.data);
    };

    fetchRocket();
    fetchLaunchpad();
  }, [launch]);

  if (!rocket || !launchpad) return <div>Loading...</div>;

  return (
    <Container className="p-4">
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h4" className="text-center mb-4 font-bold">
            {launch.name}
          </Typography>
          <Typography variant="body1" className="mb-2 font-medium">
            {launch.details}
          </Typography>
          <Grid container spacing={2} className="mb-4">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" className="font-bold">
                Rocket
              </Typography>
              <Typography variant="body1"><strong>Name:</strong> {rocket.name}</Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {rocket.description}
              </Typography>
              <Typography variant="body1"><strong>Mass:</strong> {rocket.mass.kg} kg</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="h6" className="font-bold">Rocket Picture</Typography>
              <CardMedia
                component="img"
                height="140"
                image={rocket.flickr_images[0]}
                alt={rocket.name}
                className="mb-4"
              />
              <CardMedia
                component="iframe"
                src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                height="200"
                title="YouTube video"
                className="mb-4"
              />
            </Grid>
          </Grid>
          <Typography variant="h6" className="font-bold">
            Launch Details
          </Typography>
          <Typography variant="body1">
            <span className="font-bold">Success:</span>{" "}
            {launch.success ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <span className="font-bold">Upcoming:</span>{" "}
            {launch.upcoming ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <span className="font-bold">Launch Date:</span>{" "}
            {new Date(launch.date_utc).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" className="mt-4 font-bold">
            Launch Pad
          </Typography>
          <Typography variant="body1">Name: {launchpad.name}</Typography>
          <Typography variant="body1">
            Location: {launchpad.locality}, {launchpad.region}
          </Typography>
          <Typography variant="body1">
            Coordinates: {launchpad.latitude}, {launchpad.longitude}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LaunchDetails;
