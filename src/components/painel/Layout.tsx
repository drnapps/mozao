import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import useAppData from "../../data/hooks/useAppData";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "../../styles/layout.module.css";

interface LayoutProps {
  children: any;
  title: string;
}

export default function Layout(props: LayoutProps) {
  const { theme, menu } = useAppData();
  return (
    <ChakraProvider>
      <Flex
        direction={["column", "column", "row"]}
        className={styles["bg" + theme]}
        w="100vw" h="100vh"
      >
        <Sidebar />
        <Box w={["100%"]} h={["100vh"]}>
          <Navbar />
          <Wrap className={styles["bg" + theme]} padding="0px 20px 20px 20px" w="100%" paddingLeft={menu !== 'none' ? '270px' : '20px'}>
            <WrapItem w="100%" className={styles["vers" + theme]}>
            <Heading fontSize="24px">
              {props.title}
            </Heading>
            </WrapItem>
            <WrapItem w="100%">
            <Spacer h="9px" />
            </WrapItem>
            <WrapItem w="100%">
              <Box w="100%" p="20px" borderRadius="10px" className={styles["box" + theme]}>
                {props.children}
              </Box>
            </WrapItem>
          </Wrap>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
