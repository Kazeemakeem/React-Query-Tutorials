import React from "react";
import useSuperHeroData from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { isLoading, data, error, isError, isFetching } =
    useSuperHeroData(heroId);

  const hero = data?.data;

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>SuperHero details</div>
      <h2>{hero.name}</h2>
      <p>{hero.alterEgo}</p>
    </>
  );
};

export default RQSuperHeroPage;
