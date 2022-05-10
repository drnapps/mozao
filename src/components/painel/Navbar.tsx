import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { UserDTO } from "../../data/dtos/UserDTO";
import useAppData from "../../data/hooks/useAppData";
import styles from '../../styles/layout.module.css';

export default function Navbar() {
  const { theme, changeMenu, menu } = useAppData();
  const [user, setUser] = useState<UserDTO>({});

  useEffect(() => {
    let readUser  = localStorage.getItem('user');
    readUser = JSON.parse(readUser!);
    setUser(readUser as UserDTO);
  }, []);

  return (
    <Box w={["100%"]} h={["80px"]}>
      <Box className={styles['box' + theme]} p="15px" boxShadow="md">
        <Flex justifyContent="space-between">
          <Box marginLeft={menu !== 'none' ? '270px' : '20px'} style={{cursor: "pointer"}} onClick={changeMenu}>
          <GiHamburgerMenu fontSize={20} />
          </Box>
          <Flex>
            <Text paddingRight="10px">
             {user.name}
            </Text>
            <Box paddingTop="4px">
              <RiLogoutCircleRLine />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
