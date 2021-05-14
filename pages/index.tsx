import { Button, ButtonGroup } from "@chakra-ui/button";
import { Container, Heading, Flex, Spacer } from "@chakra-ui/layout";


export default function Home() {
  return (
    <Container maxW="container.lg" centerContent={true}>
      <Heading mt="10" size="2xl" sx={{ color: 'teal' }}>
        Знайдіть водія для своїх потреб!
      </Heading>
      <Heading size="lg" sx={{ color: 'grey' }} maxW="70ch" mt="20">
        Потрібно щось перевезти? Наша платформа допоможе з цим!
      </Heading>
      <Flex direction={['column', 'row', 'row', 'row']} justify="center" align="center" mt="10">
        <ButtonGroup spacing='4'>
          <Button variant="solid" colorScheme="teal">
            Знайти водія
          </Button>
          <Button variant="outline" colorScheme="orange">
            Знайти роботу
          </Button>
        </ButtonGroup>
      </Flex>
    </Container>
  );
}
