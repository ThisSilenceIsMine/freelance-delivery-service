//I have literally no idea how to implement this correctly via enums. 
//Maybe i'll try BiMap later.

export const vals = ['ACTIVE', 'IN_PROCESS', 'READY', 'BLOCKED', 'APPOINTED'];
export const names = ['Активне', 'В процессі', 'Виконане', 'Заблоковане', 'Назначено'];

export const statusValue: Record<string, string> = {
  Активне: 'ACTIVE',
  'В процессі': 'IN_PROCESS',
  Виконане: 'READY',
  Заблоковане: 'BLOCKED',
  Назначено: 'APPOINTED',
};

export const statusKey: Record<string, string> = {
  ACTIVE: 'Активне',
  IN_PROCESS: 'В процессі',
  READY: 'Виконане',
  BLOCKED: 'Заблоковане',
  APPOINTED: 'Назначено',
}