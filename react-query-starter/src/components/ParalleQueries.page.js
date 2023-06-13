import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParalleQueriesPage = () => {
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  return (
    <div>
      <h1>Super Heroes</h1>
      {superHeroes?.data.map((hero) => (
        <p key={hero.id}>
          <Link to={`/rq-parallel/${hero.id}`}>{hero.name}</Link>
        </p>
      ))}
      <h1>Friends</h1>
      {friends?.data.map((friend) => (
        <p key={friend.id}>
          <Link to={`/rq-parallel/${friend.id}`}>{friend.name}</Link>
        </p>
      ))}
    </div>
  );
};

export default ParalleQueriesPage;
