import { useCallback, Dispatch, SetStateAction, useState } from 'react';

type Setter<T> = Dispatch<SetStateAction<T>>;

const __createCallback = <T>(callback: Setter<T>) => {
  return useCallback(
    <T>(field: keyof T, value: T[keyof T]) => {
      callback((current) => {
        return { ...current, [field]: value };
      });
    },
    [callback]
  );
};

export const useForm = <T, U = Partial<T>>(initialValue: U) => {

  const [formData, setFormData] = useState<U>(initialValue);

  const handleChange = __createCallback(setFormData);

  return { data: formData, handleChange, __setFormData: setFormData };
};
