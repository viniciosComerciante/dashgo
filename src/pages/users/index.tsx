import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
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
import { GetServerSideProps } from "next";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { SideBar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, User, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

interface UsersListProps {
  users: User[];
}

export default function UserList({ users }: UsersListProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useUsers(page, {
    initialData: users,
  });
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar></SideBar>
        <Box flex="1" borderRadius={8} bg="gray.800" padding="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
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
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink"></Checkbox>
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text
                              fontWeight="normal"
                              fontSize="sm"
                              color="gray.300"
                            >
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            {" "}
                            <Button
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="purple"
                              leftIcon={
                                <Icon fontSize="16" as={RiPencilLine} />
                              }
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                registersPerPage={10}
                currentPage={page}
                totalCountRegisters={data.totalCount}
                onPageChange={setPage}
              ></Pagination>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return { props: { users } };
};
