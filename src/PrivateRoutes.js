import React, { useState } from "react";
import "./styles/App.css";
import { Wrapper, Container, MainContainer } from "./styles/layout";

import { Switch, Route } from "react-router-dom";

import Drawer from "./components/Drawer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HomeMobile from "./pages/HomeMobile";
import ProfileRoute from "./pages/ProfileRoute";
import ProfileRouteMobile from "./pages/ProfileRouteMobile";
import CommunityRoute from "./pages/CommunityRoute";
import CommunityRouteMobile from "./pages/CommunityRouteMobile";
import CreateCommunity from "./pages/CreateCommunity";
import Config from "./components/Config";
import ConfigMobile from "./components/ConfigMobile";

import Error404 from "./pages/404Error";

import ResponsiveLayout from "./components/ResponsiveLayout";

const PrivateRoutes = ({ data, logout }) => {
  const [configOpen, setConfigOpen] = useState(false);
  const toggleConfig = () => {
    const body = document.querySelector("body");
    if (configOpen) {
      body.style.overflow = "";
      setConfigOpen(false);
    } else {
      body.style.overflow = "hidden";
      setConfigOpen(true);
    }
  };
  return (
    <Wrapper>
      <Navbar
        loggedUser={data.findUser}
        logout={logout}
        toggleConfig={toggleConfig}
      />
      <MainContainer id="menu-content-wrapper">
        <Drawer
          loggedUser={data.findUser}
          logout={logout}
          toggleConfig={toggleConfig}
        />
        <ResponsiveLayout
          breakpoint={776}
          renderDesktop={() => (
            <Config
              loggedUser={data.findUser}
              configOpen={configOpen}
              setConfigOpen={setConfigOpen}
              toggleConfig={toggleConfig}
            />
          )}
          renderMobile={() => (
            <ConfigMobile
              loggedUser={data.findUser}
              configOpen={configOpen}
              setConfigOpen={setConfigOpen}
              toggleConfig={toggleConfig}
            />
          )}
        />

        <Container id="main-content" main>
          <Switch>
            <Route path="/perfil/:userId">
              <ResponsiveLayout
                breakpoint={776}
                renderDesktop={() => (
                  <ProfileRoute loggedUser={data.findUser} />
                )}
                renderMobile={() => (
                  <ProfileRouteMobile loggedUser={data.findUser} />
                )}
              />
            </Route>

            <Route path="/comunidades/:communityId">
              <ResponsiveLayout
                breakpoint={776}
                renderDesktop={() => (
                  <CommunityRoute loggedUser={data.findUser} />
                )}
                renderMobile={() => (
                  <CommunityRouteMobile loggedUser={data.findUser} />
                )}
              />
            </Route>

            <Route path="/criar-comunidade">
              <ResponsiveLayout
                breakpoint={776}
                renderDesktop={() => (
                  <CreateCommunity loggedUser={data.findUser} />
                )}
                renderMobile={() => (
                  <CreateCommunity loggedUser={data.findUser} mobile={true} />
                )}
              />
            </Route>

            <Route exact path="/">
              <ResponsiveLayout
                breakpoint={776}
                renderDesktop={() => <Home loggedUser={data.findUser} />}
                renderMobile={() => <HomeMobile loggedUser={data.findUser} />}
              />
            </Route>

            <Route path="*">
              <ResponsiveLayout
                breakpoint={776}
                renderDesktop={() => <Error404 />}
                renderMobile={() => <h1>404 - Página não encontrada</h1>}
              />
            </Route>
          </Switch>
        </Container>
      </MainContainer>
      <Footer />
    </Wrapper>
  );
};

export default PrivateRoutes;
