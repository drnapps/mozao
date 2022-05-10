import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import useAppData from "../../data/hooks/useAppData";
import styles from "../../styles/layout.module.css";
import Link from 'next/link';

interface ItemMenuProps {
  titulo: string;
  icon: any;
  link: string;
}

export default function ItemMenu(props: ItemMenuProps) {
  const { theme } = useAppData();
  return (
    <Link href={props.link} passHref><Wrap padding="8px" className={styles["item" + theme]}>
      <WrapItem paddingTop="1px">{props.icon}</WrapItem>
      <WrapItem paddingLeft="5px" w="72%">
        <Text fontWeight="bold" fontSize="13px">
          {props.titulo}
        </Text>
      </WrapItem>
      <WrapItem paddingTop="1px" justifyContent="right">
        <IoIosArrowForward />
      </WrapItem>
    </Wrap></Link>
  );
}
