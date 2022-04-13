import React, {useEffect, useState} from "react";
import {Routes, Route, NavLink} from "react-router-dom";
import FirstName from "./FirstName";
import LastName from "./LastName";

function About() {
  const [isLoaded, setLoaded] = useState(false);
  const [userData, setUser] = useState({});
  console.log(userData);

  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then((r) => r.json())
      .then((data) => {
        setUser(data[0]);
        setLoaded(true);
      });
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <>
      <NavLink to="first">First Name</NavLink>
      <NavLink to="last">Last Name</NavLink>
      <Routes>
        <Route
          path="first"
          element={<FirstName name={userData.firstname} />}
        />
        <Route
          path="last"
          element={<LastName name={userData.lastname} />}
        />
      </Routes>
    </>
  )
}

export default About;