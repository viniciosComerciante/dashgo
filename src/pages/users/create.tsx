import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const resolver = useYupValidationResolver(createUserFormSchema);
  const { register, handleSubmit, formState } = useForm({ resolver });
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Box>
      <Header></Header>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar></SideBar>
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          padding={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700"></Divider>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="name"
                label="Nome Completo"
                {...register("name")}
                error={errors.name}
              ></Input>
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              ></Input>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
                error={errors.password}
              ></Input>
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação de Senha"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              ></Input>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="whiteAlpha">Cancelar</Button>
              <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
