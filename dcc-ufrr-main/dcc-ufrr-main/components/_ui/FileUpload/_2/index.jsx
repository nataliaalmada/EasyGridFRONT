import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Spacer,
  Stack,
  Input
} from '@chakra-ui/react'

import { useRef } from 'react'


import { TbPencil } from 'react-icons/tb'
import { MdDelete, MdCamera } from 'react-icons/md' 

import CardImagePreview from '../components/CardImagePreview'
import IconTopButton from '../components/IconTopButton'

import ProfilePicture from '../components/ProfilePicture'
import customStyle from '../styles/customStyle'

const avatarDefault = '/images/camera-photo.svg'

export default function FileUploadAvatar({
  defaultImage,
  setDefaultImage,
  photos,
  setCurrentPhotos
}) {
  const profilePictureRef = useRef()
  const fileInputField = useRef()
  // const [preview, setPreview] = useState(defaultImage)

  const {
    isOpen: isOpenMainModal,
    onOpen: onOpenMainModal,
    onClose: onCloseMainModal
  } = useDisclosure()
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal
  } = useDisclosure()

  const handleUploadBtnClick = () => {
    fileInputField.current.click()
  }

  const handleNewFileUpload = (e) => {
    setDefaultImage(URL.createObjectURL(e.target.files[0]))
    onOpenEditModal()
  }

  const handleRemovePic = () => {
    // setPreview(avatarDefault)
    // setPreviewIni(avatarDefault)
    setDefaultImage(avatarDefault)
    onCloseEditModal()
    onCloseMainModal()
  }

  return (
    <Box>
      <Box onClick={onOpenMainModal}>
        <CardImagePreview preview={defaultImage} size={150} change />
      </Box>

      <Modal size="xl" isOpen={isOpenMainModal} onClose={onCloseMainModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Foto do Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center">
              <CardImagePreview preview={defaultImage} size={210} />
            </Flex>
          </ModalBody>

          <ModalFooter borderTop="1.5px solid lightgray" mt={4}>
            <Flex w="100%" alignItems="center">
              <Stack direction="row" spacing={4}>
                <IconTopButton
                  iconThumb={TbPencil}
                  onClick={onOpenEditModal}
                  disabled={defaultImage === avatarDefault ? true : false}
                >
                  Editar
                </IconTopButton>
                <Flex>
                  <Input
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    style={customStyle.inputStyle}
                    hidden={true}
                  />
                  <IconTopButton
                    iconThumb={MdCamera}
                    onClick={handleUploadBtnClick}
                  >
                    Adicionar foto
                  </IconTopButton>
                </Flex>
              </Stack>
              <Spacer />
              <Box>
                <IconTopButton
                  iconThumb={MdDelete}
                  onClick={handleRemovePic}
                >
                  Excluir
                </IconTopButton>
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal size="xl" isOpen={isOpenEditModal} onClose={onCloseEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Foto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center">
              <Box>
                <ProfilePicture
                  ref={profilePictureRef}
                  image={defaultImage}
                  setDefaultImage={setDefaultImage}
                  onCloseEditModal={onCloseEditModal}
                  onCloseMainModal={onCloseMainModal}
                  photos={photos}
                  setCurrentPhotos={setCurrentPhotos}
                />
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
