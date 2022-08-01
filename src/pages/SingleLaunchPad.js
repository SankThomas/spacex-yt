import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"

export default function SingleLaunchPad() {
  const [singleLaunchpad, setSingleLaunchPad] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLaunchPad = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${id}`)
      const data = await res.json()
      setSingleLaunchPad(data)
    }

    fetchSingleLaunchPad()
  }, [id])

  return (
    <>
      {!singleLaunchpad ? (
        <Loading />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className="heading">{singleLaunchpad.full_name}</h1>
            <h2 className="text-white text-2xl opacity-75 font-bold mt-2">
              {singleLaunchpad.name}
            </h2>

            <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <ul className="text-white opacity-75 text-sm flex flex-col items-start justify-start gap-3">
                <li>{singleLaunchpad.launch_attempts} Launch Attempts</li>
                <li>{singleLaunchpad.launch_successes} Successful Launches</li>
                {singleLaunchpad.status === "active" ? (
                  <li className="text-emerald-500 capitalize">
                    {singleLaunchpad.status}
                  </li>
                ) : (
                  <li className="text-rose-500 capitalize">
                    {singleLaunchpad.status}
                  </li>
                )}
              </ul>

              <ul className="text-white">
                <h3 className="text-white font-bold mb-1">Region</h3>
                <li className="text-sm opacity-75 mb-2">
                  Locality: {singleLaunchpad.locality}
                </li>
                <li className="text-sm opacity-75">
                  Region: {singleLaunchpad.region}
                </li>
              </ul>
            </div>

            <p className="text-white opacity-75 mb-10">
              {singleLaunchpad.details}
            </p>

            <ul>
              <li>
                <Link
                  to="/launchpads"
                  className="text-white opacity-75 text-sm hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img
              src={singleLaunchpad.images.large[0]}
              alt={singleLaunchpad.name}
              className="h-full object-cover"
            />
          </article>
        </section>
      )}
    </>
  )
}
