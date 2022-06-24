export const useStatusColor = (statusCode: number) => {
  if (statusCode >= 500) {
    return 'error';
  } else if (statusCode >= 400) {
    return 'warning';
  } else if (statusCode >= 300) {
    return 'orange';
  }

  return 'success';
};
