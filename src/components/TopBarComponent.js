import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function TopBarComponent() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={handleClick}>
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBarComponent;
