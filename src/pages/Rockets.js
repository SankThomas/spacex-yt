import useFetch from "../hooks/useFetch"
import { Loading } from "../components"
import { Link } from "react-router-dom"

export default function Rockets() {
  const [data] = useFetch("https://api.spacexdata.com/v4/rockets")

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">Rockets</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data.map(({ id, name, flickr_images, description }) => (
              <Link to={`/rockets/${id}`} key={id}>
                <article className="bg-zinc-900">
                  <img
                    src={flickr_images[0]}
                    alt={name}
                    className="h-64 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="font-bold text-white mb-3 text-lg">
                      {name}
                    </h2>
                    <p className="text-white opacity-75 mb-10">{`${description.substring(
                      0,
                      100
                    )}...`}</p>
                    <Link to={`/rockets/${id}`} className="btn">
                      Read More &rarr;
                    </Link>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
