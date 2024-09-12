import { memo } from 'react'
import { Icon, Button } from '@chakra-ui/react'

function IconTopButton({ iconThumb, disabled, children, ...rest }) {
  return (
    <Button
      display="flex"
      flexDirection="column"
      alignItems="center"
      disabled={disabled}
      py={6}
      {...rest}
    >
      <Icon as={iconThumb} w={6} h={6} />
      {children}
    </Button>
  )
}

export default memo(IconTopButton)
