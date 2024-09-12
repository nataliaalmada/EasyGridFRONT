// https://www.slatejs.org/examples/richtext
import { useCallback, useMemo } from "react";
import { Transforms, createEditor } from "slate";
import {
  Editable,
  withReact,
  Slate,
  useSlate,
  useSelected,
  useFocused,
  ReactEditor,
} from "slate-react";
import { withHistory } from "slate-history";
import {
  useColorMode,
  List,
  ListItem,
  OrderedList,
  UnorderedList,
  Heading,
  Text,
  Box,
  Code,
  Image,
  IconButton,
  Flex,
  Divider,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { TbTrashX } from "react-icons/tb";
import withLinks from "./plugins/withLinks";
import LinkSlate from "./components/LinkSlate";

const BlockquoteStyle = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

const Element = (props) => {
  const { attributes, children, element, btnRefResize, onOpenResize } = props;
  switch (element.type) {
    case "block-quote":
      return (
        <Text
          style={BlockquoteStyle}
          borderLeftWidth={"10px"}
          borderLeftColor={"gray.200"}
          {...attributes}
        >
          {children}
        </Text>
      );
    case "list-item":
      return (
        <List spacing={3}>
          <ListItem textAlign={element.align} {...attributes}>
            {children}
          </ListItem>
        </List>
      );
    case "numbered-list":
      return (
        <OrderedList pl={6} textAlign={element.align} {...attributes}>
          <ListItem>{children}</ListItem>
        </OrderedList>
      );
    case "bulleted-list":
      return (
        <UnorderedList pl={6} textAlign={element.align} {...attributes}>
          <ListItem>{children}</ListItem>
        </UnorderedList>
      );
    case "font-size-xs":
      return (
        <Text fontSize="xs" textAlign={element.align} {...attributes}>
          {children}
        </Text>
      );
    case "font-size-sm":
      return (
        <Text fontSize="sm" textAlign={element.align} {...attributes}>
          {children}
        </Text>
      );
    case "font-size-lg":
      return (
        <Text fontSize="lg" textAlign={element.align} {...attributes}>
          {children}
        </Text>
      );
    case "heading-one":
      return (
        <Heading as="h1" size="3xl" textAlign={element.align} {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" size="2xl" textAlign={element.align} {...attributes}>
          {children}
        </Heading>
      );
    case "heading-three":
      return (
        <Heading as="h3" size="xl" textAlign={element.align} {...attributes}>
          {children}
        </Heading>
      );
    case "heading-four":
      return (
        <Heading as="h4" size="lg" textAlign={element.align} {...attributes}>
          {children}
        </Heading>
      );
    case "image":
      return (
        <ImageNew
          alignImage={element.align}
          btnRefResize={btnRefResize}
          onOpenResize={onOpenResize}
          width={element.widthOrigin}
          {...attributes}
          {...props}
        />
      );
    case "link":
      return <LinkSlate {...props} />;
    default:
      return (
        <Text textAlign={element.align} fontSize="sm" {...attributes}>
          {children}
        </Text>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  const { colorMode } = useColorMode();

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <Code
        padding={"3px"}
        backgroundColor={colorMode === "dark" ? "gray.700" : "gray.200"}
        fontSize={"90%"}
      >
        {children}
      </Code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.cblue) {
    children = (
      <Text color="#0D2659" whiteSpace="normal" display="inline">
        {children}
      </Text>
    );
  }
  if (leaf.cred) {
    children = (
      <Text color="red" whiteSpace="normal" display="inline">
        {children}
      </Text>
    );
  }

  return <span {...attributes}>{children}</span>;
};

/* ---- IMAGES ---  */

const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    // const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const DeleteImageButton = ({ format, icon, path }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  return (
    <IconButton
      icon={icon}
      _active={{
        bg: "#dddfe2",
        borderColor: "#bec3c9",
      }}
      display={selected && focused ? "flex" : "none"}
      colorScheme="whiteAlpha"
      position="absolute"
      top="0.5em"
      left="0.5em"
      aria-label={format}
      fontSize={"20px"}
      borderWidth={0}
      textAlign="center"
      onMouseDown={(event) => {
        event.preventDefault();
        Transforms.removeNodes(editor, { at: path });
      }}
    ></IconButton>
  );
};

const ImageNew = ({ attributes, children, element, alignImage }) => {
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  return (
    <Box {...attributes}>
      {children}
      <Flex
        contentEditable={false}
        position="relative"
        justifyContent={alignImage}
      >
        <Image
          src={element.url}
          display="block"
          width={element.widthOrigin || 300}
          boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
          zIndex="0"
        />
        <DeleteImageButton format="image" icon={<TbTrashX />} path={path} />
      </Flex>
    </Box>
  );
};

export default function RichTextDisplay({
  titlePage,
  contentPage,
  author,
  updatedAt,
  pageType,
}) {
  const editor = useMemo(
    () => withLinks(withImages(withHistory(withReact(createEditor())))),
    []
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  if (contentPage) {
    editor.children = contentPage;
  } else {
    contentPage = [
      {
        type: "paragraph",
        children: [{ text: "Noticia com problemas ", bold: true }],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Volte em breve... ",
          },
        ],
      },
    ];
    editor.children = contentPage;
  }

  return (
    <Box w="full" bg="white" borderWidth={"1px"} px={5} py={5}>
      {titlePage && (
        <Heading pb={pageType ? 2 : 5} textAlign="center" size="lg">
          {titlePage}
        </Heading>
      )}
      {pageType && (
        <VStack pb={2} w="full" fontSize="2xs" color="brand.600" lineHeight={1}>
          <HStack alignSelf="flex-start" spacing={1}>
            <Text>Autor:</Text>
            <Text fontWeight="semibold">{author}</Text>
          </HStack>
          <HStack alignSelf="flex-start" spacing={1}>
            <Text>Última modificação:</Text>
            <Text fontWeight="semibold">
              {new Date(updatedAt).toLocaleString()}
            </Text>
          </HStack>
          <Box w="full" pb={2}>
            <Divider border={0.5} />
          </Box>
        </VStack>
      )}
      <Slate editor={editor} value={contentPage} w="full">
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFocus
          readOnly={true}
        />
      </Slate>
    </Box>
  );
}
