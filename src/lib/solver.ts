import { VALID_GUESSES } from '../constants/validGuesses'

export type Wordle = {
  word: string
  appearances: ('yellow' | 'green' | 'gray')[]
}
function read() {
  let data = VALID_GUESSES
  return data
}
export function Solver(input: Wordle[]): string[] {
  let possibleWords = read()
  //filter greens
  input.forEach((wordle, i) => {
    input[i].word = input[i].word.toLowerCase()
  })
  possibleWords = filterGreens(possibleWords, input)
  possibleWords = filterGrays(possibleWords,input);
  // filter yellows
  possibleWords = filterYellows(possibleWords,input);
  // filter grays

 
  return possibleWords
}


function filterGreens(possibleWords: string[], wordles: Wordle[]): string[] {
  type KonumVeHarf = {
    konum: number
    harf: string
  }
  //getGreensPlaces
  let greensAndPlaces = getGreensAndPlaces(wordles)

  for (let i = 0; i < greensAndPlaces.length; i++) {
    const greenAndPlace = greensAndPlaces[i];
    possibleWords = possibleWords.filter(
      (word) => word[greenAndPlace.konum] === greenAndPlace.harf
    )
  }
  return possibleWords

  function getGreensAndPlaces(wordles: Wordle[]) {
    let greensPlaces: KonumVeHarf[] = []

    wordles.forEach((wordle) => {
      wordle.appearances.forEach((appearance, i) => {
        if (appearance === 'green') {
          greensPlaces.push({ harf: wordle.word.split('')[i], konum: i })
        }
      })
    })
    greensPlaces = greensPlaces.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.harf === value.harf && t.konum === value.konum)
    )
    return greensPlaces
  }
}
function filterYellows(possibleWords: string[], input: Wordle[]): string[] {

  for (let i = 0; i < input.length; i++) {
    const wordle = input[i];
    let word = wordle.word;
    let appearances = wordle.appearances;

    let letters = Array.from((new Set(word.split(''))).values());

    //total number is greater than or equal to yellow + green
    for (let j = 0; j < letters.length; j++) {
      const letter = letters[j];
      let isLetterYellow = word.split('').filter((l,k)=>appearances[k]==='yellow' && l === letter).length!==0;
      if(!isLetterYellow) continue;


      let totalNumberOfGreenAndYellow = word.split('').filter((l,k)=>l === letter&&appearances[k]!=='gray').length;

      possibleWords = possibleWords.filter(word=>(word.split(letter).length-1) >= totalNumberOfGreenAndYellow );
    }

    // the yellows and the blacks with the yellows can't be in their location in the word

    for (let j = 0; j < letters.length; j++) {
      const theletter = letters[j];
      let yellowAndBlackPositionsOfThisLetter =   word.split('').map((wordletter,i)=>{if(wordletter===theletter && appearances[i]!=='green'){return i} return -1}).filter(num=>num!==-1);

      for (let k = 0; k < yellowAndBlackPositionsOfThisLetter.length; k++) {
        const position = yellowAndBlackPositionsOfThisLetter[k];
        possibleWords = possibleWords.filter(word => word[position] !== theletter);
      }
      ;
    }
    // 

  }
  // case 1 hepsi sar??: o harfin hi??bir yeri do??ru de??il, toplam say??s?? da belirtilen say?? kadar
  // case 2 sar?? + siyah: harf say??s?? sar?? kadar, ancak hi??birinin yeri do??ru de??il
  // case 3 sar?? + ye??il, bir tanesinin yeri do??ru, di??erinin yeri yanl???? ama toplam say?? sar?? + ye??il kadar
  // case 4 sar?? + ye??il + siyah say??lar??n toplam?? sar?? + ye??il kadar, ye??il olan??n yeri do??ru, siyah + sar??lar??n yeri yanl????

  //sayacaks??n, sayd??ktan sonra
  // e??er ayn?? harften bir tane sar?? bir tane siyah varsa

  return possibleWords
}

function filterGrays(possibleWords: string[], input: Wordle[]): string[] {
  // case 1 hepsi siyah: o harf yok
  // case 2 sar?? + siyah: harf say??s?? sar?? kadar, ancak hi??birinin yeri do??ru de??il
  // case 3 siyah + ye??il, ye??iller do??ru,toplam say?? ye??il kadar
  // case 4 sar?? + ye??il + siyah say??lar??n toplam?? sar?? + ye??il kadar, ye??il olan??n yeri do??ru, siyah + sar??lar??n yeri yanl????

  //sayacaks??n, sayd??ktan sonra
  // e??er ayn?? harften bir tane sar?? bir tane siyah varsa
  for(let i=0;i<input.length;i++){
    let wordle=input[i]

    possibleWords = filterGrayOneWord(possibleWords,wordle)
  }
  return possibleWords
}
function filterGrayOneWord(possibleWords: string[], wordle: Wordle): string[] {

  let word = wordle.word;
  let appearances = wordle.appearances;
  let letters = Array.from((new Set(word.split(''))).values())
  for(let letter of letters){
    let hicgecmiyormu_tumharfinstancelar??Graymi = appearances.filter((appearance,i)=>word[i]===letter && appearance!=='gray').length===0;

    if(hicgecmiyormu_tumharfinstancelar??Graymi){
      possibleWords = possibleWords.filter(word=>!word.includes(letter));
    }else{
      let birTaneOlsunGriVarMi = appearances.filter((appearance,i)=>word[i]===letter && appearance==='gray').length!==0;
      if(birTaneOlsunGriVarMi){
        let griDisindakilerinSayisi = appearances.filter((appearance,i)=>word[i]===letter && appearance !== 'gray').length
        possibleWords = possibleWords.filter(word=>(word.split(letter).length-1) === griDisindakilerinSayisi );
      }
    }
  }

  return possibleWords;
}

