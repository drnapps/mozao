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
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Template from "../../../components/painel/Template";
import { RaffleDTO } from "../../../data/dtos/RaffleDTO";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../../../lib/api";
import useAppData from "../../../data/hooks/useAppData";
import AdminRoute from "../../../services/AdminRoute";
import { UserDTO } from "../../../data/dtos/UserDTO";

const AddRifa: NextPage = () => {
  const [data, setData] = useState<Partial<RaffleDTO>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<UserDTO>({});

  useEffect(() => {
    let readUser  = localStorage.getItem('user');
    readUser = JSON.parse(readUser!);
    setUser(readUser as UserDTO);
  }, []);

  let images: any;

  const onChangeFile = (event?: any) => {
    images = event.target.files[0];
    console.log(images);
  };

  const handleSubmit = async (e: any) => {
    let dataimages = new FormData();
    e.preventDefault();
    setError("");
    setLoading(true);
    dataimages.append("file", images);
    dataimages.append("upload_preset", "drnmozao");
    dataimages.append("cloud_name", "dwityuv06");
    let uploadImage;

    try {
      if (images) {
        uploadImage = await axios.post(
            "https://api.cloudinary.com/v1_1/dwityuv06/image/upload",
            dataimages,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(function (response?: any) {
            console.log(response.data);
            return response.data.url;
          }).catch(function (error) {
            console.log("Erro ao enviar imagem", error);
            return "erro";
          });
      }

      console.log(uploadImage);

      const json = {
        name: data.name,
        datetime: new Date(data.datetime!),
        price: data.price,
        quantity: data.quantity,
        path: uploadImage,
        userId: user.id,
        status: 1,
      };
      const rifa = await api.post("/api/raffles/post", json).then((response) => {
          if (response.data.status === "success") {
            console.log(response.data);
            router.push("/painel/rifas");
          }
        }).catch((error) => {
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
    <Template title="Adicionar Rifa">
      {error !== "" && (
        <Alert marginBottom={10} status="error">
          <AlertIcon />
          <AlertTitle mr={2}>
            <Text color="#000">Dados incorretos!</Text>
          </AlertTitle>
          <AlertDescription>
            <Text color="#000">
              Por gentileza preencha corretamente as informações.
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
      <Wrap>
        <WrapItem p="10px" w={["100%", "100%", "32%"]}>
          <FormControl>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              type="text"
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <FormHelperText>Título da rifa</FormHelperText>
          </FormControl>
        </WrapItem>

        <WrapItem p="10px" w={["100%", "100%", "32%"]}>
          <FormControl>
            <FormLabel htmlFor="datetime">Data</FormLabel>
            <Input
              id="datetime"
              type="date"
              value={data.datetime || ""}
              onChange={(e) => setData({ ...data, datetime: e.target.value })}
            />
            <FormHelperText>Data do sorteio</FormHelperText>
          </FormControl>
        </WrapItem>

        <WrapItem p="10px" w={["100%", "100%", "32%"]}>
          <FormControl>
            <FormLabel htmlFor="price">Preço</FormLabel>
            <Input
              id="price"
              min="1"
              max="999"
              step="0.01"
              type="number"
              value={data.price || 0.0}
              onChange={(e) =>
                setData({ ...data, price: Number(e.target.value) })
              }
            />
            <FormHelperText>Preço por aposta na rifa</FormHelperText>
          </FormControl>
        </WrapItem>

        <WrapItem p="10px" w={["100%", "100%", "32%"]}>
          <FormControl>
            <FormLabel htmlFor="quantity">Quantidade</FormLabel>
            <Input
              id="quantity"
              type="number"
              value={data.quantity || 0}
              onChange={(e) =>
                setData({ ...data, quantity: Number(e.target.value) })
              }
            />
            <FormHelperText>Quantidade de números da rifa</FormHelperText>
          </FormControl>
        </WrapItem>

        <WrapItem p="10px" w={["100%", "100%", "32%"]}>
          <FormControl>
            <FormLabel htmlFor="path">Imagem (Opcional)</FormLabel>
            <Input
              id="path"
              style={{ border: "0px", marginTop: "5px" }}
              type="file"
              onChange={onChangeFile}
              accept=".jpeg,.png,.jpg,image/*"
              value={data.path || ""}
            />
          </FormControl>
        </WrapItem>
        <WrapItem w="100%" p="10px">
          <Divider />
        </WrapItem>
        <WrapItem w="100%">
          <Spacer w={["0%", "0%", "60%"]} />
          <Button isLoading={loading} onClick={handleSubmit} colorScheme="pink">
            CADASTRAR
          </Button>
        </WrapItem>
      </Wrap>
    </Template>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await AdminRoute(ctx);

  return {
    props: {},
  };
};

export default AddRifa;
