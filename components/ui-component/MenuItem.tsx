import React, { useContext } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Store } from '../Store';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: string | any;
};

export default function UserIdentity({ name = '' }: Props) {
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT', payload: undefined });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
    signOut();
  };
  return (
    <>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {name || ''}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
}
