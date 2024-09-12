import { useSelected, useFocused, useSlateStatic } from "slate-react";
import { FiExternalLink } from "react-icons/fi";
import { MdLinkOff } from "react-icons/md";
import { removeLink } from "../../utils/link";
import { Button, Flex, Text } from "@chakra-ui/react";

const LinkSlate = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <Text display="inline">
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <Flex
          position="absolute"
          left={0}
          alignItems="center"
          bg="white"
          padding="6px 10px"
          gap="10px"
          borderRadius="6px"
          border="1px solid lightgray"
          contentEditable={false}
        >
          <a
            href={element.href}
            display="flex"
            rel="noreferrer"
            target="_blank"
          >
            <FiExternalLink />
            {element.href}
          </a>
          <Button
            border="none"
            bg="transparent"
            _hover={{ color: "rebeccapurple", cursor: "pointer" }}
            onClick={() => removeLink(editor)}
          >
            <MdLinkOff />
          </Button>
        </Flex>
      )}
    </Text>
  );
};

export default LinkSlate;
