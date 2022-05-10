import {
  Box,
  color,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaMoneyBillAlt } from "react-icons/fa";
import useAppData from "../../data/hooks/useAppData";
import styles from "../../styles/layout.module.css";

export default function IndicacoesSidebar() {
  const { theme } = useAppData();
  return (
    <Box p="20px" w="100%" className={styles["indica" + theme]}>
      <Flex>
        <FaMoneyBillAlt style={{ color: "green" }} />
        <Text paddingLeft="11px" fontWeight="bold" fontSize="11px" color="green">
          Indicações
        </Text>
      </Flex>
      <Heading as="h2" size="lg" className={styles["bg" + theme]}>
        R$0,00
      </Heading>
    </Box>
  );
}
