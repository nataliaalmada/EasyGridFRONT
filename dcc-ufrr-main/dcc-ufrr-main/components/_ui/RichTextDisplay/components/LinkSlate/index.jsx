import { Text } from "@chakra-ui/react";

const LinkSlate = ({ attributes, element, children }) => {

  return (
    <Text display="inline">
      <a {...attributes} href={element.href}>
        {children}
      </a>
    </Text>
  );
};

export default LinkSlate;
