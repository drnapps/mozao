/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Input,
  Skeleton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Template from "../../../components/painel/Template";
import { RaffleDTO } from "../../../data/dtos/RaffleDTO";
import { api } from "../../../lib/api";
import AdminRoute from "../../../services/AdminRoute";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { CustomerDTO } from "../../../data/dtos/CustomerDTO";
import { UserDTO } from "../../../data/dtos/UserDTO";

const Indicadores: NextPage = () => {
  const [data, setData] = useState<CustomerDTO[]>([]);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    let readUser  = localStorage.getItem('user');
    const user = JSON.parse(readUser!);
    let path = window.location.href.split("/painel");
    const newUrl = path[0] + "/indicador/" + user.id;
    setUrl(newUrl);
    api.get("/api/users/get").then((res) => setData(res.data.content));
  }, []);

  const handleAction = async (modo: string, id: number) => {
    console.log(modo, id);
    if (modo === "update") {
      router.push({
        pathname: "/painel/indicacoes/edicao",
        query: { id },
      });
    } else if (modo === "delete") {
      router.push({
        pathname: "/painel/indicacoes/deletar",
        query: { id },
      });
    }
  };

  console.log(data);

  return (
    <Template title="Indicadores">
        <ButtonGroup size="sm" isAttached>
          <Link href="/painel/indicacoes/add" passHref>
            <Button mr="-px" colorScheme="pink">
              Adicionar novo
            </Button>
          </Link>
        </ButtonGroup>
      <Spacer h="20px" />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#ID</Th>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Vendas</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data?.map((item, index) => (
                <Tr key={item.id}>
                  <Td>#{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.orders?.length} vendas</Td>
                  <Td isNumeric>
                    <ButtonGroup size="sm" isAttached variant="outline">
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAction("update", Number(item.id))}
                        mr="-px"
                        colorScheme="pink"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAction("delete", Number(item.id))}
                        mr="-px"
                        colorScheme="pink"
                      >
                        <BsTrashFill />
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            {data.length <= 0 && (
              <Tr>
                <Td>
                  <Skeleton h="20px" w="100%" />
                </Td>
                <Td>
                  <Skeleton h="20px" w="100%" />
                </Td>
                <Td>
                  <Skeleton h="20px" w="100%" />
                </Td>
                <Td>
                  <Skeleton h="20px" w="100%" />
                </Td>
                <Td>
                  <Skeleton h="20px" w="100%" />
                </Td>
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>#ID</Th>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Vendas</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Template>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await AdminRoute(ctx);
  return {
    props: {},
  };
};

export default Indicadores;
