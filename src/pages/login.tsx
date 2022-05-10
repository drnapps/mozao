import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ChakraProvider,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { UserDTO } from "../data/dtos/UserDTO";
import { api } from "../lib/api";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [data, setData] = useState<Partial<UserDTO>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    console.log(data);
    e.preventDefault();
    setError("");
    setLoading(true);
    const credentials = {
      email: data.email,
      password: data.password,
    } as UserDTO;
    try {
      const verifyUser = await api.post("/api/auth/login", credentials);
      if (verifyUser.data.status === "success") {
        localStorage.setItem(
          "user",
          JSON.stringify(verifyUser.data.content)
        );
        router.push("/painel");
      } else {
        setError(verifyUser.data.message);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <ChakraProvider>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Efetue o seu login</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Para ter acesso ao seu <Link color={"pink.400"}>painel</Link>
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={error === "" ? false : true}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                {error !== "" && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
              <FormControl
                id="password"
                isInvalid={error === "" ? false : true}
              >
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={data.password || ""}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Lembrar</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack> */}
                <Button
                  isLoading={loading}
                  onClick={handleSubmit}
                  bg={"pink.400"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  ENTRAR
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
