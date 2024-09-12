import { useRef, useState, memo } from 'react'
import {
  Text,
  Flex,
  Button,
  Input,
  Image,
  Table,
  Tbody,
  Tr,
  Td
} from '@chakra-ui/react'

import { MdUploadFile, MdDelete, MdPictureAsPdf} from 'react-icons/md' 
import { TbFileZip } from 'react-icons/tb'

import customStyle from '../styles/customStyle'

const KILO_BYTES_PER_BYTE = 1000
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 4000000 //4mb

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key])

// const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE)

function FileUpload({
  dragDrop,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  preview,
  ...otherProps
}) {
  const fileInputField = useRef(null)
  const [files, setFiles] = useState({})

  const handleUploadBtnClick = () => {
    fileInputField.current.click()
  }

  // AQUI É REALIZADO AS VALIDAÇÕES
  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file }
        }
        files[file.name] = file
      } else {
        console.log(
          `Erro: Limite de arquivo excedido (Max: ${
            DEFAULT_MAX_FILE_SIZE_IN_BYTES / (KILO_BYTES_PER_BYTE * 1000)
          }mb)`
        )
      }
    }
    return { ...files }
  }

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files)
    updateFilesCb(filesAsArray)
  }

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles)
      setFiles(updatedFiles)
      callUpdateFilesCb(updatedFiles)
    }
  }

  const removeFile = (fileName) => {
    delete files[fileName]
    setFiles({ ...files })
    callUpdateFilesCb({ ...files })
  }

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
          title=""
          value=""
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
          Upload {otherProps.multiple ? 'files' : 'a file'}
        </Button>
      </Flex>
      {!preview || (
        <Flex mt={2}>
          <Table size="sm">
            <Tbody>
              {Object.keys(files).map((fileName, index) => {
                let file = files[fileName]
                let isImageFile = file.type.split('/')[0] === 'image'
                let isPdfFile = file.type.split('/')[1] === 'pdf'
                let isZipFile = file.type.split('/')[1] === 'zip'

                return (
                  <Tr key={fileName}>
                    <Td>
                      {isImageFile && (
                        <Image
                          w="30px"
                          src={URL.createObjectURL(file)}
                          alt={`file preview ${index}`}
                        />
                      )}
                      {isPdfFile && <MdPictureAsPdf />}
                      {isZipFile && <TbFileZip />}
                    </Td>
                    <Td>{file.name}</Td>
                    <Td>
                      <MdDelete
                        onClick={() => removeFile(fileName)}
                        _hover={{ opacity: 0.6 }}
                        _focus={{ boxShadow: 'outline' }}
                      />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Flex>
      )}
    </Flex>
  )
}

export default memo(FileUpload)
