import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
// this is relevant if you intend to query multiple changing number of items from the same endpoint. Parallel invoking of useQueries will not suffice when the number of items is unknown
const DynamicMultipleQueriesPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  const superHeroes = queryResults
    ?.map((result) => result)
    .map((item) => item?.data?.data);

  return (
    <>
      <h1>Dynamic Multiple Queries</h1>
      {superHeroes?.map((hero) => (
        <div key={hero?.id}>{hero?.name}</div>
      ))}
    </>
  );
};

export default DynamicMultipleQueriesPage;
