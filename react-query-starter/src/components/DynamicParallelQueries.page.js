import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = (comboId) => {
  return axios.get(`http://localhost:4000/superheroes/${comboId}`);
};
const fetchFriend = (comboId) => {
  return axios.get(`http://localhost:4000/friends/${comboId}`);
};

const DynamicParallelQueriesPage = () => {
  const { comboId } = useParams();
  console.log(comboId);
  const { data: superHero } = useQuery(["super-heroes", comboId], () =>
    fetchSuperHero(comboId)
  );
  const { data: friend } = useQuery(["friends", comboId], () =>
    fetchFriend(comboId)
  );

  return (
    <>
      <h1>Dynamic Parallel Queries</h1>
      <p>{friend?.data.name}</p>
      <p>{superHero?.data.name}</p>
    </>
  );
};

export default DynamicParallelQueriesPage;
