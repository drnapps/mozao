import {
  Text,
  Wrap,
  WrapItem,
  Center,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { CgCardSpades } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { GiPodiumWinner } from "react-icons/gi";
import { useRouter } from 'next/router'

export default function Tabbar() {
    const router = useRouter()

    const returnColor = (href: string) => {
        return router.asPath === href ? '#fff' : '#444660';
    }
  return (
    <Wrap
      position="fixed"
      bottom={0}
      w="100%"
      bg="#020828"
      justify="center"
      p="20px 0px 20px 0px"
    >
      <WrapItem w="31%">
        <Link href="/" passHref><Flex w="100%" alignItems="center" direction="column">
          <CgCardSpades color={returnColor('/')} size={26} />
          <Text color={returnColor('/')} >
            Home
          </Text>
        </Flex></Link>
      </WrapItem>
      <WrapItem w="31%">
      <Link href="/sorteados" passHref><Flex w="100%" alignItems="center" direction="column">
          <GiPodiumWinner color={returnColor('/sorteados')} size={26} />
          <Text color={returnColor('/sorteados')} >
            Sorteados
          </Text>
        </Flex></Link>
      </WrapItem>
      <WrapItem w="31%">
      <Link href="/conta" passHref><Flex w="100%" alignItems="center" direction="column">
          <FiUser color={returnColor('/conta')} size={26} />
          <Text color={returnColor('/conta')} >
            Conta
          </Text>
        </Flex></Link>
      </WrapItem>
    </Wrap>
  );
}
