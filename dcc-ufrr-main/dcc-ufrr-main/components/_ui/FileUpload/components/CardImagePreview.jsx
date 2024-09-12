import { memo } from 'react'
import { Flex, Center, Text } from '@chakra-ui/react'
import { MdCamera } from 'react-icons/md'

function CardPreviewImage({ loading, preview, size, change }) {
  const showLoading = loading && !preview

  return (
    <>
      <Center
        w={size}
        h={size}
        backgroundSize="cover"
        backgroundPosition="center center"
        rounded="50%"
        cursor={change ? 'pointer' : ''}
        backgroundImage={`url(${preview})`}
        role="group"
      >
        <Flex
          bg="black"
          opacity="0.7"
          color="white"
          w={size}
          h={size / 2}
          position="relative"
          top={size * 0.26666667}
          borderBottomLeftRadius={size / 2}
          borderBottomRightRadius={size / 2}
          direction="column"
          align="center"
          visibility="hidden"
          hidden={change ? false : true}
          _groupHover={{ visibility: 'visible' }}
        >
          <MdCamera />
          <Text>Trocar foto</Text>
        </Flex>

        {showLoading && <Flex text="Carregando..." />}
      </Center>
    </>
  )
}

export default memo(CardPreviewImage)
