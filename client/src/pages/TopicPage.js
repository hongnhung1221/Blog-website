
import { useParams } from "react-router-dom";
import HomePage from "./HomePage";

const TopicPage = ({ user }) => {
  const { id } = useParams();
  return (
    <>
      <HomePage category={id} user={user} />
    </>
  );
};

export default TopicPage;
