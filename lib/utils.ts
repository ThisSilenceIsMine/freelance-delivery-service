import { Tag } from './types';

interface GenericObject {
  [key: string]: any;
}

interface FieldAlias {
  [key: string]: string;
}

export const renameField = <T extends GenericObject>(obj: T, oldKey: string, newKey: string) => {
  if (oldKey === newKey) {
    return;
  }
  const descriptor = Object.getOwnPropertyDescriptor(obj, oldKey);

  if (!descriptor) {
    return;
  }

  Object.defineProperty(obj, newKey, descriptor);
  delete obj[oldKey];
};

export const renameFields = <T extends GenericObject>(
  objectArray: T[],
  fieldAliases: FieldAlias
) => {
  const newArray = objectArray.map((obj) => {
    // fieldAliases.forEach(field => {
    //   renameField(obj, field.oldKey, field.newKey)
    // })

    for (const key in fieldAliases) {
      renameField(obj, key, fieldAliases[key]);
    }

    return obj;
  });

  return newArray;
};

interface BackEndTag {
  id: number;
  name: string;
}

export const renameTagsFrom = (tags: BackEndTag[]) => {
  return renameFields(tags, { id: 'value', name: 'label' });
};

export const renameTagsTo = (tags: Tag[]) => {
  return renameFields(tags, { value: 'id', label: 'name' });
};

export const renameOrdersFrom = (orders: any[]) => {
  const newOrders = renameFields(orders, {
    deliver_from: 'departure',
    deliver_to: 'destination',
    types: 'tags',
    phone_number: 'phoneNumber'
  });
  const res = newOrders.map((order) => {
    order.tags = renameTagsFrom(order.tags);
    if (order?.details) {
      renameField(order.details, 'people_count', 'peopleCount');
    }

    return order;
  });
  // console.log(orders)
  // console.log(res)

  return res;
};

export const renameOrdersTo = (orders: any[]) => {
  const newOrders = renameFields(orders, {
    departure: 'deliver_from',
    destination: 'deliver_to',
    tags: 'types',
    phoneNumber: 'phone_number',
  });

  const res = newOrders.map((order) => {
    order.types = renameTagsTo(order.types);
    if (order.details) {
      renameField(order.details, 'people_count', 'peopleCount');
    }
    return order;
  });

  return res;
};

export const renameDriversFrom = (drivers: any[]) => {
  if (!drivers) {
    return [];
  }
  const newDrivers = renameFields(drivers, {
    name: 'fullName',
    types: 'tags',
  });
  const res = newDrivers.map((driver) => {
    driver.tags = renameTagsFrom(driver.tags);
    return driver;
  });
  // console.log(orders)
  // console.log(res)

  return res;
};

export const renameDriversTo = (drivers: any[]) => {
  const newDrivers = renameFields(drivers, {
    fullName: 'name',
    tags: 'types',
  });
  const res = newDrivers.map((driver) => {
    driver.tags = renameTagsTo(driver.tags); //this shouldn't work
    return driver;
  });
  // console.log(orders)
  // console.log(res)

  return res;
};

export const renameNotificationsFrom = (notifications: any[]) => {
  const renamed = renameFields(notifications, {
    message: 'text',
  });

  return renamed;
};