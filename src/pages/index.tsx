/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/link-passhref */
import {
  Box,
  Center,
  ChakraProvider,
  HStack,
  Skeleton,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { RaffleDTO } from "../data/dtos/RaffleDTO";
import { api } from "../lib/api";
import moment from "moment";
import Tabbar from "../components/app/Tabbar";
import Link from "next/link";

const Home: NextPage = () => {
  const [raffles, setRaffles] = useState<RaffleDTO[]>([]);

  useEffect(() => {
    api.get("/api/raffles/get").then((res) => setRaffles(res.data.content));
  }, []);

  return (
    <ChakraProvider>
      <div style={{ backgroundColor: "#132c54",minHeight: "100vh" }}>
      <Head>
        <title>Mozão</title>
        <meta name="description" content="Mozão" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabbar />
      <Center w="100%" p={["0px 0px 200px 0px", "0px 0px 200px 0px", "50px 30% 200px 30%"]}>
      <Wrap m={0} style={{ backgroundColor: "#132c54",height: "100%" }} p="10px" w="100%">
        <WrapItem w="100%">
          <Center w="100%">
            <Text fontSize="3xl" p="10px" color="white" fontWeight="bold">
              Mozão
            </Text>
          </Center>
        </WrapItem>
        <WrapItem w="100%" p="0px 20px 0px 20px">
          <Box w="100%" h="130px" borderRadius="20px" bg="gray"></Box>
        </WrapItem>
        <WrapItem w="100%" p="20px 20px 0px 20px">
          <Text fontWeight="bold" color="white">
            Rifas disponíveis
          </Text>
        </WrapItem>
        {raffles.length > 0 &&
          raffles?.map((item, index) => (
            <WrapItem  key={item.id} w="47%">
              <Center w="100%" p="10px">
                <Link
                  href={`/rifa/` + item.id}
                >
                  <Stack
                    w="100%"
                    bg="#0d2040"
                    color="#fff"
                    p="15px"
                    borderRadius="10px"
                  >
                    <img
                      src={item.path}
                      width="100%"
                      style={{ borderRadius: "15px" }}
                    />
                      <Text fontWeight="bold" isTruncated>{item.name}</Text>
                      <Text fontSize="12px">Sorteio em {moment(item.datetime).format("DD/MM")}</Text>
                      <Text fontSize="25" fontWeight="bold" textAlign="right">R$ {item.price?.toFixed(2).replace(".",",")} </Text>
                  </Stack>
                </Link>
              </Center>
            </WrapItem>
          ))}
      </Wrap>
      </Center>
    </div>
    </ChakraProvider>
  );
};

export default Home;