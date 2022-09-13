import Lottie from "lottie-react";

import animationData from "./not-found.json";

import React from 'react'

const Animation = () => {
  return (
    <>
        <Lottie animationData={animationData} loop={true} />
    </>
  )
}

export default Animation