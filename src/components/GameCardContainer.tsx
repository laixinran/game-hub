import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

//pass a gamecard or gamecard skeleton as a child to this component
interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden" width="300px">
      {children}
    </Box>
  );
};

export default GameCardContainer;
