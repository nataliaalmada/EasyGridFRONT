import { IconButton, Tooltip } from "@chakra-ui/react";
import { useSlateStatic } from "slate-react";
import { insertLink } from "../../utils/link";

export default function ButtonInsertLink({ format, icon }) {
  const editor = useSlateStatic();

  const handleInsertLink = () => {
    const url = prompt("Enter com a URL (COLOQUE http:// ou https://)");
    insertLink(editor, url);
  };

  return (
    <Tooltip label="Inserir Link" placement="top">
      <IconButton
        icon={icon}
        variant="outline"
        colorScheme="blue"
        onMouseDown={(event) => {
          event.preventDefault();
          handleInsertLink();
        }}
        aria-label={format}
        borderWidth={0}
        fontSize={"20px"}
      ></IconButton>
    </Tooltip>
  );
}
