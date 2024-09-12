import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import NextLink from "next/link";
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
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import { GoHome } from "react-icons/go";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import Logo from "../../components/_ui/Logo";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [messageAlert, setMessageAlert] = useState(null);

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

  async function handleLogin(dataForm) {
    login(dataForm.email, dataForm.password)
      .then(function ({ status }) {
        if (status === 200) {
          router.push("/admin");
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessageAlert({ status: "error", msg: error.response.data.msg });
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
          Login
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={errors.email}>
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

            <FormControl isInvalid={errors.password}>
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
              type="submit"
              width="full"
              color="white"
              bg="brand.600"
              _hover={{ bg: "brand.800" }}
              fontSize="xs"
            >
              Entrar
            </Button>
            <HStack
              w="full"
              justifyContent="space-between"
              fontSize="xs"
              fontWeight="bold"
              color="cyan.400"
              pt={4}
            >
              <Box>
                <NextLink href="#" passHref>
                  <Link
                    textDecorationLine="none"
                    _hover={{ color: "cyan.700" }}
                  >
                    Esqueceu a senha
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <NextLink href="/auth/register" passHref>
                  <Link
                    textDecorationLine="none"
                    _hover={{ color: "cyan.700" }}
                  >
                    Cadastrar-se
                  </Link>
                </NextLink>
              </Box>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
