import NextLink from 'next/link';
import { Button, ButtonGroup, Container, Heading, Flex, Center, VStack } from '@chakra-ui/react';
import { BackgroundImage } from '@components/BackgroundImage';

export default function Home() {
  return (
    <>
      <BackgroundImage src="/bg_alt.jpg" />
      {/* <Container maxW="container.lg" minH="90vh" centerContent={true}> */}
      <Center maxW="full" minH="90vh">
        <VStack spacing="32">
          <Heading mt="10" size="2xl" sx={{ color: 'orange.400' }}>
            Знайдіть водія для своїх потреб!
          </Heading>
          <Heading size="lg" sx={{ color: 'white' }} maxW="70ch" mt="20">
            Потрібно щось перевезти? Наша платформа допоможе з цим!
          </Heading>
          <Flex direction={['column', 'row', 'row', 'row']} justify="center" align="center" mt="10">
            <ButtonGroup spacing="4">
              <NextLink href="/drivers">
                <Button variant="solid" colorScheme="teal">
                  Знайти водія
                </Button>
              </NextLink>
              <NextLink href="/orders">
                <Button variant="outline" colorScheme="orange">
                  Знайти роботу
                </Button>
              </NextLink>
            </ButtonGroup>
          </Flex>
        </VStack>
      </Center>

      {/* </Container> */}
    </>
  );
}
