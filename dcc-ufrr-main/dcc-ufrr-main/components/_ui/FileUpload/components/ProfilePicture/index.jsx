import { useState, useCallback } from "react";
import {
  Box,
  HStack,
  VStack,
  Button,
  Flex,
  Stack,
  Spacer,
} from "@chakra-ui/react";

import { TbMinus, TbPlus } from "react-icons/tb";
import { MdRotateLeft, MdRotateRight, MdRestore, MdCrop } from "react-icons/md";

import sliderStyle from "./styles/Slider.module.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";

const zoomStep = 0.1;
const maxScale = 5;
const minScale = 1;
const defaultScale = 1;
const defaultRotate = 0;
const imgSize = 250;

export default function ProfilePicture(props) {
  const [file] = useState(props.image);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [setCroppedImage] = useState(null);
  const [scale, setScale] = useState(defaultScale);
  const [rotate, setRotate] = useState(defaultRotate);
  const [version, setVersion] = useState(0);

  const zoomMinCssClasses = [
    sliderStyle["zoom-scale__min"],
    sliderStyle["zoom-scale__icon"],
  ];
  const zoomMaxCssClasses = [
    sliderStyle["zoom-scale__max"],
    sliderStyle["zoom-scale__icon"],
  ];

  function zoomIn() {
    const newScale = scale + zoomStep;
    setScale(newScale <= maxScale ? newScale : maxScale);
  }

  function zoomOut() {
    const newScale = scale - zoomStep;
    setScale(newScale >= minScale ? newScale : minScale);
  }

  function reset() {
    setScale(defaultScale);
    setRotate(0);
    setCrop({ x: 0, y: 0 });
    setVersion(version + 1);
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels, rotate);
      console.log("done", { croppedImage });
      setCroppedImage(croppedImage);

      props.setDefaultImage ? props.setDefaultImage(croppedImage) : "";
      // props.setPreviewIni ? props.setPreviewIni(croppedImage) : ''

      if (props.setFiles) {
        const myFile = new File([croppedImage], "my_image.png", {
          type: croppedImage.type,
          lastModified: new Date().getTime(),
        });
        props.files[myFile.name] = myFile;
        props.setFiles({ ...props.files });
      }

      // Adiciona foto a lista de fotos
      const photos2 = [...props.photos, croppedImage];
      props.setCurrentPhotos(photos2);

      props.onCloseEditModal ? props.onCloseEditModal() : "";
      props.onCloseMainModal ? props.onCloseMainModal() : "";
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotate]);

  return (
    <VStack alignItems="center" gap={5}>
      <Box
        position="relative"
        margin="0px auto"
        w={imgSize + 250}
        h={imgSize + 150}
      >
        <Cropper
          image={file}
          crop={crop}
          rotation={rotate}
          zoom={scale}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotate}
          onCropComplete={onCropComplete}
          onZoomChange={setScale}
          cropShape="round"
          restrictPosition={false}
        />
      </Box>
      <Box>
        <HStack gap={10}>
          <Box className={sliderStyle["zoom-scale"]}>
            <TbMinus
              size={24}
              onClick={() => zoomOut()}
              className={zoomMinCssClasses.join(" ")}
            />
            <input
              type="range"
              className={sliderStyle["zoom-scale__handler"]}
              max={maxScale}
              min={minScale}
              step={zoomStep}
              value={scale}
              onChange={(event) => setScale(event.target.value)}
              // eslint-disable-next-line react/no-unknown-property
              webkit="none"
              display="block"
              // eslint-disable-next-line react/no-unknown-property
              margin="0 auto"
              width="100%"
              height="18px"
              // eslint-disable-next-line react/no-unknown-property
              background="transparent"
            />
            <TbPlus
              size={24}
              onClick={() => zoomIn()}
              className={zoomMaxCssClasses.join(" ")}
            />
          </Box>
          <Box className={sliderStyle["zoom-scale"]}>
            <MdRotateLeft
              viewBox="0 0 28 28"
              className={zoomMinCssClasses.join(" ")}
            />
            <input
              type="range"
              className={sliderStyle["zoom-scale__handler"]}
              max={90}
              min={-90}
              defaultValue={0}
              step={0.1}
              value={rotate}
              onChange={(event) => setRotate(event.target.value)}
            />
            <MdRotateRight
              viewBox="0 0 29 29"
              className={zoomMaxCssClasses.join(" ")}
            />
          </Box>
          <Box>
            <Button
              justify="center"
              size="small"
              px={1}
              leftIcon={<MdRestore viewBox="0 0 29 29" mr={-2} mt={1} />}
              variant="solid"
              onClick={() => reset()}
            >
              Reset
            </Button>
            {/* <Button onClick={showCroppedImage}>Show Result</Button> */}
          </Box>
        </HStack>
      </Box>
      <Box w="100%" borderTop="1.5px solid lightgray" pt={2} pb={1}>
        <Flex alignItems="center">
          <Stack direction="row" spacing={4}></Stack>
          <Spacer />
          <Box>
            <Button leftIcon={<MdCrop />} onClick={showCroppedImage}>
              Cortar foto
            </Button>
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
