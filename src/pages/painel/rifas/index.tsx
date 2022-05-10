/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Button,
  ButtonGroup,
  IconButton,
  Select,
  Skeleton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
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
import moment from "moment";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";

const Rifas: NextPage = () => {
  const [raffles, setRaffles] = useState<RaffleDTO[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/api/raffles/get").then((res) => setRaffles(res.data.content));
  }, []);

  const handleAction = async (modo: string, id: number) => {
    console.log(modo, id);
    if(modo === 'update') {
      router.push({
        pathname: '/painel/rifas/edicao',
        query: { id },
      })
    } else if(modo === 'delete') {
      router.push({
        pathname: '/painel/rifas/deletar',
        query: { id },
      })
    }
  }


  return (
    <Template title="Rifas">
      <ButtonGroup size="sm" isAttached>
        <Link href="/painel/rifas/add" passHref>
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
              <Th>Imagem</Th>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Quantidade</Th>
              <Th>Data do sorteio</Th>
              <Th isNumeric>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {raffles.length > 0 &&
              raffles?.map((item, index) => (
                <Tr key={item.id}>
                  <Td>
                    <img
                      style={{ borderRadius: "10px" }}
                      src={item.path}
                      width="50"
                      height="50"
                    />
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>R$ {item.price}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>
                    {moment(item.datetime)
                      .utcOffset("-00:00")
                      .format("DD/MM/YYYY")}
                  </Td>
                  <Td isNumeric>
                    <ButtonGroup size="sm" isAttached variant="outline">
                      <Button style={{cursor: "pointer"}} onClick={() => handleAction("update", Number(item.id))} mr="-px" colorScheme="pink">
                        <FaEdit />
                      </Button>
                      <Button style={{cursor: "pointer"}} onClick={() => handleAction("delete", Number(item.id))} mr="-px" colorScheme="pink">
                        <BsTrashFill />
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            {raffles.length <= 0 && (<Tr>
              <Td>
              <Skeleton h='20px' w="100%" />
              </Td>
              <Td>
              <Skeleton h='20px' w="100%" />
              </Td>
              <Td>
              <Skeleton h='20px' w="100%" />
              </Td>
              <Td>
              <Skeleton h='20px' w="100%" />
              </Td>
              <Td>
              <Skeleton h='20px' w="100%" />
              </Td>
              <Td>
              <Skeleton h='20px' w="100%" />
              </Td>
            </Tr>)}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Imagem</Th>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Quantidade</Th>
              <Th>Data do sorteio</Th>
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

export default Rifas;
