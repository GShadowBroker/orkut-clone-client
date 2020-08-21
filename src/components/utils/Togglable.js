import React, { useState } from "react";

import { FakeLink } from "../../styles/layout";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const Togglable = ({ children, viewLabel, hideLabel }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <div>
      {showContent ? (
        <FakeLink onClick={() => setShowContent(false)}>
          {hideLabel} <TiArrowSortedUp className="icenter" />
        </FakeLink>
      ) : (
        <FakeLink onClick={() => setShowContent(true)}>
          {viewLabel} <TiArrowSortedDown className="icenter" />
        </FakeLink>
      )}
      {showContent && <div>{children}</div>}
    </div>
  );
};

Togglable.defaultProps = {
  viewLabel: "mostrar",
  hideLabel: "ocultar",
};

export default Togglable;
