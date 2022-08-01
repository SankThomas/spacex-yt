import { useState } from "react"
import useFetch from "../hooks/useFetch"
import { Loading } from "../components"
import { format } from "date-fns"

export default function Roadster() {
  const [data] = useFetch("https://api.spacexdata.com/v4/roadster")
  const [value, setValue] = useState(0)

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">
            Elon Musk's Tesla Roadster
          </h1>

          <div>
            <article>
              <div className="flex flex-col">
                <img
                  src={data.flickr_images[value]}
                  alt="Elon Musk's Tesla Roadster"
                />

                <ul className="flex items-center justify-start gap-3 flex-wrap my-5">
                  {data.flickr_images.map((image, index) => (
                    <li
                      key={index}
                      onClick={() => setValue(index)}
                      className={`cursor-pointer bg-white ${
                        value === index && "p-1"
                      }`}
                    >
                      <img
                        src={image}
                        alt="Elon Musk's Tesla Roadster"
                        className="w-20"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-white opacity-75">{data.details}</p>

                <ul className="text-white opacity-75 text-sm mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:mt-10">
                  <li>
                    Launch Date:{" "}
                    {format(new Date(data.launch_date_utc), "dd MMMM yyyy")}
                  </li>
                  <li>Launch Mass: {data.launch_mass_kg} kg</li>
                  <li>
                    Days Since Launch: {Math.floor(data.period_days)} days
                  </li>
                  <li>Speed: {Math.floor(data.speed_kph)} kph</li>
                  <li>
                    Distance From The Earth:{" "}
                    {data.earth_distance_km.toLocaleString()}
                    km
                  </li>
                  <li>
                    <a
                      href={data.wikipedia}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Wikipedia
                    </a>
                  </li>
                  <li>
                    <a
                      href={data.video}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      YouTube Video
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  )
}
