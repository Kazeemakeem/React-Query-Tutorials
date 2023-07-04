import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      // to ensure this is not fired on mount so that channelId is not undefined
      enabled: !!channelId,
    }
  );
  const userCourses = courses?.data.courses;

  // render jsx based on variables returned by useQuery

  return <div>Dependent Queries</div>;
};

export default DependentQueries;
