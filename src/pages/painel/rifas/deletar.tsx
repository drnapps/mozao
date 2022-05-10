/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Spacer,
    Text,
    Wrap,
    WrapItem,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Flex,
    Center,
  } from "@chakra-ui/react";
  import type { GetServerSideProps, NextPage } from "next";
  import { useEffect, useState } from "react";
  import Template from "../../../components/painel/Template";
  import { RaffleDTO } from "../../../data/dtos/RaffleDTO";
  import { useRouter } from "next/router";
  import axios from "axios";
  import { api } from "../../../lib/api";
  import { UserDTO } from "../../../data/dtos/UserDTO";
  import moment from "moment";
import Link from "next/link";
  
  const DeletarRifa: NextPage = (props: any) => {
    const [data, setData] = useState<Partial<RaffleDTO>>({});
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const [user, setUser] = useState<UserDTO>({});
  
    useEffect(() => {
      let readUser = localStorage.getItem("user");
      readUser = JSON.parse(readUser!);
      const userLocal = readUser as UserDTO;
      setUser(userLocal);
      api
        .get("/api/raffles/get/" + props.id)
        .then((r) => {
          console.log(r.data.content);
  
          setData({
            ...data,
            name: r.data.content.name,
            userId: r.data.content.userId,
            path: r.data.content.path
          });
          if (Number(r.data.content.userId) === Number(userLocal.id)) {
            setIsOwner(true);
          } else {
            router.push("/painel/rifas");
          }
        })
        .catch((err) => {
          console.log(err.message);
          router.push("/painel/rifas");
        });
    }, []);
  
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      
      try {
        const rifa = await api.delete("/api/raffles/delete/" + props.id)
          .then((response) => {
            if (response.data.status === "success") {
              router.push("/painel/rifas");
            }
          })
          .catch((error) => {
            setLoading(false);
            setError("ERRO");
          });
      } catch (err: any) {
        console.log(err.message);
        setLoading(false);
        setError("ERRO");
      }
    };
  
    return (
      <Template title="Deletar Rifa">
        {error !== "" && (
          <Alert marginBottom={10} status="error">
            <AlertIcon />
            <AlertTitle mr={2}>
              <Text color="#000">Ocorreu um ERRO!</Text>
            </AlertTitle>
            <AlertDescription>
              <Text color="#000">
                Ocorreu um erro ao tentar deletar.
              </Text>
            </AlertDescription>
            <CloseButton
              color="#000"
              onClick={() => setError("")}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        )}
        {isOwner && (
          <Wrap>
            <WrapItem p="20px" w={["20%"]}>
                <Center>
                    <img style={{borderRadius: "20px"}} src={data.path} width="70%" />
                </Center>
            </WrapItem>
            <WrapItem p="10px" w={["70%"]}>
             <Text>Tem certeza que deseja deletar a rifa <strong>{data.name}</strong>? Essa opção não poderá ser desfeita e elimina todas as informações vinculadas a ela. Confirma? </Text>
            </WrapItem>
            <WrapItem w="100%" p="10px">
              <Divider />
            </WrapItem>
            <WrapItem w="100%">
              <Spacer w={["0%", "0%", "60%"]} />
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                colorScheme="red"
              >
                DELETAR
              </Button>
            </WrapItem>
          </Wrap>
        )}
      </Template>
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
  
  export default DeletarRifa;
  