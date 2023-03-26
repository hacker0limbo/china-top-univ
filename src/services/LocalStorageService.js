export const LocalStorageService = {
  // 存储到 localStorage 形式为: settings: { persistAuthed: true }
  setPersistAuth(value) {
    const settings = localStorage.getItem('settings') || '{}';

    localStorage.setItem(
      'settings',
      JSON.stringify({
        ...JSON.parse(settings),
        persistAuthed: value,
      })
    );
  },

  getPersistAuth() {
    return localStorage.getItem('settings')
      ? JSON.parse(localStorage.getItem('settings')).persistAuthed || false
      : false;
  },

  removePersistAuth() {
    const settings = localStorage.getItem('settings') || '{}';
    const { persistAuthed, ...otherConfigs } = JSON.parse(settings);

    localStorage.setItem('settings', JSON.stringify(otherConfigs));
  },

  setAPIKey(key) {
    const settings = localStorage.getItem('settings') || '{}';

    localStorage.setItem(
      'settings',
      JSON.stringify({
        ...JSON.parse(settings),
        apiKey: key,
      })
    );
  },

  getAPIKey() {
    return JSON.parse(localStorage.getItem('settings'))?.apiKey;
  },
};
