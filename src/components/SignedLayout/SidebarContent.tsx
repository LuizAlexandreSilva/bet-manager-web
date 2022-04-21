import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Icon,
  Menu,
  MenuItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MouseEvent, ReactText, useCallback } from 'react';
import { IconType } from 'react-icons';
import { BsBank2, BsCardList, BsHouseDoorFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

type SidebarProps = {
  onClose: () => void;
} & BoxProps;

type LinkItemProps = {
  name: string;
  icon: IconType;
  route: string;
};

const LinkItems: Array<LinkItemProps> = [
  { name: 'Painel', icon: BsHouseDoorFill, route: '/dashboard' },
  { name: 'Apostas', icon: BsCardList, route: '/bets' },
  { name: 'Saques/Depósitos', icon: BsBank2, route: '/bank' },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  route: string;
  pathname: string;
}
const NavItem = ({
  icon,
  route,
  pathname,
  children,
  ...rest
}: NavItemProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (pathname === route) e.preventDefault();
      navigate(route);
    },
    [route, pathname, navigate],
  );

  return (
    <MenuItem onClick={(e) => handleClick(e)} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        w="100%"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Text as={route === pathname ? 'strong' : 'span'}>{children}</Text>
      </Flex>
    </MenuItem>
  );
};

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Menu>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            route={link.route}
            pathname={pathname}
          >
            {link.name}
          </NavItem>
        ))}
      </Menu>
    </Box>
  );
};
