const checkIfVisited = (unvisited, id) => {
  return unvisited.find((art) => art.id === id);
};

export default checkIfVisited;
