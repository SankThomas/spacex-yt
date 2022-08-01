import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"

export default function SingleLandPads() {
  const [singleLandPad, setSingleLandPad] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLandPad = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/landpads/${id}`)
      const data = await res.json()
      setSingleLandPad(data)
    }

    fetchSingleLandPad()
  }, [id])

  return (
    <>
      {!singleLandPad ? (
        <Loading />
      ) : (
        <section className="py-32 max-width flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
          <article>
            <h1 className="heading">{singleLandPad.full_name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 text-white mt-2">
              {singleLandPad.name}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
              <ul className="flex flex-col items-start justify-start gap-3 text-white opacity-75 text-sm">
                <li>{singleLandPad.launches.length} launches</li>
                <li>{singleLandPad.landing_successes} successful landings</li>
                {singleLandPad.status === "active" ? (
                  <li className="text-emerald-500 capitalize">
                    {singleLandPad.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    {singleLandPad.status}
                  </li>
                )}
              </ul>

              <ul className="text-sm text-white">
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <li className="opacity-75 mb-3">
                  Locality: {singleLandPad.locality}
                </li>
                <li className="opacity-75">Region: {singleLandPad.region}</li>
              </ul>
            </div>

            <p className="text-white opacity-75 mt-10">
              {singleLandPad.details}
            </p>

            <ul className="flex items-center justify-start gap-3 mt-10">
              <li>
                <a
                  href={singleLandPad.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <Link
                  to="/landpads"
                  className="text-white text-sm opacity-75 hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img
              src={singleLandPad.images.large[0]}
              alt={singleLandPad.full_name}
              className="h-full"
            />
          </article>
        </section>
      )}
    </>
  )
}
