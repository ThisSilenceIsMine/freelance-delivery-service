import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link as Link, Spacer, Stack } from "@chakra-ui/layout";
import NextLink from 'next/link';

export const Header = () => {
    return (
      // <Box w="100%" p="4" bg="white" boxShadow="md">
      <Flex
        w="100%"
        p="4"
        bg="white"
        direction={['column', 'row', 'row', 'row']}
        boxShadow="md"
        justify="flex-start"
        align="center"
      >
        <Box>
          <Heading>ShipIT!</Heading>
        </Box>
        <Spacer />
        <Stack direction={['column', 'row', 'row', 'row']} spacing="1em">
          <Link as={NextLink} href="/">
            Home
          </Link>
          <Link as={NextLink} href="/orders">
            Orders
          </Link>
          <Link as={NextLink} href="/drivers">
            Drivers
          </Link>
          <Link as={NextLink} href="/about">
            About
          </Link>
        </Stack>
        <Spacer />
        <Button variant="base" colorScheme="teal">
          Login
        </Button>
        <Button variant="outline" colorScheme="orange">
          Sign In
        </Button>
      </Flex>
      // </Box>
    );
}

