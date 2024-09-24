import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { CgLoadbarDoc } from "react-icons/cg";
import { BiGroup, BiHistory } from "react-icons/bi";
import { useRouter } from "next/router";
import NextLink from "next/link";

var iconsMap = new Map();
iconsMap.set("CgLoadbarDoc", CgLoadbarDoc);
iconsMap.set("BiGroup", BiGroup);
iconsMap.set("BiHistory", BiHistory);

export default function SideBar(props) {
  const router = useRouter();
  const { catname, catslug, catpages, type } = props;

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: "brand.400",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  return (
    <Box
      as="nav"
      h="full"
      pb="10"
      bg="white"
      _dark={{ bg: "gray.800" }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex
        flexDirection="row"
        w="full"
        bg="brand.600"
        boxShadow="md"
        alignItems="center"
      >
        <Text
          fontSize="md"
          color="whiteAlpha.900"
          fontWeight="semibold"
          textAlign="center"
          w="full"
          py={1}
        >
          {catname}
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="xs"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {type === "news"
          ? catpages?.slice(0, 10).map((cpage) => (
              <NavItem
                key={cpage.id}
                icon={iconsMap.get(cpage.icon)}
                onClick={() =>
                  router.push(`/${cpage.type}/${catslug}/${cpage.name}`)
                }
                w="full"
                justifyContent="space-between"
              >
                <Text fontWeight="light" px={0}>
                  {new Date(cpage.updatedAt).toLocaleDateString()}
                </Text>

                <Text w="full" alignContent="center">
                  {cpage.menuName}
                </Text>
              </NavItem>
            ))
          : catpages?.slice(0, 10).map((cpage) => (
              <NavItem
                key={cpage.id}
                w="full"
                icon={iconsMap.get(cpage.icon)}
                onClick={() =>
                  router.push(`/${cpage.type}/${catslug}/${cpage.name}`)
                }
              >
                {cpage.menuName}
              </NavItem>
            ))}
      </Flex>
      {type === "news" ? (
        <Flex
          w="full"
          justifyContent="center"
          pr={{ base: 6, md: 1 }}
          pt={{ base: 1, md: 2 }}
        >
          <NextLink href="/noticias/all" passHref>
            <Link
              fontSize="xs"
              color="brand.500"
              fontWeight="bold"
              textAlign="left"
            >
              Todas as Notícias...
            </Link>
          </NextLink>
        </Flex>
      ) : (
        ""
      )}
    </Box>
  );
}
