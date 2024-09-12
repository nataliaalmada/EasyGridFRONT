import { useRef, useState, memo, useEffect } from "react";
import {
  Text,
  Flex,
  Button,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";

import { MdUploadFile } from "react-icons/md";

import customStyle from "../styles/customStyle";
import api from "../../../../utils/api";
import CardImage from "../../CardImage";
import { usePageInstCtx } from "../../../../contexts/PageInstContext";

function FileUploadEdit({
  dragDrop,
  insertImage,
  editor,
  handleClose,
  handleSelect,
  ...otherProps
}) {
  const { imagesDataCtx, loadImagesDataCtx } = usePageInstCtx();

  const fileInputField = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(imagesDataCtx);
  }, []);

  const fileUploadRequest = (fileToUpload) => {
    const form = new FormData();
    form.append("file", fileToUpload);
    api
      .post("/public/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        loadImagesDataCtx();
        setFiles(imagesDataCtx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const fileValid = newFiles.item(0);
      fileUploadRequest(fileValid);
    }
  };


  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex {...(!dragDrop || customStyle.dragStyle)}>
        {!dragDrop || (
          <Text letterSpacing={1} fontSize="xs">
            Araste e solte seu arquivo aqui ou
          </Text>
        )}
        <Input
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          style={customStyle.inputStyle}
          hidden={!dragDrop ? true : false}
          {...otherProps}
        />
        <Button
          leftIcon={<MdUploadFile />}
          py="1.1em"
          px="2.8em"
          textAlign="center"
          textTransform="uppercase"
          type="button"
          onClick={handleUploadBtnClick}
          alignSelf="center"
        >
          Enviar {otherProps.multiple ? "Arquivo" : "Arquivo"}
        </Button>
      </Flex>
      <SimpleGrid columns={4} spacing={5} p={5} overflowY="scroll" maxH={580}>
        {imagesDataCtx.map((file, index) => {
          return (
            <CardImage
              key={index}
              imageData={file}
              insertImage={insertImage}
              editor={editor}
              handleSelect={handleSelect}
              handleClose={handleClose}
            />
          );
        })}
      </SimpleGrid>
    </Flex>
  );
}

export default memo(FileUploadEdit);
