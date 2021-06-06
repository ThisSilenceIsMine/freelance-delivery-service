import { useState } from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { useColorMode } from '@chakra-ui/color-mode';
import type { Tag } from '@lib/types';
export interface Props {
  tags: Tag[];
  initialTags?: Tag[];
  onTagsPicked: (arg0: Tag[]) => void;
}

export const TagPicker = ({ tags, onTagsPicked, initialTags }: Props) => {
  const [pickerItems, setPickerItems] = useState(tags);
  const [selectedItems, setSelectedItems] = useState<Tag[]>(initialTags ?? []);
  const { colorMode } = useColorMode();
  const handleCreateItem = (item: Tag) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Tag[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
      onTagsPicked(selectedItems);
    }
  };

  return (
    <CUIAutoComplete
      disableCreateItem={true}
      label="Виберіть теги"
      placeholder="Почніть друкувати..."
      listStyleProps={{background: colorMode === "dark" ? "gray.800" : undefined}}
      onCreateItem={handleCreateItem}
      items={pickerItems}
      highlightItemBg={colorMode === "dark" ? "gray.700" : undefined}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
    />
  );
};
