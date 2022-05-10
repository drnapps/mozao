import { Box, Divider, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { HiOutlineShoppingBag, HiUsers } from "react-icons/hi";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { BsBoxSeam, BsCreditCard, BsFillArrowLeftCircleFill, BsFillHandbagFill } from "react-icons/bs";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";
import useAppData from "../../data/hooks/useAppData";
import styles from "../../styles/layout.module.css";
import IndicacoesSidebar from "./IndicacoesSidebar";
import { FaTicketAlt, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";

export default function Sidebar() {
  const { theme, changeTheme, menu, changeMenu } = useAppData();
  return (
    <Flex
      w={["100%", "100%", "250px"]}
      h={["80px", "80px", "100vh"]}
      position="fixed"
      direction="column"
      className={styles['sidebar' + menu]}
    >
      <Box className={styles["box" + theme]} h={["90vh"]} boxShadow="lg">
        <Flex p="20px">
        <BsFillArrowLeftCircleFill onClick={changeMenu} style={{marginTop: "12px",marginRight: "10px"}} />
        <Logo />
        </Flex>
        <IndicacoesSidebar />
        <Stack padding="10px">
          <ItemMenu link="/painel" titulo="Dashboard" icon={<AiFillHome fontSize={20} />} />
          <ItemMenu link="/painel/rifas"
            titulo="Rifas"
            icon={<FaTicketAlt fontSize={20} />}
          />
          <ItemMenu link="/painel/indicadores" titulo="Indicadores" icon={<HiUsers fontSize={20} />} />
          <ItemMenu link="/painel/indicacoes" titulo="Indicações" icon={<GiReceiveMoney fontSize={20} />} />
          <ItemMenu link="/painel/pedidos"
            titulo="Pedidos"
            icon={<BsFillHandbagFill fontSize={20} />}
          />
          
          <ItemMenu link="/painel/configuracoes" titulo="Configurações" icon={<IoIosSettings fontSize={20} />} />
        </Stack>
      </Box>
      <Box className={styles["box" + theme]} p="20px" w="100%" h="10vh">
        <Flex style={{cursor: "pointer"}} onClick={changeTheme}>
          {theme === "light" && (<FaToggleOff style={{marginTop: "2px"}} />)}
          {theme === "dark" && (<FaToggleOn style={{marginTop: "2px"}} />)}
        <Text fontWeight="bold" paddingLeft="9px" fontSize="sm">Modo Dark</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
