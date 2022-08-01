import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom"
import { Loading } from "../components"

export default function Ships() {
  const [data] = useFetch("https://api.spacexdata.com/v4/ships")

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">Ships</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data.map(({ id, image, name, home_port }) => (
              <Link to={`/ships/${id}`} key={id}>
                <article className="bg-zinc-900">
                  {image ? (
                    <img src={image} alt={name} className="h-64 object-cover" />
                  ) : (
                    <img
                      src="https://i.imgur.com/woCxpkj.jpg"
                      alt={name}
                      className="h-64 object-cover"
                    />
                  )}

                  <div className="p-5">
                    <h2 className="text-white text-lg mb-3 font-bold">
                      {name}
                    </h2>
                    <p className="text-white opacity-75 mb-10">{home_port}</p>
                    <Link to={`/ships/${id}`} className="btn">
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
