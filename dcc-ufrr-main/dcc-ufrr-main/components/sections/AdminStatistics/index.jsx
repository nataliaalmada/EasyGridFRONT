import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { BsPerson, BsMegaphone, BsBank } from "react-icons/bs";
// import LineChar from "./LineChart";

function StatsCard(props) {
  const { title, stat, icon, color } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={color}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"} gap={3}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} color={color}>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} color={color} alignContent={"center"}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function AdminStatistics({
  pagesSize,
  noticiasSize,
  usersSize,
}) {
  return (
    <Box w="full" mx={"auto"} px={{ base: 5, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Páginas Institucionais"}
          stat={pagesSize}
          icon={<BsBank size={"3em"} />}
          color="#ff7d00"
        />
        <StatsCard
          title={"Notícias"}
          stat={noticiasSize}
          icon={<BsMegaphone size={"3em"} />}
          color="#00a6fb"
        />
        <StatsCard
          title={"Usuários"}
          stat={usersSize}
          icon={<BsPerson size={"3em"} />}
          color="#4ad66d"
        />
      </SimpleGrid>
    </Box>
  );
}
