import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  ChakraProvider,
  CircularProgress,
  CloseButton,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaHistory, FaMoneyBillAlt, FaMoneyBillWaveAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Tabbar from "../../components/app/Tabbar";
import ItemConta from "../../components/ItemConta";
import { CustomerDTO } from "../../data/dtos/CustomerDTO";
import { PendentDTO } from "../../data/dtos/PendentDTO";
import { RaffleDTO } from "../../data/dtos/RaffleDTO";
import { api } from "../../lib/api";

const Conta: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modo, setModo] = useState<string>("loading");
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Partial<CustomerDTO>>({});
  const [pendent, setPendent] = useState<Partial<PendentDTO>>({});

  useEffect(() => {
    let mozaouser = localStorage.getItem("mozaouser");
    let mozaoorder = localStorage.getItem("mozaoorder");
    if (mozaouser) {
      setModo("conta");
      setData(JSON.parse(mozaouser));
    } else {
      setModo("login");
    }
    if (mozaoorder) {
      setPendent(JSON.parse(mozaoorder));
    }
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const verify = await api.post("/api/customers/login", data);
      if (verify.data.status === "success") {
        setData(verify.data.content);
        setModo("conta");
        localStorage.setItem("mozaouser", JSON.stringify(verify.data.content));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError("E-mail e/ou senha inválidos!");
    }
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const indicador = localStorage.getItem("indicador");
      let json = data;
      if (indicador) {
        setData({ ...data, userId: Number(indicador) });
        json.userId = Number(indicador);
      }
      console.log(json)
      const verify = await api.post("/api/customers/register", json);
      if (verify.data.status === "success") {
        setData(verify.data.content);        
        setModo("conta");
        localStorage.setItem("mozaouser", JSON.stringify(verify.data.content));
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError("Esses dados são inválidos ou esse usuário já existe");
    }
  };

  const handleOpenRegister = () => {
    setError("");
    setLoading(false);
    setModo("register");
  };

  const handleOpenLogin = () => {
    setError("");
    setLoading(false);
    setModo("login");
  };

  const onClose = () => {
    localStorage.removeItem("mozaoorder");
    setPendent({});
  };

  const logout = () => {
    localStorage.removeItem("mozaouser");
    setData({});
    setModo("login");
  };

  return (
    <ChakraProvider>
      <div style={{ backgroundColor: "#132c54", height: "100vh" }}>
        <Head>
          <title>Conta | Mozão</title>
          <meta name="description" content="Mozão" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Tabbar />
        <Center
          w="100%"
          p={["30px 0px 0px 0px", "30px 0px 0px 0px", "100px 30% 0px 30%"]}
        >
        {modo === "conta" && (
          <Wrap
            m={0}
            style={{ backgroundColor: "#132c54", height: "100%" }}
            w="100%"
          >
            <WrapItem bg="#102042" p="40px" w="100%">
              <Flex direction="column">
                <Text color="#fff" fontSize="20px">
                  Saldo disponível
                </Text>
                <Text color="#fff" fontWeight="bold" fontSize="60px">
                  R$ 0,00
                </Text>
              </Flex>
            </WrapItem>
            <WrapItem>
              <Spacer h="10px" />
            </WrapItem>
            {pendent.raffle && (
              <WrapItem p="0px 30px 0px 30px" w="100%">
                <Alert status="warning">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Saldo insuficiente!</AlertTitle>
                    <AlertDescription>
                      Recarregue a sua conta e tente comprar novamente as rifas.
                    </AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </Alert>
              </WrapItem>
            )}
            <WrapItem>
              <Spacer h="10px" />
            </WrapItem>
            <WrapItem w="100%">
              <ItemConta
                icone={<FaMoneyBillAlt size={25} />}
                titulo="Adicionar dinheiro"
              />
            </WrapItem>
            <WrapItem w="100%">
              <ItemConta icone={<FaHistory size={23} />} titulo="Histórico" />
            </WrapItem>
            <WrapItem onClick={logout} w="100%">
              <ItemConta icone={<IoMdLogOut size={25} />} titulo="Sair" />
            </WrapItem>
          </Wrap>
        )}

        {modo === "loading" && (
          <Center w="100%" h="100%">
            <CircularProgress isIndeterminate color="blue.300" />
          </Center>
        )}

        {modo === "login" && (
          <Center w="100%" h="100%">
            <Wrap w="80%" p="20px" bg="#020828" borderRadius="20px">
              <WrapItem w="100%" paddingBottom="5px">
                <Text color="#fff">Efetue seu login para continuar</Text>
              </WrapItem>
              {error !== "" && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <WrapItem w="100%" p="10px">
                <FormControl>
                  <FormLabel htmlFor="email" color="#eee">
                    E-mail
                  </FormLabel>
                  <Input
                    color={"#fff"}
                    id="email"
                    type="email"
                    value={data.email || ""}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </FormControl>
              </WrapItem>

              <WrapItem w="100%" p="0px 10px 10px 10px">
                <FormControl>
                  <FormLabel htmlFor="senha" color="#eee">
                    Senha
                  </FormLabel>
                  <Input
                    color={"#fff"}
                    id="senha"
                    type="password"
                    value={data.password || ""}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </FormControl>
              </WrapItem>
              <WrapItem w="100%" p="10px 10px 0px 10px">
                <Button
                  onClick={handleLogin}
                  isLoading={loading}
                  colorScheme="blue"
                  w="100%"
                  size="sm"
                >
                  ENTRAR
                </Button>
              </WrapItem>
              <WrapItem w="100%" p="0px 10px 10px 10px">
                <Button
                  onClick={handleOpenRegister}
                  colorScheme="blue"
                  w="100%"
                  size="sm"
                  variant="outline"
                >
                  QUERO ME CADASTRAR
                </Button>
              </WrapItem>
            </Wrap>
          </Center>
        )}
        {modo === "register" && (
          <Center w="100%" h="100%" paddingBottom="100px" paddingTop="20px">
            <Wrap w="80%" p="20px" bg="#020828" borderRadius="20px">
              {error !== "" && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <WrapItem w="100%" p="10px">
                <FormControl>
                  <FormLabel htmlFor="name" color="#eee">
                    Nome
                  </FormLabel>
                  <Input
                    color={"#fff"}
                    id="name"
                    type="text"
                    value={data.name || ""}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </FormControl>
              </WrapItem>
              <WrapItem w="100%" p="10px">
                <FormControl>
                  <FormLabel htmlFor="telefone" color="#eee">
                    Telefone
                  </FormLabel>
                  <Input
                    color={"#fff"}
                    id="telefone"
                    type="text"
                    value={data.telefone || ""}
                    onChange={(e) =>
                      setData({ ...data, telefone: e.target.value })
                    }
                  />
                </FormControl>
              </WrapItem>
              <WrapItem w="100%" p="10px">
                <FormControl>
                  <FormLabel htmlFor="email" color="#eee">
                    E-mail
                  </FormLabel>
                  <Input
                    color={"#fff"}
                    id="email"
                    type="email"
                    value={data.email || ""}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </FormControl>
              </WrapItem>

              <WrapItem w="100%" p="0px 10px 10px 10px">
                <FormControl>
                  <FormLabel htmlFor="senha" color="#eee">
                    Senha
                  </FormLabel>
                  <Input
                    color={"#fff"}
                    id="senha"
                    type="password"
                    value={data.password || ""}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </FormControl>
              </WrapItem>
              <WrapItem w="100%" p="10px 10px 0px 10px">
                <Button
                  onClick={handleRegister}
                  isLoading={loading}
                  colorScheme="blue"
                  w="100%"
                  size="sm"
                >
                  CADASTRAR
                </Button>
              </WrapItem>
              <WrapItem w="100%" p="0px 10px 10px 10px">
                <Button
                  onClick={handleOpenLogin}
                  colorScheme="blue"
                  w="100%"
                  size="sm"
                  variant="outline"
                >
                  JÁ TENHO CONTA
                </Button>
              </WrapItem>
            </Wrap>
          </Center>
        )}
        </Center>
      </div>
    </ChakraProvider>
  );
};

export default Conta;
