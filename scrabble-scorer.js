// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simpPointStructure = {
  1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

const vowelPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
};

const newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
   let totalOldPoints = 0
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
         totalOldPoints += Number(pointValue)
		 }
 
	  }
	}
   return totalOldPoints
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let info = input. question("Let's play some scrabble! \n\nEnter a word to score: ");
   return info
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let totalSimpPoints = 0
   for (let i = 0; i < word.length; i++) {

      for (const simpPointValue in simpPointStructure) {
         
         if (simpPointStructure[simpPointValue].includes(word[i])) {
            totalSimpPoints += Number(simpPointValue) 
         }
      } 
   }
   return totalSimpPoints 
}


function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let totalVowelPoints = 0
   for (let i = 0; i < word.length; i++) {

      for (const vowelPointValue in vowelPointStructure) {

         if (vowelPointStructure[vowelPointValue].includes(word[i])) {
            totalVowelPoints += Number(vowelPointValue)
         }
      }
   }
   return totalVowelPoints 
}


function scrabbleScorer(word) {
   word = word.toUpperCase();
   let totalScrabScorePoints = 0
   const objValues = Object.values(newPointStructure)
   for (let i = 0; i < word.length; i++) {
      let j = 0
      for (let scrabLetter in newPointStructure) { 
         if (scrabLetter.toUpperCase() == (word[i])) {
            totalScrabScorePoints += Number(objValues[j])
         }
         j++
      }  
   }
   return totalScrabScorePoints   
}


let scoringAlgorithms = [
   {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
   },
   {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
   },
   {
   name: "Scrabble",
   description: "	The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let info = input.question(`Which scoring algorithm would you like to use?\nOption 0 - ${scoringAlgorithms[0].name}: 1 Point Per Letter\nOption 1 - ${scoringAlgorithms[1].name}: Vowels Are 3 Points\nOption 2 - ${scoringAlgorithms[2].name}: Scrabble Point System\nEnter 0, 1, or 2: `);
      if (info == 0) {
         console.log(`Score for "${word}": ${scoringAlgorithms[0].scorerFunction(word)}`);
      } else if (info == 1) {
         console.log(`Score for "${word}": ${scoringAlgorithms[1].scorerFunction(word)}`);
      } else if (info == 2) {
         console.log(`Score for "${word}": ${scoringAlgorithms[2].scorerFunction(word)}`);
      }
   return info
}


function transform(oldPointStructure) {
   let newObject = {}
   for (item in oldPointStructure) {
      for( let i = 0; i < oldPointStructure[item].length; i++) {
         let newLetterVal = oldPointStructure[item][i]
         newObject[newLetterVal.toLowerCase()] = Number(item)
      }
   }
      return newObject

}; 


function runProgram() {
  word = initialPrompt();
  scorerPrompt() 
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
