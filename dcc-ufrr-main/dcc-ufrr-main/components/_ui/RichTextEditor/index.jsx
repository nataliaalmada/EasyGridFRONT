// https://www.slatejs.org/examples/richtext
// https://blog.logrocket.com/building-photo-gallery-app-from-scratch-chakra-ui/
// https://www.npmjs.com/package/react-upload-gallery
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import isHotkey from "is-hotkey";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
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
  IconButton,
  HStack,
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
  Flex,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  MdAddLink,
  MdCheck,
  MdCode,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatColorText,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatSize,
  MdFormatUnderlined,
  MdImage,
} from "react-icons/md";
import { TbTrashX, TbResize } from "react-icons/tb";
import { usePageInstCtx } from "../../../contexts/PageInstContext";
import { FileUploadEdit } from "../FileUpload";
import ButtonInsertLink from "./components/ButtonInsertLink";
import withLinks from "./plugins/withLinks";
import LinkSlate from "./components/LinkSlate";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GoTextSize } from "react-icons/go";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const BlockquoteStyle = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

const isBlockActive = (editor, format) => {
  const nodeGen = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  let node = nodeGen.next();
  while (!node.done) {
    return true;
  }
  return false;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Tooltip label={format} placement="top">
      <IconButton
        variant="outline"
        colorScheme="blue"
        isActive={isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        )}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        aria-label={format}
        icon={icon}
        borderWidth={0}
        fontSize={"20px"}
      />
    </Tooltip>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Tooltip label={format} placement="top">
      <IconButton
        variant="outline"
        colorScheme="blue"
        isActive={isMarkActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        aria-label={format}
        icon={icon}
        borderWidth={0}
        fontSize={"20px"}
      />
    </Tooltip>
  );
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

const getFromStorage = (key) => {
  if (typeof window !== "undefined") {
    window.localstorage?.getItem(key);
  }
};

/** TABLE  */
// const withTables = (editor) => {
//   const { deleteBackward, deleteForward, insertBreak } = editor;

//   editor.deleteBackward = (unit) => {
//     const { selection } = editor;

//     if (selection && Range.isCollapsed(selection)) {
//       const [cell] = Editor.nodes(editor, {
//         match: (n) =>
//           !Editor.isEditor(n) &&
//           SlateElement.isElement(n) &&
//           n.type === "table-cell",
//       });

//       if (cell) {
//         const [, cellPath] = cell;
//         const start = Editor.start(editor, cellPath);

//         if (Point.equals(selection.anchor, start)) {
//           return;
//         }
//       }
//     }

//     deleteBackward(unit);
//   };

//   editor.deleteForward = (unit) => {
//     const { selection } = editor;

//     if (selection && Range.isCollapsed(selection)) {
//       const [cell] = Editor.nodes(editor, {
//         match: (n) =>
//           !Editor.isEditor(n) &&
//           SlateElement.isElement(n) &&
//           n.type === "table-cell",
//       });

//       if (cell) {
//         const [, cellPath] = cell;
//         const end = Editor.end(editor, cellPath);

//         if (Point.equals(selection.anchor, end)) {
//           return;
//         }
//       }
//     }

//     deleteForward(unit);
//   };

//   editor.insertBreak = () => {
//     const { selection } = editor;

//     if (selection) {
//       const [table] = Editor.nodes(editor, {
//         match: (n) =>
//           !Editor.isEditor(n) &&
//           SlateElement.isElement(n) &&
//           n.type === "table",
//       });

//       if (table) {
//         return;
//       }
//     }

//     insertBreak();
//   };

//   return editor;
// };

/* ---- IMAGES ---  */
const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
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

const ImageNew = ({
  attributes,
  children,
  element,
  alignImage,
  btnRefResize,
  onOpenResize,
}) => {
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
        {console.log(element)}
        <Image
          src={element.url}
          display="block"
          width={element.widthOrigin || 300}
          boxShadow={selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
          zIndex="0"
        />
        <VStack position="absolute" top="0.5em" left="0.5em">
          <DeleteImageButton format="image" icon={<TbTrashX />} path={path} />
          <ResizeImageButton
            format="image"
            icon={<TbResize />}
            btnRefResize={btnRefResize}
            onOpenResize={onOpenResize}
            element={element}
          />
        </VStack>
      </Flex>
    </Box>
  );
};

const InsertImageButton = ({ format, icon, onOpenUpload }) => {
  const editor = useSlate();

  return (
    <Tooltip label="Inserir Imagem" placement="top">
      <IconButton
        icon={icon}
        variant="outline"
        colorScheme="blue"
        isActive={isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        )}
        onMouseDown={(event) => {
          event.preventDefault();
          onOpenUpload();
        }}
        aria-label={format}
        borderWidth={0}
        fontSize={"20px"}
      ></IconButton>
    </Tooltip>
  );
};

