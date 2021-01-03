import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';


const MenuBar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { pathname } = useLocation();

  const handleItemClick = (e: React.MouseEvent, { name }: any) => {
    setActiveItem(name);
  }

  useEffect(() => {
    if(pathname !== '/') {
      setActiveItem(pathname.slice(1));
    }
  }, [pathname])

  return (
    <Menu pointing secondary size="huge" color="teal">
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        {/* <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleItemClick}
        /> */}
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  )
}

export default MenuBar;
