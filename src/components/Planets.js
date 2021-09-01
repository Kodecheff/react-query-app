import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async({queryKey}) => {
  console.log(queryKey[1])
  const res = await fetch(`http://swapi.dev/api/planets/?page=${queryKey[1]}`)
  return res.json()
}

function Planets() {

  const [page, setPage] = useState(1)
  const {data, status, isPreviousData}  = useQuery(['planets', page], fetchPlanets)
  console.log(data)
  return (
    <div>
      <h2>Planets</h2>

      { status === 'error' && (
        <div>Error fetching data</div>
      )}

      { status === 'loading' && (
        <div>Loading data...</div>
      )}

      { status === 'success' && (
        <>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous page
        </button>
          {page}
        <button
          onClick={() => setPage(old => Math.max(old + 1, 1))}
          disabled={isPreviousData || !data?.next}
        >
          Next page
        </button>
        
          <div>
            {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
          </div>
        </>
      )}
    </div>
  )
}

export default Planets
