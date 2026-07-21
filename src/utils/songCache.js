let cachedSongs = null;

export const getCachedSongs = () => cachedSongs;

export const setCachedSongs = (songs) => {
  cachedSongs = songs;
};