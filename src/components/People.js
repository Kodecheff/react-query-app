import React, {useState} from 'react'
import { useQuery } from 'react-query'
import Person from './Person'

const fetchPeople = async({queryKey}) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${queryKey[1]}`)
  return res.json()
}

function People() {
  const [page, setPage] = useState(1)
  const {data, status, isPreviousData}  = useQuery(['people', page], fetchPeople)
  console.log(data)
  return (
    <div>
      <h2>People</h2>
      {/* <p>{ status }</p> */}

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
            {data.results.map(person => <Person key={person.name} person={person} />)}
          </div>
        </>
      )}
    </div>
  )
}

export default People