const DeleteImageButton = ({ format, icon, path }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  return (
    <Tooltip label="Deletar Imagem" fontSize="xs" placement="right">
      <IconButton
        icon={icon}
        display={selected && focused ? "flex" : "none"}
        colorScheme="blackAlpha"
        aria-label={format}
        fontSize={"20px"}
        borderWidth={0}
        textAlign="center"
        onMouseDown={(event) => {
          event.preventDefault();
          Transforms.removeNodes(editor, { at: path });
        }}
      />
    </Tooltip>
  );
};

const ResizeImageButton = ({
  format,
  icon,
  btnRefResize,
  onOpenResize,
  element,
}) => {
  const selected = useSelected();
  const focused = useFocused();

  const { setImgResizeCtx } = usePageInstCtx();
  return (
    <Tooltip label="Resize Imagem" fontSize="xs" placement="right">
      <IconButton
        icon={icon}
        display={selected && focused ? "flex" : "none"}
        colorScheme="blackAlpha"
        aria-label={format}
        fontSize={"20px"}
        borderWidth={0}
        textAlign="center"
        ref={btnRefResize}
        onMouseDown={(event) => {
          event.preventDefault();
          setImgResizeCtx(element);
          onOpenResize();
        }}
      />
    </Tooltip>
  );
};

/* ---- END IMAGES ---  */

