import React from 'react';

import FriendList from '../components/FriendList';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Navigate, useParams } from 'react-router-dom';
import ThoughtForm from '../components/ThoughtForm';
import ProfPic from '../components/ProfPic';

const Profile = () => {
  const { username: userParam } = useParams();

  const [addFriend] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  return <Navigate to="/profile" />;
}

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">

  {userParam && (
  <button className="btn ml-auto" onClick={handleClick}>
    Add Friend
  </button>
)}
</div>

      <div className="flex-row justify-space-between mb-3">
  <div className="col-12 mb-3 col-lg-8">
    <ThoughtList thoughts={user.thoughts} title={`Posts`} />
  </div>

  <div className="col-12 col-lg-3 mb-3">
  <h2 className="bg-dark text-secondary p-3 display-inline-block">
    {user.username}
  </h2>
  <ProfPic />

    <FriendList
      username={user.username}
      friendCount={user.friendCount}
      friends={user.friends}
    />
  </div>
</div>
<div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
