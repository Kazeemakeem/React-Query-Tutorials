import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = (pageNum) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNum}`);
};

const PaginatedQueriesPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["colors", pageNum],
    () => fetchColors(pageNum),
    {
      // keep current page data until next page data arrives to prevent layout shift
      keepPreviousData: true,
    }
  );
  if (isLoading) {
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
      <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
        Previous
      </button>
      <button onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === 4}>
        Next
      </button>
      {isFetching && <p>Loading...</p>}
    </>
  );
};

export default PaginatedQueriesPage;
