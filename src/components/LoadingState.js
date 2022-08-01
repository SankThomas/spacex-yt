import React from "react"

export default function LoadingState() {
  return (
    <>
      <div className="spinner">
        <article></article>
        <p className="text-white opacity-75 mt-5">
          The spinny thingy means it's loading
        </p>
      </div>
    </>
  )
}
