import useFetch from "../hooks/useFetch"
import { Loading } from "../components"

export default function Payloads() {
  const [data] = useFetch("https://api.spacexdata.com/v4/payloads")

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <section className="py-32 max-width">
          <h1 className="heading text-center mb-10">Payloads</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {data.map(
              ({
                id,
                name,
                type,
                orbit,
                reference_system,
                manufacturers,
                customers,
              }) => (
                <article key={id} className="bg-stone-900 p-5 text-white">
                  <h2 className="font-bold mb-3">
                    {name}, <span className="opacity-75">{type}</span>
                  </h2>

                  <ul className="mb-3 opacity-75">
                    <li className="text-sm">Orbit: {orbit}</li>
                    <li className="text-sm">
                      Reference System: {reference_system}
                    </li>
                  </ul>

                  <ul className="mb-3">
                    <h3 className="font-bold mb-1">Manufacturers</h3>
                    {manufacturers.map((item, index) => (
                      <li key={index} className="opacity-75 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ul>
                    <h3 className="font-bold mb-1">Customers</h3>
                    {customers.map((item, index) => (
                      <li key={index} className="opacity-75 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            )}
          </div>
        </section>
      )}
    </>
  )
}
