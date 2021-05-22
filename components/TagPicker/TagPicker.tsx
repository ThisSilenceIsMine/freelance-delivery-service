import { useState } from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import type { Tag } from '@lib/types';
export interface Props {
  tags: Tag[];
  onTagsPicked: (arg0: Tag[]) => void;
}

export const TagPicker = ({ tags, onTagsPicked }: Props) => {
  const [pickerItems, setPickerItems] = useState(tags);
  const [selectedItems, setSelectedItems] = useState<Tag[]>([]);

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
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
    />
  );
};
