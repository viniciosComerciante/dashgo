import { Flex, Text, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export default function Header() {
  return (
    <Flex w="100%" as="header" maxWidth={1480} h="20" mx="auto" mt="4" px="6">
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
        alignSelf="center"
      >
        dashgo
        <Text ml="1" as="span" color="pink.500">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          _placeholder={{
            color: "gray.400",
          }}
          px="4"
          mr="4"
        ></Input>
        <Icon as={RiSearchLine} fontSize={20}></Icon>
      </Flex>
    </Flex>
  );
}
