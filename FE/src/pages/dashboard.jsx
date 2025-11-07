/* eslint-disable no-unused-vars */

import { useCurrentUser } from "../hooks/useAuth";

const Dashboard = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <h1 className="text-center font-bold text-2xl">{currentUser?.name}</h1>
    </>
  );
};

export default Dashboard;
