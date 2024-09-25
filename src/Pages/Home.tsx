import { Grid, GridItem } from "@chakra-ui/react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Grid
      templateAreas={
         `"nav"
            "main"`}
      style={{overflow:'hidden'}}
    >
      <GridItem area={"nav"}>
        <Nav />
      </GridItem>
      <GridItem area={"main"}>
        <Outlet/>
      </GridItem>
    </Grid>
  );
};

export default Home;
