import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Spacer, Stack } from "@chakra-ui/layout";

export const Header = () => {
    return (
      <Box w="100%" p="4" bg="white" boxShadow="md">
        <Flex align="center" justify="flex-start">
          <Heading>ShipIT!</Heading>
          <Spacer />
          <Stack direction="row" spacing="1em">
            <Link> Home </Link>
            <Link> Orders </Link>
            <Link> Drivers </Link>
            <Link> About </Link>
          </Stack>
          <Spacer />
          <Button variant="base" colorScheme="teal">Login</Button>
          <Button variant="outline" colorScheme="orange">Sign In</Button>
        </Flex>
      </Box>
    );
}

