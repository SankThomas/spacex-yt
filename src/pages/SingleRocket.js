import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"

export default function SingleRocket() {
  const [singleRocket, setSingleRocket] = useState(null)
  const [imperial, setImperial] = useState(false)
  const [value, setValue] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleRocket = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      const data = await res.json()
      setSingleRocket(data)
    }

    fetchSingleRocket()
  }, [id])

  return (
    <>
      {!singleRocket ? (
        <Loading />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className="heading">{singleRocket.name}</h1>

            <h2 className="capitalize text-3xl opacity-75 mt-2 text-white font-bold">
              Type: {singleRocket.type}
            </h2>
            <h2 className="text-3xl opacity-75 mt-2 text-white font-bold mb-8">
              First Flight Date: {singleRocket.first_flight}
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-white opacity-75">
              <ul>
                <li>
                  Cost per launch:{" "}
                  {singleRocket.cost_per_launch.toLocaleString()} USD
                </li>
                <li>Company: {singleRocket.company}</li>
                <li>Success Rate: {singleRocket.success_rate_pct}%</li>
                {singleRocket.active ? (
                  <li className="text-emerald-500">Active</li>
                ) : (
                  <li className="text-rose-500">Inactive</li>
                )}
              </ul>

              <ul>
                <li>Country: {singleRocket.country}</li>
                <li>Stages: {singleRocket.stages}</li>
                {!imperial && (
                  <>
                    <li>Height: {singleRocket.height.meters}m</li>
                    <li>Diameter: {singleRocket.diameter.meters}m</li>
                    <li>Mass: {singleRocket.mass.kg.toLocaleString()}kg</li>
                  </>
                )}

                {imperial && (
                  <>
                    <li>Height: {singleRocket.height.feet}ft</li>
                    <li>Diameter: {singleRocket.diameter.feet}ft</li>
                    <li>Mass: {singleRocket.mass.lb.toLocaleString()}lb</li>
                  </>
                )}
              </ul>
            </div>

            <p className="text-white opacity-75 mt-5">
              {singleRocket.description}
            </p>

            <ul className="flex items-center justify-start gap-3 mt-5">
              <li>
                <a
                  href={singleRocket.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <button onClick={() => setImperial(!imperial)} className="btn">
                  {imperial ? "Toggle Metric Units" : "Toggle Imperial Units"}
                </button>
              </li>
              <li>
                <Link
                  to="/rockets"
                  className="text-white opacity-75 text-sm hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img
              src={singleRocket.flickr_images[value]}
              alt={singleRocket.name}
              className="h-full object-cover"
            />

            <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
              {singleRocket.flickr_images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setValue(index)}
                  className={`cursor-pointer bg-white ${
                    index === value && "p-1"
                  }`}
                >
                  <img src={image} alt={singleRocket.name} className="w-20" />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  )
}
