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
  // case 1 hepsi sarı: o harfin hiçbir yeri doğru değil, toplam sayısı da belirtilen sayı kadar
  // case 2 sarı + siyah: harf sayısı sarı kadar, ancak hiçbirinin yeri doğru değil
  // case 3 sarı + yeşil, bir tanesinin yeri doğru, diğerinin yeri yanlış ama toplam sayı sarı + yeşil kadar
  // case 4 sarı + yeşil + siyah sayıların toplamı sarı + yeşil kadar, yeşil olanın yeri doğru, siyah + sarıların yeri yanlış

  //sayacaksın, saydıktan sonra
  // eğer aynı harften bir tane sarı bir tane siyah varsa

  return possibleWords
}

function filterGrays(possibleWords: string[], input: Wordle[]): string[] {
  // case 1 hepsi siyah: o harf yok
  // case 2 sarı + siyah: harf sayısı sarı kadar, ancak hiçbirinin yeri doğru değil
  // case 3 siyah + yeşil, yeşiller doğru,toplam sayı yeşil kadar
  // case 4 sarı + yeşil + siyah sayıların toplamı sarı + yeşil kadar, yeşil olanın yeri doğru, siyah + sarıların yeri yanlış

  //sayacaksın, saydıktan sonra
  // eğer aynı harften bir tane sarı bir tane siyah varsa
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
    let hicgecmiyormu_tumharfinstancelarıGraymi = appearances.filter((appearance,i)=>word[i]===letter && appearance!=='gray').length===0;

    if(hicgecmiyormu_tumharfinstancelarıGraymi){
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

