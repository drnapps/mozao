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

const Indicacoes: NextPage = () => {
  const [data, setData] = useState<CustomerDTO[]>([]);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    let readUser  = localStorage.getItem('user');
    const user = JSON.parse(readUser!);
    let path = window.location.href.split("/painel");
    const newUrl = path[0] + "/indicador/" + user.id;
    setUrl(newUrl);
    api.get("/api/customers/get/" + user.id).then((res) => setData(res.data.content));
  }, []);

  return (
    <Template title="Indicações">
      <Flex minWidth='100%' alignItems='center' gap='2'>
        <Text w="100px">Seu link de divulgação:</Text>
        <Input id="email" type="email" value={url} readOnly/>
      </Flex>
      <Spacer h="20px" />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#ID</Th>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Vendas</Th>
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
              </Tr>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>#ID</Th>
              <Th>Nome</Th>
              <Th>E-mail</Th>
              <Th>Vendas</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Template>
  );
};

export default Indicacoes;
