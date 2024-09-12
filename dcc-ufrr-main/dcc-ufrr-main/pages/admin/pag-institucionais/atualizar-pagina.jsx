import { useForm, Controller } from "react-hook-form";
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

export default function AtualizarPagina() {
  const router = useRouter();
  const { catsPageInst, selectedPageCtx, updatePageInst, setSelectedPageCtx } =
    usePageInstCtx();
  const [dataCat, setDataCat] = useState([]);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    setDataCat(catsPageInst);
  });

  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedPageCtx?.menuName,
      categoria_id: selectedPageCtx?.CategoriasPageInstId,
      title: selectedPageCtx?.title,
    },
  });

  // ---- Functions ----
  async function handleAtualizar(dataForm) {
    console.log(dataForm);
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("content-cms");
      const contentNew = await JSON.parse(item);

      const newDataForm = {
        ...dataForm,
        content: contentNew,
        user_id: user.id,
        page_id: selectedPageCtx.id,
      };
      console.log(newDataForm);
      updatePageInst(newDataForm)
        .then((resp) => {
          if (resp) {
            console.log(resp);
            toast({
              title: `Sucesso! ${resp.updatedPage.menuName} atualizado na lista de páginas.`,
              status: "success",
              duration: 7000,
              position: "top",
              isClosable: true,
            });
            setSelectedPageCtx({});
            router.push("/admin/pag-institucionais/gerenciar-paginas");
          }
        })
        .catch((error) => console.log(error));
    }
  }

  function handleBack() {
    setSelectedPageCtx({});
    router.back();
  }

  return (
    <>
      <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
        <LinkIconText
          icon={ArrowBackIcon}
          text="VOLTAR"
          onClick={() => handleBack()}
        />
        <Text fontSize="xs" color="gray.400" fontWeight="bold" pt={5}>
          | PÁGINAS INSTITUCIONAIS
        </Text>
        <Heading as="h2" size="lg" lineHeight={0.8} pb={4}>
          Atualizar Página
        </Heading>

        <Box h="full" boxShadow="md" bg="white" w="full">
          <Box bg="white" p={6} rounded="md">
            <form onSubmit={handleSubmit(handleAtualizar)}>
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
                    fontSize="sm"
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
                  <Controller
                    control={control}
                    defaultValue={getValues("categoria_id")}
                    name="categorias"
                    render={({ field: { onChange, ref } }) => (
                      <Select
                        {...register("categoria_id")}
                        inputRef={ref}
                        onChange={(val) => onChange(val.value)}
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
                    )}
                  />
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
                    fontSize="sm"
                    placeholder="Título da página"
                  />
                </FormControl>
                <FormControl isInvalid={errors.descricao}>
                  <RichTextEditor contentSelected={selectedPageCtx?.content} />
                </FormControl>
                <HStack alignSelf="flex-end">
                  <Button
                    leftIcon={<MdKeyboardBackspace />}
                    color="white"
                    bg="gray.500"
                    _hover={{ bg: "gray.700" }}
                    fontSize="xs"
                    onClick={() => handleBack()}
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
                    Atualizar
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
