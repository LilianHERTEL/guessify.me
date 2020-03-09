import React from 'react';
import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import banner from '../../images/banner.png';
import './style.css';
import GuestView from './GuestView';
import UserView from './UserView';

/*
 * HomePage component
 *
 * This is the first thing users see of our App, at the '/' route
 */
const HomePage = (props) => {
  const [user, setUser] = useState(null);

  return (
    <React.Fragment>
      <main className="maindiv">
        <div>
          <img
            id="banner"
            title="This is our awesome banner ! Cool huh ?"
            src={banner}
            style={{ marginLeft: 125 }}
          />
        </div>
        <Paper className="paper">
          {user ? (
            <UserView user={user} />
          ) : (
            <GuestView onLogin={user => setUser(user)} />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default HomePage;