export default function RichTextEditor({ contentSelected }) {
  const initialContent = useMemo(
    () =>
      (getFromStorage("content-cms") &&
        JSON.parse(getFromStorage("content-cms"))) || [
        {
          type: "paragraph",
          children: [{ text: "Um exemplo de texto em um parágrafo..." }],
        },
      ],
    []
  );

  const { createFlagCtx, loadImagesDataCtx, imgResizeCtx } = usePageInstCtx();

  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload,
  } = useDisclosure();

  const {
    isOpen: isOpenResize,
    onOpen: onOpenResize,
    onClose: onCloseResize,
  } = useDisclosure();

  const btnRefResize = useRef();

  const editor = useMemo(
    () => withLinks(withImages(withHistory(withReact(createEditor())))),
    []
  );

  const [value, setValue] = useState(
    createFlagCtx ? initialContent : contentSelected
  );
  const renderElement = useCallback(
    (props) => (
      <Element
        btnRefResize={btnRefResize}
        onOpenResize={onOpenResize}
        {...props}
      />
    ),
    []
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // eslint-disable-next-line no-unused-vars
  const [focused, setFocused] = useState(false);
  const savedSelection = useRef(editor.selection);

  useEffect(() => {
    if (createFlagCtx) {
      setValue(initialContent);
    } else {
      setValue(contentSelected);
    }
  });

  const onFocus = useCallback(() => {
    setFocused(true);
    if (!editor.selection && value?.length) {
      Transforms.select(
        editor,
        savedSelection.current ?? Editor.end(editor, [])
      );
    }
  }, [editor]);

  const onBlur = useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);

  const divRef = useRef(null);

  const focusEditor = useCallback(
    (e) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );

  const onKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  function handleClose() {
    onCloseUpload();
    loadImagesDataCtx();
  }
  const [sliderValue, setSliderValue] = useState(100);
  const [widthImgValue, setWidthImgValue] = useState(400);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  function handleSlider(val) {
    setSliderValue(val);
    let nw = (sliderValue * 300) / 100;
    setWidthImgValue(nw);
  }

  function handleSaveDrawer() {
    const path = ReactEditor.findPath(editor, imgResizeCtx);
    let variable = "widthOrigin";
    const newImage = { ...imgResizeCtx, [variable]: widthImgValue };
    console.log(newImage);
    Transforms.removeNodes(editor, { at: path });
    Transforms.insertNodes(editor, newImage);
    onCloseResize();
  }

  return (
    <Box ref={divRef} onMouseDown={focusEditor} borderWidth={"1px"}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            const content = JSON.stringify(value);
            localStorage.setItem("content-cms", content);
          }
        }}
      >
        <HStack
          borderWidth={"0 0 1px 0"}
          padding={"10px 5px"}
          spacing={"5px"}
          wrap={"wrap"}
          bg="white"
          position="sticky"
          top="0"
          zIndex={200}
        >
          <MarkButton format="bold" icon={<MdFormatBold />} />
          <MarkButton format="italic" icon={<MdFormatItalic />} />
          <MarkButton format="underline" icon={<MdFormatUnderlined />} />
          <MarkButton format="code" icon={<MdCode />} />
          <MarkButton
            format="cblue"
            icon={<MdFormatColorText color="#0D2659" />}
          />
          <MarkButton format="cred" icon={<MdFormatColorText color="red" />} />
          <Menu>
            <Tooltip label="Tamanho da Fonte" placement="top">
              <MenuButton
                as={Button}
                rightIcon={
                  <HStack spacing={0}>
                    <GoTextSize /> <ChevronDownIcon />
                  </HStack>
                }
                variant="outline"
                colorScheme="blue"
                borderWidth={0}
                px={1}
              />
            </Tooltip>
            <MenuList>
              <MenuItem
                fontSize="xs"
                onClick={() => {
                  toggleBlock(editor, "font-size-xs");
                }}
              >
                <HStack>
                  <Text>Pequeno</Text>
                  {isBlockActive(
                    editor,
                    "font-size-xs",
                    TEXT_ALIGN_TYPES.includes("font-size-xs") ? "align" : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
              <MenuItem
                fontSize="sm"
                onClick={() => {
                  toggleBlock(editor, "font-size-sm");
                }}
              >
                <HStack>
                  <Text>Médio</Text>
                  {isBlockActive(
                    editor,
                    "font-size-sm",
                    TEXT_ALIGN_TYPES.includes("font-size-sm") ? "align" : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
              <MenuItem
                fontSize="lg"
                onClick={() => {
                  toggleBlock(editor, "font-size-lg");
                }}
              >
                <HStack>
                  <Text>Grande</Text>
                  {isBlockActive(
                    editor,
                    "font-size-lg",
                    TEXT_ALIGN_TYPES.includes("font-size-lg") ? "align" : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <Tooltip label="Tamanho da Título" placement="top">
              <MenuButton
                as={Button}
                rightIcon={
                  <HStack spacing={0}>
                    <MdFormatSize /> <ChevronDownIcon />
                  </HStack>
                }
                variant="outline"
                colorScheme="blue"
                borderWidth={0}
                px={1}
              />
            </Tooltip>
            <MenuList fontSize="xs">
              <MenuItem
                onClick={() => {
                  toggleBlock(editor, "heading-one");
                }}
              >
                <HStack>
                  <Text>H1</Text>
                  {isBlockActive(
                    editor,
                    "heading-one",
                    TEXT_ALIGN_TYPES.includes("heading-one") ? "align" : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleBlock(editor, "heading-two");
                }}
              >
                <HStack>
                  <Text>H2</Text>
                  {isBlockActive(
                    editor,
                    "heading-two",
                    TEXT_ALIGN_TYPES.includes("heading-two") ? "align" : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleBlock(editor, "heading-three");
                }}
              >
                <HStack>
                  <Text>H3</Text>
                  {isBlockActive(
                    editor,
                    "heading-three",
                    TEXT_ALIGN_TYPES.includes("heading-three")
                      ? "align"
                      : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  toggleBlock(editor, "heading-four");
                }}
              >
                <HStack>
                  <Text>H4</Text>
                  {isBlockActive(
                    editor,
                    "heading-four",
                    TEXT_ALIGN_TYPES.includes("heading-four") ? "align" : "type"
                  ) ? (
                    <MdCheck />
                  ) : (
                    ""
                  )}
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>

          <BlockButton format="block-quote" icon={<MdFormatQuote />} />
          <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
          <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
          <BlockButton format="left" icon={<MdFormatAlignLeft />} />
          <BlockButton format="center" icon={<MdFormatAlignCenter />} />
          <BlockButton format="right" icon={<MdFormatAlignRight />} />
          <BlockButton format="justify" icon={<MdFormatAlignJustify />} />
          <InsertImageButton
            format="image"
            icon={<MdImage />}
            onOpenUpload={onOpenUpload}
          />
          <ButtonInsertLink format="link" icon={<MdAddLink />} />
        </HStack>
        <Box padding={"15px 5px"}>
          <Editable
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            style={{ minHeight: "150px", resize: "vertical", overflow: "auto" }}
          />
        </Box>
      </Slate>
      <Modal isOpen={isOpenUpload} onClose={onCloseUpload} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Escolha ou envie uma imagem...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" align="center">
              <Center flexDirection="column" gap="10">
                <FileUploadEdit
                  accept="image/*"
                  imgEdit={false}
                  dragDrop={true}
                  multiple={true}
                  preview={false}
                  insertImage={insertImage}
                  editor={editor}
                  handleClose={handleClose}
                />
              </Center>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isOpenResize}
        placement="right"
        onClose={onCloseResize}
        finalFocusRef={btnRefResize}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Resize Imagem</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Box w={400} pt={6} pb={10}>
                <Slider
                  aria-label="slider-ex-6"
                  min={10}
                  max={200}
                  onChange={(val) => handleSlider(val)}
                >
                  <SliderMark value={50} {...labelStyles}>
                    50%
                  </SliderMark>
                  <SliderMark value={100} {...labelStyles}>
                    100%
                  </SliderMark>
                  <SliderMark value={150} {...labelStyles}>
                    150%
                  </SliderMark>
                  <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="12"
                  >
                    {sliderValue}%
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>

              <Box>
                <Box>
                  <Image
                    id="inputImage"
                    width={`${widthImgValue}px`}
                    src={imgResizeCtx?.url}
                  />
                </Box>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseResize}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSaveDrawer}>
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
