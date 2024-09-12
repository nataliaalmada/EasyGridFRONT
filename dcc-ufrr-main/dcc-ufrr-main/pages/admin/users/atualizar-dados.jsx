import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  HStack,
  Avatar,
  Link,
  Divider,
  Checkbox,
} from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import { useRouter } from "next/router";
import { ArrowBackIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import CryptoJS from "crypto-js";
import { MdSave } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import InputMask from "react-input-mask";
import validator from "validator";

function getRole(role) {
  const roles = ["Usuário", "Editor", "Admin"];
  return roles[--role];
}

export default function AtualizarDados() {
  const router = useRouter();
  const { user } = useAuth();
  const { updateUser, checkpassword } = useUser();
  const toast = useToast();
  const [enablePassword, setEnablePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [dateNascValid, setDateNascValid] = useState(
    user?.data_nascimento
      ? new Date(
          user?.data_nascimento.replace(/-/g, "/").replace(/T.+/, "")
        ).toLocaleDateString()
      : ""
  );

  // Force reload page (uma vez)
  if (typeof window !== "undefined") {
    window.onload = function () {
      if (!localStorage.loaded) {
        localStorage.setItem("loaded", "yes");
        window.location.reload();
      }
    };
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      whatsapp: user?.whatsapp,
      data_nascimento: dateNascValid,
      genero: user?.genero,
      endereco: user?.endereco,
    },
  });

  // ---- Functions ----
  function FormataStringData(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  }

  const validateDate = (value) => {
    let newDate = FormataStringData(value);
    if (!validator.isDate(newDate)) {
      setErrorMessage("Enter Valid Date!");
    } else {
      setErrorMessage("");
      setDateNascValid(newDate);
      return newDate;
    }
  };

  function handleCheckBox(event) {
    setEnablePassword(event.target.checked);
  }

  async function handleAtualizar(dataForm) {
    const newDate = FormataStringData(dataForm?.data_nascimento);
    const newDataForm = {
      name: dataForm.name,
      email: dataForm.email,
      password: dataForm.newpassword,
      role: dataForm.role,
      whatsapp: dataForm.whatsapp,
      data_nascimento: newDate,
      genero: dataForm.genero,
      endereco: dataForm.endereco,
      change_password: enablePassword,
    };
    if (enablePassword) {
      if (dataForm.password && dataForm.newpassword) {
        checkpassword(newDataForm.email, dataForm.password)
          .then((resp) => {
            if (resp.data.checkPassword) {
              setErrorPassword("");
              updateUser(user.id, newDataForm)
                .then((resp) => {
                  if (resp) {
                    console.log(resp);
                    toast({
                      title: `Cadastro Atualizado com Sucesso!`,
                      status: "success",
                      duration: 7000,
                      position: "top",
                      isClosable: true,
                    });
                    setEnablePassword(false);
                  }
                })
                .catch((error) => console.log(error));
            } else {
              setErrorPassword("Erro: Senha não confere!");
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      updateUser(user.id, newDataForm)
        .then((resp) => {
          if (resp) {
            toast({
              title: `Cadastro Atualizado com Sucesso!`,
              status: "success",
              duration: 7000,
              position: "top",
              isClosable: true,
            });
            setEnablePassword(false);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
        <LinkIconText
          icon={ArrowBackIcon}
          text="VOLTAR"
          onClick={() => router.back()}
        />
        <Text fontSize="xs" color="gray.400" fontWeight="bold" pt={5}>
          | PERFIL DO USUÁRIO
        </Text>
        <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
          Atualizar Dados
        </Heading>
        <Box h="full" boxShadow="md" bg="white" w="full">
          <Box bg="white" py={4} px={16} rounded="md">
            <form onSubmit={handleSubmit(handleAtualizar)}>
              <HStack w="full">
                <VStack px={16} pt={16} alignSelf="flex-start">
                  <Avatar
                    size="xl"
                    name={user?.name}
                    src={`https://www.gravatar.com/avatar/${CryptoJS.MD5(
                      user?.email
                    ).toString()}?d=wavatar`}
                  />
                  <Link
                    fontSize="sm"
                    href="https://br.gravatar.com/"
                    isExternal
                  >
                    Gravatar <ExternalLinkIcon mx="2px" />
                  </Link>
                  <HStack pt={4}>
                    <Text fontSize="xs">Perfil: </Text>
                    <Heading as="h3" size="xs" color="brand.500">
                      {getRole(user?.role)}
                    </Heading>
                  </HStack>
                </VStack>
                <VStack gap={2} w="full" pr={16}>
                  <FormControl isInvalid={errors.name} isRequired>
                    <FormLabel
                      htmlFor="name"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Nome e Sobrenome
                    </FormLabel>
                    <Input
                      {...register("name", {
                        required: "Este campo é obrigatório",
                      })}
                      id="name"
                      name="name"
                      type="text"
                      variant="filled"
                      fontSize="sm"
                    />
                  </FormControl>
                  <FormControl isInvalid={errors.email} isRequired>
                    <FormLabel
                      htmlFor="email"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      E-mail
                    </FormLabel>
                    <Input
                      {...register("email", {
                        required: "Este campo é obrigatório",
                      })}
                      id="email"
                      name="email"
                      type="text"
                      variant="filled"
                      fontSize="sm"
                    />
                  </FormControl>
                  <FormControl isInvalid={errors.whatsapp}>
                    <FormLabel
                      htmlFor="whatsapp"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Celular (WhatsApp):
                    </FormLabel>
                    <Input
                      {...register("whatsapp")}
                      id="whatsapp"
                      name="whatsapp"
                      type="text"
                      as={InputMask}
                      mask="(**)*****-****"
                      maskChar={null}
                      variant="filled"
                      fontSize="sm"
                      placeholder="(Whatsapp...)"
                    />
                  </FormControl>
                  <HStack
                    alignSelf="flex-start"
                    w="full"
                    lineHeight={6}
                    alignItems="flex-start"
                  >
                    <FormControl isInvalid={errors.whatsapp}>
                      <FormLabel
                        htmlFor="data_nascimento"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        Data de Nascimento:
                      </FormLabel>
                      <Input
                        {...register("data_nascimento")}
                        id="data_nascimento"
                        name="data_nascimento"
                        as={InputMask}
                        mask="**/**/****"
                        maskChar={null}
                        onChange={(e) =>
                          e.preventDefault() && validateDate(e.target.value)
                        }
                        type="text"
                        variant="filled"
                        fontSize="sm"
                        placeholder="dd/mm/aaaa"
                      />
                      <Box fontSize="xs" fontWeight="bold" color="red">
                        {errorMessage}
                      </Box>
                    </FormControl>
                    <FormControl isInvalid={errors.whatsapp}>
                      <FormLabel
                        htmlFor="genero"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        Gênero:
                      </FormLabel>
                      <Select
                        {...register("genero")}
                        id="genero"
                        name="genero"
                        placeholder="Selecione..."
                        size="sm"
                        h="10"
                        variant="filled"
                      >
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outros">Outros</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  <FormControl isInvalid={errors.endereco}>
                    <FormLabel
                      htmlFor="endereco"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Endereço:
                    </FormLabel>
                    <Input
                      {...register("endereco")}
                      id="endereco"
                      name="endereco"
                      type="text"
                      variant="filled"
                      fontSize="sm"
                      placeholder="Rua, n. - Bairro - Cidade"
                    />
                  </FormControl>
                  <Divider
                    pt={2}
                    borderColor="brand.500"
                    borderStyle="dashed"
                  />
                  <HStack alignSelf="flex-start" color="brand.500">
                    <RiLockPasswordLine />
                    <Heading as="h3" size="sm">
                      Alterar Senha:
                    </Heading>
                    <Checkbox
                      size="md"
                      colorScheme="green"
                      borderColor="brand.500"
                      isChecked={enablePassword}
                      onChange={(e) => handleCheckBox(e)}
                    />
                  </HStack>
                  <FormControl isInvalid={errors.password} isRequired>
                    <FormLabel
                      htmlFor="password"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Senha Atual:
                    </FormLabel>
                    <Input
                      {...register("password")}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      fontSize="sm"
                      placeholder="Senha Atual..."
                      disabled={!enablePassword}
                    />
                    <Box fontSize="xs" fontWeight="bold" color="red">
                      {errorPassword}
                    </Box>
                  </FormControl>
                  <FormControl isInvalid={errors.newpassword} isRequired>
                    <FormLabel
                      htmlFor="newpassword"
                      fontSize="xs"
                      fontWeight="semibold"
                    >
                      Nova Senha:
                    </FormLabel>
                    <Input
                      {...register("newpassword")}
                      id="newpassword"
                      name="newpassword"
                      type="password"
                      variant="filled"
                      fontSize="sm"
                      placeholder="Nova Senha..."
                      disabled={!enablePassword}
                    />
                  </FormControl>
                </VStack>
              </HStack>
              <HStack pt={10} justifyContent="flex-end" pr={16}>
                <Button
                  leftIcon={<MdSave size={16} />}
                  type="submit"
                  color="white"
                  bg="brand.600"
                  _hover={{ bg: "brand.800" }}
                  fontSize="xs"
                  alignSelf="flex-end"
                  px={8}
                >
                  Atualizar
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      </VStack>
    </>
  );
}
