import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import SideBar from "../../../components/layout/Sidebar";
import { AiOutlineHome } from "react-icons/ai";
import api from "../../../utils/api";
import RichTextDisplay from "../../../components/_ui/RichTextDisplay";

export default function InstPage({ page, otherpages, catname, catslug }) {
  const sidebar = useDisclosure();
  const navbarMobile = useDisclosure();
  const [contentPageIni, setContentPageIni] = useState(page?.content || []);

  useEffect(() => {
    navbarMobile.onClose();
    setContentPageIni(page?.content);
  }, [page?.content]);

  console.log(page);

  return (
    <Flex
      h="full"
      w="full"
      justifyContent="center"
      px={{ base: 0, md: 10 }}
      py={{ base: 3, md: 10 }}
    >
      <HStack w={{ base: "100%", sm: "60%" }}>
        <SideBar
          display={{ base: "none", md: "unset" }}
          catname={catname}
          catslug={catslug}
          catpages={otherpages}
          type="news"
        />
        <Box
          ml={{ base: 0, md: 60 }}
          transition=".3s ease"
          h="full"
          w="full"
          pr={2}
        >
          <VStack w="full">
            <Box alignSelf="start" px={{ base: 1, md: 5 }}>
              <Breadcrumb
                spacing={{ base: 1, md: 5 }}
                gap={0}
                separator={<ChevronRightIcon color="gray.500" />}
                fontWeight="bold"
                fontSize={{ base: "2xs", md: "sm" }}
                textAlign={{ base: "center", md: "left" }}
                color="gray.800"
                px={1}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <HStack spacing={1}>
                      <AiOutlineHome fontSize="16" />
                      <Text>Home</Text>
                    </HStack>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/noticias/all">
                    <Text>Todas as Notícias</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">
                    <Text>{page?.menuName}</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <VStack w="full">
              <Box w="full" alignSelf="start" px={{ base: 1, md: 5 }} pt={1}>
                <RichTextDisplay
                  titlePage={page?.title}
                  contentPage={contentPageIni}
                  author={page?.User.name}
                  updatedAt={page?.updatedAt}
                  pageType={page?.type}
                />
              </Box>
            </VStack>
          </VStack>
        </Box>
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SideBar w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
      </HStack>
    </Flex>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await api.get("/noticias/getall");
    return {
      paths: data?.pages.map((page) => {
        return {
          params: {
            pagename: page.name,
            catname: page.catnoticia.name,
            catslug: page.catnoticia.slug,
          },
        };
      }),
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const { data: mainpage } = await api.get(
      `/noticias/get/${params?.pagename}`
    );
    const { data: otherpages } = await api.get(
      `/catnoticias/get/${params?.catslug}`
    );

    return {
      props: {
        page: mainpage?.page,
        otherpages: otherpages?.menu.noticias.reverse(),
        catname: otherpages?.menu.name,
        catslug: otherpages?.menu.slug,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
  }
  return {
    props: {},
  };
}
