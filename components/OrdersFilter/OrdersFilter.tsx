import { Input } from '@chakra-ui/input'
import { Box, Flex } from '@chakra-ui/layout'
import { TagPicker, Tag } from '../TagPicker'

export interface Props {
  tagOptions: Tag[];
}

export const OrdersFilter = (props: Props) => {

    return (
      <Flex
        direction="column"
        align="center"
        justify="flex-start"
        boxShadow="lg"
        width="md"
        height="lg"
      >
        <Input placeholder="Заголовок оголошення" />
        <TagPicker tags={props.tagOptions} onTagsPicked={() => {}} />
      </Flex>
    );
}
