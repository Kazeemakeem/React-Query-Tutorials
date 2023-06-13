import { useState } from "react";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const [pollInterval, setPollInterval] = useState(false);
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (data) => {
    //stop polling once data length equals 4
    if (data.data.length === 4) setPollInterval(false);
    console.log("Side effect upon success", data);
  };
  const onError = (error) => {
    if (error) setPollInterval(false);
    console.log("Side effect upon error", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError, pollInterval);

  const {
    mutate: addNewHero,
    isLoading: mutateLoading,
    isError: isMutateError,
    error: mutateError,
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const newHero = { name, alterEgo };
    addNewHero(newHero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div style={{ display: "flex" }}>
        <div>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          AlterEgo
          <input
            type="text"
            value={alterEgo}
            onChange={(e) => setAlterEgo(e.target.value)}
          />
        </div>
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.name}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};
