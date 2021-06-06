import { renameField, renameFields } from '../utils';

const mockObject = {
  num: 4,
  name: 'Ivan',
};

describe('rename field', () => {
  it('renames field without ommiting data', () => {
    const localMock = { ...mockObject };

    renameField(localMock, 'num', 'id');

    expect(localMock).toStrictEqual({ id: 4, name: 'Ivan' });
  });

  it('ignores wrong key names', () => {
    const localMock = { ...mockObject };

    renameField(localMock, 'phoneNumber', 'adress');

    expect(localMock).toStrictEqual(mockObject);
  });
});

const mockArray = [
  { id: 1, value: 'hi' },
  { id: 2, value: 'hello' },
  { id: 3, value: 'greetings' },
  { id: 4, value: 'pivet' },
];

const renamedMockArray = [
  { name: 1, greetingText: 'hi' },
  { name: 2, greetingText: 'hello' },
  { name: 3, greetingText: 'greetings' },
  { name: 4, greetingText: 'pivet' },
];

describe("rename fields", () => {
  it("renames specified fields for all objects in array", () => {
    const localMockArray = JSON.parse(JSON.stringify(mockArray));

    const newArray = renameFields(localMockArray, { id: "name", value: "greetingText"});

    expect(newArray).toStrictEqual(renamedMockArray);
  })
})