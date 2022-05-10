import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Tabbar from "../../components/app/Tabbar";

const Sorteados: NextPage = () => {
  return (
    <ChakraProvider>
      <div style={{ backgroundColor: "#132c54", height: "100vh" }}>
        <Head>
          <title>Sorteados | Mozão</title>
          <meta name="description" content="Mozão" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Tabbar />
        <Wrap
          m={0}
          style={{ backgroundColor: "#132c54", height: "100%" }}
          p="10px"
          w="100%"
        >
          <WrapItem w="100%" p="20px 20px 0px 20px">
            <Text color="#fff">Confira os últimos vencedores das rifas</Text>
          </WrapItem>
          <WrapItem p="10px 20px 10px 20px" w="100%">
            <Box
              w="100%"
              bg="#101F42"
              p="20px"
              borderRadius="20px"
              shadow="md"
              borderWidth="1px"
            >
              <Flex>
                <Center>
                  <Box w="80px" h="80px" bg="#fff" borderRadius="10px"></Box>
                </Center>
                <Stack paddingLeft="20px">
                  <Text
                    fontSize="17px"
                    fontWeight="bold"
                    color="#fff"
                  >
                    Nome da pessoa
                  </Text>
                  <Text fontSize="17px" color="#aaa">
                    Sorteio em 12/02
                  </Text>
                </Stack>
              </Flex>
            </Box>
          </WrapItem>

          <WrapItem p="10px 20px 10px 20px" w="100%">
            <Box
              w="100%"
              bg="#101F42"
              p="20px"
              borderRadius="20px"
              shadow="md"
              borderWidth="1px"
            >
              <Flex>
                <Center>
                  <Box w="80px" h="80px" bg="#fff" borderRadius="10px"></Box>
                </Center>
                <Stack paddingLeft="20px">
                  <Text
                    fontSize="17px"
                    fontWeight="bold"
                    color="#fff"
                  >
                    Nome da pessoa
                  </Text>
                  <Text fontSize="17px" color="#aaa">
                    Sorteio em 12/02
                  </Text>
                </Stack>
              </Flex>
            </Box>
          </WrapItem>
        </Wrap>
      </div>
    </ChakraProvider>
  );
};

export default Sorteados;
