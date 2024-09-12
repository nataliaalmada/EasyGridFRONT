import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  useDisclosure,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import NextLink from "next/link";
import { GoHome } from "react-icons/go";
import { useState, useRef } from "react";
import Logo from "../../components/_ui/Logo";
import { MdKeyboardBackspace, MdSave } from "react-icons/md";

export default function Register() {
  const router = useRouter();
  const { userRegister } = useAuth();
  const [messageAlert, setMessageAlert] = useState(null);
  let btnRef = useRef();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const onBtnClick = () => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
  };

  async function handleCadastrar(dataForm) {
    onBtnClick();
    userRegister(dataForm.name, dataForm.email, dataForm.password)
      .then(function ({ status }) {
        if (status === 200) {
          toast({
            title: `Cadastro realizado com Sucesso! Depois de ativo, faça o Login.`,
            status: "success",
            duration: 7000,
            position: "top",
            isClosable: true,
          });
          router.push("/auth/login");
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessageAlert({ status: "error", msg: error.response?.data.msg });
        onOpen();
      });
  }

  return (
    <Flex align="center" justify="start" flexDirection="column" pt={16}>
      <Box w={300} pb={1}>
        <Flex w="full" justifyContent="center" pb={8}>
          <Logo src="/images/logos/logo-dcc-01.png" w="50%" />
        </Flex>
        <HStack>
          <NextLink href="/" passHref>
            <Link textDecorationLine="none" _hover={{ color: "cyan.700" }}>
              <HStack>
                <Box pb={0.5}>
                  <GoHome />
                </Box>
                <Heading as="h4" size="xs">
                  Home &nbsp;&gt;
                </Heading>
              </HStack>
            </Link>
          </NextLink>
          <Heading as="h4" size="xs">
            Área Administrativa
          </Heading>
        </HStack>
        <Heading as="h2" size="lg" color="brand.800">
          Cadastrar-se
        </Heading>
      </Box>
      <Box w={310}>
        {isVisible && (
          <Alert fontSize="sm" status={messageAlert.status}>
            <AlertIcon />
            <Box>
              <AlertDescription>{messageAlert.msg}</AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        )}
      </Box>
      <Box bg="white" p={6} rounded="md" w={310}>
        <form onSubmit={handleSubmit(handleCadastrar)}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="email" fontSize="xs">
                Nome e Sobrenome:
              </FormLabel>
              <Input
                {...register("name", {
                  required: "Este campo é obrigatório",
                })}
                id="name"
                name="name"
                type="text"
                variant="filled"
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email} isRequired>
              <FormLabel htmlFor="email" fontSize="xs">
                E-mail
              </FormLabel>
              <Input
                {...register("email", {
                  required: "Este campo é obrigatório",
                })}
                id="email"
                name="email"
                type="email"
                variant="filled"
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} isRequired>
              <FormLabel htmlFor="password" fontSize="xs">
                Password
              </FormLabel>
              <Input
                {...register("password", {
                  required: "Este campo é obrigatório",
                  minLength: {
                    value: 4,
                    message: "Deve ter no mínimo 4 caracteres",
                  },
                })}
                id="password"
                name="password"
                type="password"
                variant="filled"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              ref={btnRef}
              leftIcon={<MdSave />}
              type="submit"
              width="full"
              color="white"
              bg="brand.600"
              _hover={{ bg: "brand.800" }}
              fontSize="xs"
            >
              Cadastrar-se
            </Button>
            <HStack w="full">
              <Box>
                <Button
                  leftIcon={<MdKeyboardBackspace />}
                  width="full"
                  color="white"
                  bg="gray.500"
                  _hover={{ bg: "gray.700" }}
                  fontSize="xs"
                  onClick={() => router.back()}
                >
                  Voltar
                </Button>
              </Box>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
