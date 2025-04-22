export const translateError = (errorMessage) => {
  const errorTranslations = {
    'Invalid credentials': 'Неверный email или пароль',
    'User not found': 'Пользователь не найден',
    'Account is locked': 'Аккаунт заблокирован',
    'Too many login attempts': 'Слишком много попыток входа. Попробуйте позже',
    'Network error': 'Ошибка сети. Проверьте подключение',
    'Authentication error': 'Ошибка авторизации',
    'An unexpected error occurred': 'Произошла непредвиденная ошибка',
  };
  return errorTranslations[errorMessage] || errorMessage;
};
