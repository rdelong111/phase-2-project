import React from "react";

function Home({user}) {
  console.log(user)
  return <h1>{`${user} is logged in`}</h1>
}

export default Home;