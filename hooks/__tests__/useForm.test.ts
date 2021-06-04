import { useForm } from '../useForm';
import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  details?: {
    phoneNumber?: string;
    adress?: string;
  }
}

const initialData: FormData = {
  name: 'ivan',
  email: 'ivan@mail.com',
};

describe('useFormChange', () => {
  it('creates state with initial values', () => {
    const { result } = renderHook(() => useForm(initialData));

    expect(result.current.data).toBe(initialData);
  });

  it('handles data change', () => {
    const { result } = renderHook(() => useForm(initialData));

    const newName = 'Andrey';

    act(() => {
      result.current.handleChange('name', 'Andrey');
    });

    expect(result.current.data.name).toBe(newName);
  });

  it('yields empty object if no default value is provided', () => {
    const { result } = renderHook(() => useForm<FormData>({}));

    expect(result.current.data).toStrictEqual({});
  });

  it('yields result with only fields provided via change', () => {
    const { result } = renderHook(() => useForm<FormData>({}));

    act(() => {
      result.current.handleChange('name', 'Andrey');
    });

    expect(result.current.data).toStrictEqual({name: 'Andrey'});
  });

  it('sets nested properties', () => {
    const { result } = renderHook(() => useForm<FormData>({}));

    const phoneNumber = '0984686733';

    act(() => {
      result.current.handleChange('details.phoneNumber', phoneNumber);
    });

    console.log(result.current.data)

    expect(result.current.data.details?.phoneNumber).toStrictEqual(phoneNumber);
  })
});
