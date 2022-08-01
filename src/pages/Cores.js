import { useState, useEffect } from "react"
import { Loading } from "../components"

export default function Cores() {
  const [cores, setCores] = useState([])

  useEffect(() => {
    const fetchCores = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/cores")
      const data = await res.json()
      setCores(data)
    }

    fetchCores()
  }, [])

  return (
    <>
      {!cores ? (
        <Loading />
      ) : (
        <section className="py-32">
          <h1 className="heading text-center mb-10">Cores</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {cores.map(
              ({
                id,
                status,
                serial,
                launches,
                last_update,
                asds_landings,
                rtls_landings,
                reuse_count,
              }) => (
                <article key={id} className="articles">
                  <h2 className="font-bold text-xl mb-5">{serial}</h2>

                  <ul>
                    <li className="mb-1">Reused {reuse_count} times</li>
                    <li className="mb-1">{launches.length} launches</li>
                    <li className="mb-1">{asds_landings} ASDS landings</li>
                    <li className="mb-1">{rtls_landings} RTLS landings</li>
                    {status === "active" ? (
                      <li className="text-emerald-500">Active</li>
                    ) : (
                      <li className="text-rose-500 capitalize">{status}</li>
                    )}
                  </ul>

                  <p className="mt-5 opacity-75">{last_update}</p>
                </article>
              )
            )}
          </div>
        </section>
      )}
    </>
  )
}
