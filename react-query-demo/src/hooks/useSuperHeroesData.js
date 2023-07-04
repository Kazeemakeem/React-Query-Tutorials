import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
// import axios from "axios";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};
export const useSuperHeroesData = (onSuccess, onError, pollInterval) => {
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,
    // dynamic fetching with events config
    // {
    //   enabled: false, // disable autoFetching when comp mounts
    // },
    // cache and stale configuration
    {
      //   cacheTime: 50000, // actual default time for catching fetched data is 5 mins
      //   staleTime: 30000, // the duration for which data rendered becomes stale, catchedTime should be more than the staleTime ideally, default is 0s
      //   refetchOnMount: true, // default to true, data is refetched if stale when comp mounts, 'always' value triggers refetch when comp mounts whether data is stale or not
      //   refetchOnWindowFocus: true, // defaults to true. triggers refetch if stale when window loses focus and refocuses on the comp. Can take 'always'
      refetchInterval: pollInterval, // default false. Or take value in ms for which data is refetched. Refetching is paused when window loses focus. No background fetching.
      //   refetchIntervalInBackground: true, // triggers refetch in background
    },
    // side effects config
    {
      onSuccess,
      onError,
      // select: (data) => {
      //   const firstFourSuperHeroes = data?.data?.filter((hero) => hero.id < 5);
      //   return firstFourSuperHeroes;
      // }, // You can then map over data directly, all array methods apply
    }
  );
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes"); // There may be no need for network call again when the new data is returned by mutation
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    // ========= optimistic update ===========
    // performing updates before mutation with the hope nothing will go wrong and if anything goes wrong, it is covered.
    // run before mutation is fired
    onMutate: async (newHero) => {
      //prevent overwrite by any ongoing mutation
      await queryClient.cancelQueries("super-heroes");
      // keep this data for fallback in case mutation fails
      const prevHeroesData = queryClient.getQueryData("super-heroes");
      // update data even before mutation is fired
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        prevHeroesData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.prevHeroesData);
    },
    // runs if the mutation is successful or encounter an error
    onSettled: () => {
      // simply refetch the query
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
