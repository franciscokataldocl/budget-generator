import Lottie from "lottie-react";

import animationData from "./animation/73309-finance-blue.json";

import React from 'react'

const Animation = () => {
  return (
    <>
        <Lottie animationData={animationData} loop={true} />
    </>
  )
}

export default Animation