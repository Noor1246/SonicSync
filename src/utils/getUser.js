export const getUser = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) return null;

  return {
    ...storedUser,
    _id: storedUser._id || storedUser.id,
  };
};