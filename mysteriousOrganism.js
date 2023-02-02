// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/* Factory Function with three methods 
.mutate() - simulate P. aequor‘s high rate of mutation (change in its DNA).
.compareDNA() - compare two strings of dna
.willLikelySurvive() - more than 60% of Cytosine, and Guanine present.
*/
function pAequorFactory(num, arr) {
  return {
    specimenNum: num,
    dna: arr,

    mutate() {
      let index = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      if (this.dna[index] !== newBase) {
        return this.dna.splice(index, 1, newBase)
      } else {
        newBase = returnRandBase();
      }
    },

    compareDNA(obj) {
      let identical = 0;
      let percentage = 0;
      for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === obj.dna[i]) {
            identical++,
            percentage = identical / 16 * 100,
            console.log('specimen #1 and specimen #2 have ' + percentage + '% DNA in common.')
          }
        }
      },

    willLikelySurvive() {
      let goodGenes = 0;
      let percentage = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          goodGenes++;
          percentage = goodGenes / 16 * 100
        }
      };

      if (percentage >= 60) {
        return true
      } else {
        return false
      }
    }
    }
  };

//tests:
let pAequor1 = pAequorFactory(1, mockUpStrand());
let pAequor2 = pAequorFactory(2, mockUpStrand());
console.log(pAequor1);
console.log(pAequor2);

pAequor2.compareDNA(pAequor1);
pAequor2.mutate()
console.log(pAequor2);
console.log(pAequor1.willLikelySurvive())
// End of tests 

// Funtion that creates 30 instances of pAequor that can survive in their natural environment. Stored in an array. 
const specimensForStudy = [];

function findingBest () {
  console.log(specimensForStudy);
  for (let i = 0; specimensForStudy.length < 30; i++) {
    let pAequor = pAequorFactory(i, mockUpStrand());
    if (pAequor.willLikelySurvive() === true && specimensForStudy.length < 30) {
      specimensForStudy.push(pAequor)
    }
  }
};

findingBest();
console.log(specimensForStudy.length);
console.log(specimensForStudy);
