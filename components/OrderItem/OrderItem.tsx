import { Box, Heading, Wrap } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"

export interface Props {
    header: string;
    tags: string[];
    destination: string;
    departure: string;
}

export const OrderItem = (props: Props) => {
    return (
      <Box bg="white" boxShadow="md" maxW="md" h="xs" p=".1em">
        <Heading size="lg" mb=".3em">
          {props.header}
        </Heading>
        <Wrap maxW="70%">
          {props.tags.map((tag) => (
              <Tag>{tag}</Tag>
          ))}
        </Wrap>
      </Box>
    );
}
