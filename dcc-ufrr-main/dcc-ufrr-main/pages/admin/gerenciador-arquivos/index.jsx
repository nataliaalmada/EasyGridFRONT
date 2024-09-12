// https://codesandbox.io/s/github/anuraghazra/react-folder-tree?file=/src/App.js:1615-1686
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import LinkIconText from "../../../components/_ui/LinkIconText";
import Tree from "../../../components/_ui/TreeDirectory/Tree";
import { useState } from "react";
import { MdWarning } from "react-icons/md";

const dataJson = [
  {
    type: "folder",
    name: "Páginas Institucionais",
    files: [
      {
        type: "folder",
        name: "ui",
        files: [
          { type: "file", name: "Toggle.js" },
          { type: "file", name: "Button.js" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      {
        type: "folder",
        name: "components",
        files: [
          { type: "file", name: "Tree.js" },
          { type: "file", name: "Tree.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "setupTests.js" },
    ],
  },
  {
    type: "folder",
    name: "Notícias",
    files: [
      {
        type: "file",
        name: "main.js",
      },
    ],
  },
  { type: "file", name: "index.js" },
];

export default function GerenciarDeArquivos() {
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  let [data, setData] = useState(dataJson);

  const handleClick = (node) => {
    console.log(node);
  };
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  return (
    <VStack w={{ base: "100%", sm: "80%" }} alignItems="flex-start">
      <LinkIconText
        icon={ArrowBackIcon}
        text="VOLTAR"
        onClick={() => router.back()}
      />
      <HStack>
        <Heading>Gerenciador de Arquivos</Heading>
        <HStack color="red">
          <MdWarning size={20} />
          <Text>Em desenvolvimento</Text>
        </HStack>
      </HStack>
      <Box h="full" boxShadow="md" bg="white" w="full">
        <Box bg="white" p={6} rounded="md" h={400}>
          <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />
        </Box>
      </Box>
    </VStack>
  );
}
