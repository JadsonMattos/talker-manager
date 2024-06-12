const readFile = require('./fileUtils');

const searchTalker = async (searchTerm) => {
  const data = await readFile();
  const filteredTalkers = data.filter((talker) => talker.name.includes(searchTerm));
  return filteredTalkers;
};

module.exports = searchTalker;