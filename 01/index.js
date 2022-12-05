import {promises as fs} from 'fs';
import _ from "lodash";
const {maxBy, sum} = _;
// Input provides elf caloric entries in groups by each elf
// a newline indicates the stop of one elf's entries from another
// Sum each elf's caloric entries
// Find the elf carrying the most calories

const INPUT_FILE = '01/input.txt';

const readInput = async (inputFile) => {
  const rawInput = await fs.readFile(inputFile, 'utf8');
  return rawInput.trim();
};

const getCaloriesEntriesByElf = (inputString) => {
  const calorieEntries = inputString.split(/\r?\n/);
  const calorieEntriesByElf = {};
  let elf = 0;
  calorieEntries.forEach((entry) => {
    if(entry) {
      if(!calorieEntriesByElf[elf]) {
        calorieEntriesByElf[elf] = [];
      }

      const elfCalorieEntries = calorieEntriesByElf[elf];
      elfCalorieEntries.push(entry);
    } else {
      ++elf;
    }
  });

  return calorieEntriesByElf;
};

const getTotalCaloriesByElf = (calorieEntriesByElf) => {
  return Object.keys(calorieEntriesByElf).reduce((totalCaloriesByElf, elf) => {
    const totalCalories = sum(calorieEntriesByElf[elf].map(Number));
    totalCaloriesByElf.push({elf, totalCalories});
    console.log(`** Elf ${elf}: ${totalCalories} calories`);
    return totalCaloriesByElf;
  }, []);
};

(async function () {
  const input = await readInput(INPUT_FILE);
  const caloriesByElf = getCaloriesEntriesByElf(input);
  console.log(`*** Number of elves: ${Object.keys(caloriesByElf).length} ***`);
  const totalCaloriesByElf = getTotalCaloriesByElf(caloriesByElf);
  const elfWithMostCalories = maxBy(totalCaloriesByElf, 'totalCalories');
  console.log(`*** Elf ${elfWithMostCalories.elf} is carrying the most calories at ${elfWithMostCalories.totalCalories} ***`);
})();