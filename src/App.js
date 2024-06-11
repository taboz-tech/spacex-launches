import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import LaunchList from "./components/Launchlist";
import LaunchDetails from "./components/LaunchDetails";

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      const result = await axios.get("https://api.spacexdata.com/v4/launches");
      setLaunches(result.data);
    };

    fetchLaunches();
  }, []);

  return (
    <Container>
      <Typography variant="h2" className="text-center my-8">
        SpaceX Launches
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LaunchList
            launches={launches}
            setSelectedLaunch={setSelectedLaunch}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {selectedLaunch && <LaunchDetails launch={selectedLaunch} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
