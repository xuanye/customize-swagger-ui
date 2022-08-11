export function useMethodStyleColor(methodName: string) {
  const lowerCaseName = methodName.toLowerCase();
  switch (lowerCaseName) {
    case 'get':
      return 'green';
    case 'post':
      return 'blue';
    case 'put':
      return 'teal';
    case 'patch':
      return 'violet';
    case 'delete':
      return 'red';
    default:
      return '';
  }
}
