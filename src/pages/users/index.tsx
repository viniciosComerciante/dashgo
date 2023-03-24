import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { useQuery } from "react-query";

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, error } = useQuery("users", async () => {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    return data;
  });

  console.log(data);

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar></SideBar>
        <Box flex="1" borderRadius={8} bg="gray.800" padding="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Button
              as="a"
              size="sm"
              fontSize="small"
              colorScheme="pink"
              leftIcon={<Icon fontSize="20" as={RiAddLine} />}
            >
              Criar novo usuário
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner></Spinner>
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Vinicios Oliveira</Text>
                        <Text
                          fontWeight="normal"
                          fontSize="sm"
                          color="gray.300"
                        >
                          vinicompif@gmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    {isWideVersion && (
                      <Td>
                        {" "}
                        <Button
                          as="a"
                          size="sm"
                          fontSize="small"
                          colorScheme="purple"
                          leftIcon={<Icon fontSize="16" as={RiPencilLine} />}
                        >
                          Editar
                        </Button>
                      </Td>
                    )}
                  </Tr>
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Vinicios Oliveira</Text>
                        <Text
                          fontWeight="normal"
                          fontSize="sm"
                          color="gray.300"
                        >
                          vinicompif@gmail.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2021</Td>}
                    {isWideVersion && (
                      <Td>
                        {" "}
                        <Button
                          as="a"
                          size="sm"
                          fontSize="small"
                          colorScheme="purple"
                          leftIcon={<Icon fontSize="16" as={RiPencilLine} />}
                        >
                          Editar
                        </Button>
                      </Td>
                    )}
                  </Tr>
                </Tbody>
              </Table>
              <Pagination></Pagination>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
