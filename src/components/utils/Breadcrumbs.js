import React from "react";
import { useRouteMatch } from "react-router-dom";
import trunc from "../../utils/truncate";

// const Breadcrumbs = ({ crumbs }) => {
//     if (!crumbs || crumbs.length <= 1) {
//         return null
//     }

//     const currentRoute = {
//         color: '#afafaf',
//         fontSize: '.9em'
//     }
//     const previousRoute = {
//         paddingRight: 5,
//         fontSize: '.9em'
//     }

//     return (
// <div style={{ marginBottom: 5 }}>
//     {/* Link back to any previous steps of the breadcrumb. */}
//     {crumbs.map(({ name, path }, key) =>
//         key + 1 === crumbs.length
//         ? (<span key={key} style={currentRoute}>
//                 {name}
//             </span>)
//         : (<Link key={key} to={path} style={previousRoute}>
//                 {name} { '>' }
//             </Link>)
//     )}
// </div>
//     )
// }

const Breadcrumbs = ({
  user,
  photo,
  community,
  folder,
  topic,
  keepAllCrumbs,
}) => {
  const match = useRouteMatch();

  const routes = match.path
    .replace(":userId", user)
    .replace("fotos", `fotos de ${user}`)
    .replace(":photoId", photo ? trunc(photo, 30) : "")
    .replace(":communityId", community ? trunc(community, 30) : "")
    .replace(":folderId", folder ? folder : "album")
    .replace(":topicId", topic ? trunc(topic, 30) : "")
    .replace("/", "")
    .split("/");
  if (!keepAllCrumbs) {
    routes.shift(); // Removes perfil or comunidades
  }
  routes.unshift("home"); // Adds home to the front

  return (
    <div
      style={{
        fontSize: ".9em",
        color: "#afafaf",
        marginBottom: 5,
      }}
    >
      {routes.join(" > ")}
    </div>
  );
};

export default Breadcrumbs;
