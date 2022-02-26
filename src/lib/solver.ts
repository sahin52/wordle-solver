import { VALID_GUESSES } from '../constants/validGuesses'
export function p(p:any){
  console.log(p);
}
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
  p("b4 gray")
  first100(possibleWords);
  possibleWords = filterGrays(possibleWords,input);
  p("after gray")
  first100(possibleWords);
  // filter yellows
  possibleWords = filterYellows(possibleWords,input);
  // filter grays

  // let mapped = input.map((i) => {
  //   let r: string[] = []
  //   i.word.split('').forEach((char, k) => {
  //     if (i.appearances[k] === 'gray') {
  //       r.push(char)
  //     }
  //   })
  //   return r
  // })
  // let reduced = mapped.reduce(function (prev, next) {
  //   return prev.concat(next)
  // })
  // let allNoPassingCharsSet = new Set(reduced)
  // let allNoPassingChars = Array.from(allNoPassingCharsSet.values())
  // // allNoPassingChars = ['B']
  // // console.log(allNoPassingChars)
  // for (let a = 0; a < allNoPassingChars.length; a++) {
  //   let char = allNoPassingChars[a]
  //   // console.log(char)
  //   // console.log(possibleWords.slice(0, 100))
  //   possibleWords = possibleWords.filter((i) => !i.includes(char!))
  //   // console.log(possibleWords.slice(0, 100))
  // }
  // // console.log(possibleWords.slice(0, 100))

  // for (let wordle of input) {
  //   // remove yellows
  //   for (let ii = 0; ii < wordle.appearances.length; ii++) {
  //     if (wordle.appearances[ii] === 'yellow') {
  //       possibleWords = possibleWords.filter(
  //         (word) => word[ii] !== wordle.word[ii]
  //       )
  //       possibleWords = possibleWords.filter((word) =>
  //         word.includes(wordle.word[ii])
  //       )
  //     }
  //     if (wordle.appearances[ii] === 'green') {
  //       possibleWords = possibleWords.filter(
  //         (word) => word[ii] === wordle.word[ii]
  //       )
  //     }
  //   }

  //   //remove greens
  // }
  // // for(let w of input){
  // //     for (var i = 0; i < w.word.length; i++) {
  // //         if()
  // //         possibleWords = possibleWords.filter(j => )
  // //     }
  // // }

  // console.log(
  //   possibleWords.slice(
  //     (possibleWords.length > 100 ? possibleWords.length : 100) - 100
  //   )
  // )
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
      p("letter")
      p(letter)
      p("isLetterYellow")
      p(isLetterYellow)

      let totalNumberOfGreenAndYellow = word.split('').filter((l,k)=>l === letter&&appearances[k]!=='gray').length;
      // p("totalNumberOfGreenAndYellow")
      // p(totalNumberOfGreenAndYellow)
      // console.log("possibleWords - b4");
      // console.log(possibleWords);
      // console.log(letter);
      // possibleWords.slice(0,100).forEach(word=>{
      //   p(word);
      //   p(word.split(letter));
      //   p(word.split(letter).length-1);
      //   p((word.split(letter).length-1) >= totalNumberOfGreenAndYellow)
      // })
      // p(possibleWords.filter(word=>((word.split(letter).length-1) >= totalNumberOfGreenAndYellow )));
      // p(possibleWords.filter(word=>(word.split(letter).length-1)))
      possibleWords = possibleWords.filter(word=>(word.split(letter).length-1) >= totalNumberOfGreenAndYellow );
      console.log("possibleWords -after");
      p(possibleWords);
    }

    // the yellows and the blacks with the yellows can't be in their location in the word

    for (let j = 0; j < letters.length; j++) {
      const theletter = letters[j];
      let yellowAndBlackPositionsOfThisLetter =   word.split('').map((wordletter,i)=>{if(wordletter===theletter && appearances[i]!=='green'){return i} return -1}).filter(num=>num!==-1);
      console.log(theletter);
      console.log("theletter");

      console.log(yellowAndBlackPositionsOfThisLetter);
      console.log("yellowAndBlackPositionsOfThisLetter");

      
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
  function f(){first100(possibleWords)}
  let tamamiSiyahOlanHarfler = [];

  let word = wordle.word;
  let appearances = wordle.appearances;
  let letters = Array.from((new Set(word.split(''))).values())
  console.log(letters)
  for(let letter of letters){
    let hicgecmiyormu_tumharfinstancelarıGraymi = appearances.filter((appearance,i)=>word[i]===letter && appearance!=='gray').length===0;
    // console.log(letter);
    // console.log(hicgecmiyormu_tumharfinstancelarıGraymi);
    if(hicgecmiyormu_tumharfinstancelarıGraymi){
      p("hic gecmiyor "+letter)
      f()
      possibleWords = possibleWords.filter(word=>!word.includes(letter));
      f()
    }else{
      let birTaneOlsunGriVarMi = appearances.filter((appearance,i)=>word[i]===letter && appearance==='gray').length!==0;
      p(birTaneOlsunGriVarMi)
      p("birTaneOlsunGriVarMi")
      if(birTaneOlsunGriVarMi){
        let griDisindakilerinSayisi = appearances.filter((appearance,i)=>word[i]===letter && appearance !== 'gray').length
        possibleWords = possibleWords.filter(word=>(word.split(letter).length-1) === griDisindakilerinSayisi );
        p("HERE")
        first100(possibleWords)
      }
    }
  }

  return possibleWords;
}

function first100(str:string[]){
  console.log(str.slice(500))
  return 
}