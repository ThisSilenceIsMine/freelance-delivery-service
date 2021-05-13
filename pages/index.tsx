import { Container, Heading } from "@chakra-ui/layout";

export default function Home() {
  return (
    <Container maxW="container.lg" centerContent={true}>
      <Heading mt="10" size="2xl" sx={{ color: 'teal' }}>
        Знайдіть водія для своїх потреб!
      </Heading>
      <Heading size="lg" sx={{ color: 'grey' }} maxW="70ch" mt="20">
          Потрібно щось перевезти? Наша платформа допоможе з цим!

      </Heading>
    </Container>
  );
}
