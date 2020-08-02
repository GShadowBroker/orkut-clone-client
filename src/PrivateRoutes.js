import React from 'react'
import './styles/App.css'
import { Wrapper, Container } from './styles/layout'

import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
// import Profile from './pages/Profile'
// import Scraps from './pages/Scraps'
// import Photos from './pages/Photos'
// import Photo from './components/Photo'
// import Communities from './pages/Communities'
// import Community from './pages/Community'
// import Topic from './pages/Topic'

import ProfileRoute from './pages/ProfileRoute'
import CommunityRoute from  './pages/CommunityRoute'

import Error404 from './pages/404Error'

import ResponsiveLayout from './components/ResponsiveLayout'

const PrivateRoutes = ({ data, logout }) => {
    // const routes = [
    //     { path: "/", name: "Home", Component: Home },
    //     { path: "/perfil/:userId", name: "Perfil", Component: Profile },
    //     { path: "/perfil/:userId/scraps", name: "Scraps", Component: Scraps },
    //     { path: "/perfil/:userId/fotos", name: "Fotos", Component: Photos },
    //     { path: "/perfil/:userId/fotos/:photoId", name: "Foto", Component: Photo },
    //     { path: "/perfil/:userId/comunidades", name: "Comunidades", Component: Communities },
    //     { path: "/comunidades/:communityId", name: "Comunidade", Component: CommunityRoute},
    //     { path: "/comunidades/:communityId/forum/:topicId", name: "Tópico", Component: Topic}
    // ]

    return (
        <Wrapper>
            <Navbar loggedUser={ data.findUser } logout={ logout } />
            <Container main>
                <Switch>
                    {/* {
                        routes.map(({ path, Component }, key) => (
                            <Route exact path={ path } key={ key } component={props => {
                                const crumbs = routes
                                    .filter(({ path }) => props.match.path.includes(path))
                                    .map(({ path, ...rest }) => ({
                                        path: Object.keys(props.match.params).length
                                            ? Object.keys(props.match.params).reduce(
                                                (path, param) => path.replace(
                                                    `:${param}`, props.match.params[param]
                                                ), path)
                                            : path,
                                        ...rest
                                    }));

                                return (
                                    <ResponsiveLayout
                                        breakpoint={ 776 }
                                        renderDesktop={ () => (
                                            <Component {...props} loggedUser={ data.findUser } crumbs={ crumbs } />
                                        ) }
                                        renderMobile={ () => (
                                            <h1>Mobile view!</h1>
                                        ) }
                                    />
                                )
                            }} />
                        ))
                    } */}
                    <Route path="/perfil/:userId">
                        <ResponsiveLayout
                            breakpoint={ 776 }
                            renderDesktop={ () => (
                                <ProfileRoute loggedUser={data.findUser} />
                            ) }
                            renderMobile={ () => (
                                <h1>Mobile Profile</h1>
                            ) }
                        />
                    </Route>

                    <Route path="/comunidades/:communityId">
                        <ResponsiveLayout 
                            breakpoint={ 776 }
                            renderDesktop={ () => (
                                <CommunityRoute loggedUser={data.findUser} />
                            ) }
                            renderMobile={ () => (
                                <h1>Community Mobile</h1>
                            ) }
                        />
                    </Route>

                    <Route exact path="/">
                        <ResponsiveLayout 
                            breakpoint={ 776 }
                            renderDesktop={ () => (
                                <Home loggedUser={data.findUser} />
                            ) }
                            renderMobile={ () => (
                                <h1>Home Mobile</h1>
                            ) }
                        />
                    </Route>

                    <Route path="*">
                        <ResponsiveLayout 
                            breakpoint={ 776 }
                            renderDesktop={ () => (
                                <Error404 />
                            ) }
                            renderMobile={ () => (
                                <h1>404 Error Mobile</h1>
                            ) }
                        />
                    </Route>
                </Switch>
            </Container>
            <Footer />
        </Wrapper>
    )
}

export default PrivateRoutes