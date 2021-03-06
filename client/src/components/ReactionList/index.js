import React from 'react';

import { Link } from 'react-router-dom';

import "./style.css";

const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3" id='realist'>
      <div className="card-header">
        <span className="text-light">Comments</span>
      </div>
      <div className="card-body">
        {reactions &&
          reactions.map(reaction => (
            <p className="pill mb-3"  key={reaction._id}>
              {reaction.reactionBody} <br /> {' '}
              <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 300, fontSize:15 }}>
                {reaction.username} on {reaction.createdAt}
              </Link>
            </p>
          ))}
</div>
    </div>
  );
};

export default ReactionList;
