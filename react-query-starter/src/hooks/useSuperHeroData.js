import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  // onSuccess and onError parameters breaks code
  // { queryKey } can also be passed to the hook and assign const heroId = queryKey[1] and replace =>fn by fn name as 2nd arg
  // specify a third arg to set initial partial data from previous route
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId), {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          data: hero,
        };
      } else return undefined;
    },
  });
};

export default useSuperHeroData;
