import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

const RelatedDoctors = () => {
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDoc] = useState([]);

  return (
    <div>

    </div>
  );
};

export default RelatedDoctors;
