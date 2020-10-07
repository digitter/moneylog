import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { editUser } from './modules/UserModule';
import { userSignout } from './services/UserService';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function ToggleSideBar() {
  const dispatch = useDispatch()

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const classes = useStyles();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSignoutClick = () => {
    userSignout()
      .then(() => {
        dispatch(editUser(null))
        window.location.href = '/'
      })
  }

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        {
          [
            { text: 'Asset', path: '/asset'},
            { text: 'Expenditure Logs', path: '/expenditure_logs' },
            { text: 'Income Logs', path: '/income_logs'},
            { text: 'Monthly Expenditure', path: '/monthly_expenditure'},
          ].map((obj, index) => (
            <div key={index}>
              <Link to={obj.path} style={{textDecoration: 'none', color: 'gray'}}>
                <ListItem button key={index}>
                  <ListItemText primary={obj.text} />
                </ListItem>
              </Link>
              <Divider />
            </div>
          ))
        }

        <ListItem button onClick={handleSignoutClick}>
          <ListItemText primary='Signout' />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <div>
      {/* {(['left', 'right', 'top', 'bottom'] as Anchor[]).map((anchor) => ( */}
      {(['left'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>

          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="default"
            onClick={toggleDrawer(anchor, true)}
          >
          <MenuIcon onClick={toggleDrawer(anchor, true)}></MenuIcon>
          </Button>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
