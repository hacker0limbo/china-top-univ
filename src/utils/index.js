// localStorage auth 部分
export const setPersistAuth = (value) => {
  const settings = localStorage.getItem('settings') || '{}';

  localStorage.setItem(
    'settings',
    JSON.stringify({
      ...JSON.parse(settings),
      persistAuthed: value,
    })
  );
};

export const getPersistAuth = () => {
  return localStorage.getItem('settings')
    ? JSON.parse(localStorage.getItem('settings')).persistAuthed || false
    : false;
};

export const removePersistAuth = () => {
  const settings = localStorage.getItem('settings') || '{}';
  const { persistAuthed, ...otherConfigs } = JSON.parse(settings);

  localStorage.setItem('settings', JSON.stringify(otherConfigs));
};
