import { Center, Flex, Text } from "@chakra-ui/react";
import { FaMoneyBillAlt } from "react-icons/fa";

interface ItemContaProps {
    titulo: string;
    icone: any;
}
export default function ItemConta(props: ItemContaProps) {
  return (
    <Center w="100%" p="10px">
      <Flex bg="#fff" w="90%" borderRadius={"20px"}>
        <Center p="10px">
          {props.icone}
        </Center>
        <Text fontSize={15} fontWeight="bold" paddingTop="11px" paddingLeft="10px">
          {props.titulo}
        </Text>
      </Flex>
    </Center>
  );
}
