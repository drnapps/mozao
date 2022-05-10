import { CircularProgress, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";

const Indicador: NextPage = (props: any) => {
  useEffect(() => {
    localStorage.setItem("indicador", props.id);
    window.location.href = "/";
  }, []);

  return (
    <Wrap>
      <WrapItem width="100%" justifyContent="center" padding="20px">
        <CircularProgress paddingTop="70px" isIndeterminate color="teal" />
      </WrapItem>
      <WrapItem width="100%" justifyContent="center">
        <Text>Aguarde...</Text>
      </WrapItem>
    </Wrap>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.query.id || null,
    },
  };
};

export default Indicador;
