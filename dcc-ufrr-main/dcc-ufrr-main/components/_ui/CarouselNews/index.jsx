import { useState, useEffect } from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

const slides = [
  {
    img: "/images/banners/01.jpg",
    label: "Banner 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/02.jpg",
    label: "Banner 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/03.jpg",
    label: "Banner 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/04.jpg",
    label: "Banner 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/05.jpg",
    label: "Banner 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/06.jpg",
    label: "Banner 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/07.png",
    label: "Banner 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
  {
    img: "/images/banners/08.jpg",
    label: "Banner 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia viverra erat ac tempor. Curabitur neque lectus, mattis vitae enim ac, scelerisque porttitor risus.",
  },
];

const arrowStyles = {
  cursor: "pointer",
  pos: "absolute",
  top: "50%",
  w: "auto",
  mt: "-22px",
  p: "16px",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  userSelect: "none",
  _hover: {
    opacity: 0.8,
    bg: "black",
  },
};

export default function CarouselNews() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 6000;
  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);

  return (
    <Flex
      w="98%"
      alignItems="flex-start"
      justifyContent="center"
      flexDirection="column"
    >
      <Flex
        w="full"
        pos="relative"
        overflow="hidden"
        justifyContent="flex-start"
      >
        <Flex w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="contain"
              />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", null, "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}
