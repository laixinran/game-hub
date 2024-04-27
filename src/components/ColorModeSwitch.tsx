import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  //toggleColorMode: a function, toggleColorMode 函数的作用是在这两种模式之间进行切换
  //colorMode: a property, which represents the current mode
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    //Horizontal Stack: we want to layout our content horizontally
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
