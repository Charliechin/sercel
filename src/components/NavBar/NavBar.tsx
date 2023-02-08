import React, { FC, useState } from "react";
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react'
import { INavBarProps, IMenuItemsProps } from '../../interfaces/INavBar'
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";


const MenuItems: FC<IMenuItemsProps> = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const NavBar = ({ authenticated, ...props }: INavBarProps) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { user, isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link to="/">
            Sercel Demo App
          </Link>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems><Link to="/game">Game</Link></MenuItems>
        <MenuItems><Link to="/rules">Rules</Link></MenuItems>
        <MenuItems><Link to="/upload-text">Add quote</Link></MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {isAuthenticated ?
          (
            <>
              <Text mb={2}>Hello {user.attributes.name}</Text>
              <Button bg="transparent" onClick={() => handleLogOut()} border="1px">
                Sign out
              </Button>
            </>
          )
          :
          (
            <Link to="/game">
              <Button bg="transparent" border="1px" >Sign in</Button>
            </Link>
          )
        }
      </Box>
    </Flex>
  );
};

export default NavBar;
