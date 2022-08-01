import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"

export default function SingleShip() {
  const [singleShip, setSingleShip] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleShip = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/ships/${id}`)
      const data = await res.json()
      setSingleShip(data)
    }

    fetchSingleShip()
  }, [id])

  return (
    <>
      {!singleShip ? (
        <Loading />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className="heading">{singleShip.name}</h1>

            {singleShip.year_built ? (
              <h2 className="text-3xl text-white font-bold opacity-75 my-5">
                Built in {singleShip.year_built}
              </h2>
            ) : (
              ""
            )}

            <ul className="text-white opacity-75 text-sm flex flex-col items-start justify-start gap-3 mt-8">
              {singleShip.mass_kg ? (
                <li>{singleShip.mass_kg}</li>
              ) : (
                <li>Mass in kg is not indicated</li>
              )}
              {singleShip.mass_lbs ? (
                <li>{singleShip.mass_lbs}</li>
              ) : (
                <li>Mass in lbs is not indicated</li>
              )}
              <li>{singleShip.launches.length} launches</li>
              <li>Type: {singleShip.type}</li>
              {singleShip.status ? (
                <li className="text-emerald-500">Active</li>
              ) : (
                <li className="text-rose-500">Inactive</li>
              )}
              <li>Home port: {singleShip.home_port}</li>
            </ul>

            <ul className="mt-8 flex items-center justify-start gap-3">
              <li>
                <a
                  href={singleShip.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Read More &rarr;
                </a>
              </li>
              <li>
                <Link
                  to="/ships"
                  className="text-sm opacity-75 text-white hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            {singleShip.image ? (
              <img
                src={singleShip.image}
                alt={singleShip.name}
                className="h-full object-cover"
              />
            ) : (
              <img
                src="https://i.imgur.com/woCxpkj.jpg"
                alt={singleShip.name}
                className="h-full object-cover"
              />
            )}
          </article>
        </section>
      )}
    </>
  )
}
