// https://codesandbox.io/s/chakra-slatejs-ptpfm?file=/src/index.tsx
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
} from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { usePageInstCtx } from "../../../contexts/PageInstContext";
import { MdKeyboardBackspace, MdSave } from "react-icons/md";
import { useAuth } from "../../../contexts/AuthContext";
import RichTextEditor from "../../../components/_ui/RichTextEditor";

export default function CriarPagina() {
  const router = useRouter();
  const [dataCat, setDataCat] = useState([]);
  const { catsPageInst, createPageInst, setContentCtx } = usePageInstCtx();
  const { user } = useAuth();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // ---- Functions ----
  useEffect(() => {
    setDataCat(catsPageInst);
  });

  async function handleCadastrar(dataForm) {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("content-cms");
      const contentNew = await JSON.parse(item);

      const newDataForm = {
        ...dataForm,
        content: contentNew,
        user_id: user.id,
      };
      console.log(newDataForm);
      createPageInst(newDataForm)
        .then((resp) => {
          if (resp) {
            console.log(resp);
            setContentCtx([]);
            toast({
              title: `Sucesso! ${resp.page.menuName} adicionado a lista de páginas.`,
              status: "success",
              duration: 7000,
              position: "top",
              isClosable: true,
            });
            router.push("/admin/pag-institucionais/gerenciar-paginas");
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
          | PÁGINAS INSTITUCIONAIS
        </Text>
        <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
          Criar Página
        </Heading>

        <Box h="full" boxShadow="md" bg="white" w="full">
          <Box bg="white" p={6} rounded="md">
            <form onSubmit={handleSubmit(handleCadastrar)}>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel htmlFor="name" fontSize="xs" fontWeight="semibold">
                    Nome da Página
                  </FormLabel>
                  <Input
                    {...register("name", {
                      required: "Este campo é obrigatório",
                    })}
                    id="name"
                    name="name"
                    type="text"
                    variant="filled"
                    fontSize="xs"
                    placeholder="Nome que aparecerá nos menus"
                  />
                </FormControl>
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel
                    htmlFor="categoria"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    Categoria
                  </FormLabel>
                  <Select
                    {...register("categoria_id")}
                    placeholder="Selecione uma categoria..."
                    color="gray.500"
                    variant="filled"
                    fontSize="xs"
                  >
                    {dataCat &&
                      dataCat.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl isInvalid={errors.name}>
                  <FormLabel
                    htmlFor="titulo"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    Título
                  </FormLabel>
                  <Input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="text"
                    variant="filled"
                    fontSize="xs"
                    placeholder="Título do Conteúdo"
                  />
                </FormControl>
                <FormControl isInvalid={errors.descricao}>
                  <RichTextEditor />
                </FormControl>
                <HStack alignSelf="flex-end">
                  <Button
                    leftIcon={<MdKeyboardBackspace />}
                    color="white"
                    bg="gray.500"
                    _hover={{ bg: "gray.700" }}
                    fontSize="xs"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    leftIcon={<MdSave size={16} />}
                    type="submit"
                    color="white"
                    bg="brand.600"
                    _hover={{ bg: "brand.800" }}
                    fontSize="xs"
                    px={8}
                  >
                    Salvar
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Box>
        </Box>
      </VStack>
    </>
  );
}
