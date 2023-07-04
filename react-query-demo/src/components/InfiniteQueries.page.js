import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = (limit) => {
  return axios.get(`http://localhost:4000/colors?_limit=${limit}`);
};

const InfiniteQueriesPage = () => {
  const [limit, setLimit] = useState(2);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["colors", limit],
    () => fetchColors(limit)
  );
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h1>Paginated Queries</h1>
      {data?.data.map((color) => (
        <h2 key={color.id}>
          {color.id}. {color.label}
        </h2>
      ))}
      <button
        onClick={() => setLimit(limit + 2)}
        disabled={data.data.length === 8}
      >
        load more ...
      </button>
    </>
  );
};

export default InfiniteQueriesPage;
