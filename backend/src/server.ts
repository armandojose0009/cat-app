import startServer from './app';

(async () => {
  try {
    await startServer();
  } catch (error) {
    console.error('Server error:', error);
  }
})();
