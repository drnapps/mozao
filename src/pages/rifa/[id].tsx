/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  CircularProgress,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { RaffleDTO } from "../../data/dtos/RaffleDTO";
import { api } from "../../lib/api";
import moment from "moment";
import { OrderDTO } from "../../data/dtos/OrderDTO";

const Rifa: NextPage = (props: any) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState<Partial<RaffleDTO>>({});
  const [orders, setOrders] = useState<Partial<OrderDTO[]>>();
  const [selecionado, setSelecionado] = useState<number[]>([]);
  const [openDraw, setOpenDraw] = useState(false);
  const [price, setPrice] = useState<number>(0);
  var wrapNumeros: any[] = [];
  let numeros: number[] = [];
  let { isOpen, onClose } = useDisclosure();

  useEffect(() => {
    api
      .get("/api/raffles/get/" + props.id)
      .then((r) => {
        setData(r.data.content);
        console.log(r.data.content);
        setPrice(r.data.content.price);
        setOrders(r.data.content.order);
      })
      .catch((err) => {});
  }, []);

  const handleSelect = (id: any, ev: any) => {
    if (selecionado.includes(id)) {
      setSelecionado(selecionado.filter((e) => e !== id));
      setOpenDraw(false);
    } else {
      setSelecionado((selecionado) => [...selecionado, id]);
      setOpenDraw(true);
      const v = data ? data.price : 0;
      const calc = Number(selecionado.length + 1) * Number(v);
      console.log(price);
      setPrice(calc);
    }
  };

  const handleUser = () => {
    const indicador = localStorage.getItem("indicador");
    const obj = {
      raffle: data,
      numbers: selecionado,
      indicador,
    };
    localStorage.setItem("mozaoorder", JSON.stringify(obj));
    router.push("/conta");
  };

  function renderNumbers(numbers: number[]) {
    for (let i = 1; i < Number(data.quantity) + 1; i++) {
      if (numbers.includes(i)) {
        wrapNumeros.push(
          <WrapItem key={i}>
            <Text
              fontSize="md"
              w="40px"
              h="30px"
              borderRadius={5}
              textAlign="center"
              paddingTop={1}
              bg="#A2B6C1"
              fontWeight="bold"
              color="#fff"
            >
              {i}
            </Text>
          </WrapItem>
        );
      } else {
        wrapNumeros.push(
          <WrapItem onClick={(ev) => handleSelect(i, ev)} key={i}>
            <Text
              fontSize="md"
              w="40px"
              h="30px"
              fontWeight="bold"
              borderRadius={5}
              textAlign="center"
              paddingTop={1}
              bg={selecionado.includes(i) ? `#333` : `#E8ECEF`}
              color={selecionado.includes(i) ? `#fff` : `#aaa`}
            >
              {i}
            </Text>
          </WrapItem>
        );
      }
    }
  }

  orders?.map((p: any) => {
    numeros.push(p.number);
  });

  renderNumbers(numeros);

  const draw = openDraw && (
    <Drawer placement="bottom" onClose={onClose} isOpen={true}>
      <DrawerOverlay />
      <DrawerContent bg="#102042">
        <DrawerBody bg="#102042">
          <Flex>
            <Box>
              <Heading color="#fff">R$ {price}</Heading>
            </Box>
            <Box paddingLeft={2} paddingTop={1}>
              <Text fontSize="xs">
                / {selecionado.length} Rifa{selecionado.length > 1 ? "s" : ""}
              </Text>
            </Box>
            <Spacer />
            <Box paddingTop={1} paddingRight={2}>
              <IconButton
                aria-label="Mais rifas"
                onClick={() => setOpenDraw(false)}
                color="#fff"
                textColor={"#000"}
                size="sm"
                icon={<AiOutlinePlus />}
              ></IconButton>
            </Box>
            <Box paddingTop={1}>
              <Button
                onClick={handleUser}
                color="#fff"
                textColor={"#000"}
                size="sm"
              >
                <Text fontWeight={"bold"}>COMPRAR</Text>
              </Button>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <ChakraProvider>
      <div style={{ backgroundColor: "#132c54", minHeight: "100vh" }}>
        <Head>
          <title>Rifa | Mozão</title>
          <meta name="description" content="Mozão" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Center
          w="100%"
          p={["0px 0px 200px 0px", "0px 0px 200px 0px", "50px 30% 200px 30%"]}
        >
          {draw}
          {data.name && (
            <Wrap
              m={0}
              style={{ backgroundColor: "#132c54", minHeight: "100vh" }}
              p="10px"
              w="100%"
              justify={"center"}
            >
              <WrapItem p="10px" w="100%">
                <Link href="/" passHref>
                  <Flex>
                    <Center marginTop="15px">
                      <AiOutlineArrowLeft size={20} color="#fff" />
                    </Center>
                    <Stack paddingLeft="20px">
                      <Text fontSize="17px" fontWeight="bold" color="#fff">
                        Voltar para home
                      </Text>
                      <Text lineHeight="0px" fontSize="17px" color="#aaa">
                        ou escolha seu número abaixo
                      </Text>
                    </Stack>
                  </Flex>
                </Link>
              </WrapItem>
              <WrapItem p="10px 20px 0px 20px" w="100%">
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
                      <img
                        src={data.path}
                        width="80px"
                        height="80px"
                        style={{ borderRadius: "10px" }}
                      />
                    </Center>
                    <Stack paddingLeft="20px" paddingTop="0px">
                      <Text fontSize="17px" fontWeight="bold" color="#fff">
                        {data.name}
                      </Text>
                      <Text fontSize="14px" color="#aaa">
                        Sorteio em{" "}
                        {moment(data.datetime)
                          .utcOffset("-00:00")
                          .format("DD/MM/YYYY")}
                      </Text>
                      <Text lineHeight="1px" fontSize="14px" color="#aaa">
                        R$ {data.price?.toFixed(2).replace(".", ",")}
                      </Text>
                    </Stack>
                  </Flex>
                </Box>
              </WrapItem>
              <WrapItem paddingTop="20px" w="100%">
                <Heading
                  as="h4"
                  color="#fff"
                  padding="0px 20px 10px 20px"
                  size="md"
                >
                  Escolha o número:
                </Heading>
              </WrapItem>
              {wrapNumeros}
            </Wrap>
          )}
          {!data.name && (
            <Center w="100%" h="100%">
              <CircularProgress isIndeterminate color="blue.300" />
            </Center>
          )}
        </Center>
      </div>
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  return {
    props: {
      id,
    },
  };
};

export default Rifa;
