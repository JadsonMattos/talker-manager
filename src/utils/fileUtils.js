const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.join(__dirname, '..', 'talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkerPath, 'utf-8');
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
};

const writeFile = async (newTalker) => {
  try {
    await fs.writeFile(talkerPath, JSON.stringify(newTalker));
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
};

const updateFile = async (id, updatedTalker) => {
  try {
    const data = await readFile();
    const index = data.findIndex((talker) => talker.id === Number(id));
    if (index === -1) return null;
    data[index] = { id, ...updatedTalker };
    // const updateTalker = { id, ...updatedTalker };
    // const updatedTalkers = data.reduce((talkersList, currentTalkers) => {
    //   if (currentTalkers.id === Number(updateTalker.id)) {
    //     return [...talkersList, updateTalker];
    //   }
    //   return [...talkersList, currentTalkers];
    // }, []);
    const updatedData = await writeFile(data);
    return updatedData;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
};

const deleteFile = async (id) => {
  try {
    const data = await readFile();
    const index = data.findIndex((talker) => talker.id === Number(id));
    if (index === -1) return null;
    data.splice(index, 1);
    await writeFile(data);
    return true;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
};

module.exports = { readFile, writeFile, updateFile, deleteFile };