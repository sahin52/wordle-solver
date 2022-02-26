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

  possibleWords = filterGrays(possibleWords,input);
  console.log("result")
  console.log(possibleWords);
  // filter yellows
  // possibleWords = filterYellows(possibleWords,input);
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
export function SolverTest() {
  // console.log('solver testing')
  let w: Wordle[] = [
    // { word: 'whore', appearances: ['gray', 'green', 'gray', 'gray', 'gray'] },
    {
      word: 'point',
      appearances: ['gray', 'gray', 'yellow', 'gray', 'yellow'],
    },
    {
      word: 'tatie',
      appearances: ['green', 'gray', 'yellow', 'yellow', 'yellow'],
    },
    {
      word: 'tiers',
      appearances: ['green', 'green', 'yellow', 'gray', 'green'],
    },
    {
      word: 'camel',
      appearances: ['gray', 'gray', 'green', 'green', 'gray'],
    },

    // { word: 'shuts', appearances: ['gray', 'green', 'green', 'yellow', 'gray']},
    // { word: 'swink', appearances: ['green', 'green', 'green', 'gray', 'gray'] },
  ]
  // let res = 
  Solver(w)
}

function filterGreens(possibleWords: string[], wordles: Wordle[]): string[] {
  type KonumVeHarf = {
    konum: number
    harf: string
  }
  //getGreensPlaces
  let greensAndPlaces = getGreensAndPlaces(wordles)

  greensAndPlaces.forEach((greenAndPlace) => {
    possibleWords = possibleWords.filter(
      (word) => word[greenAndPlace.konum] === greenAndPlace.harf
    )
  })
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
  // case 1 hepsi sarı: o harfin hiçbir yeri doğru değil, toplam sayısı da belirtilen sayı kadar
  // case 2 sarı + siyah: harf sayısı sarı kadar, ancak hiçbirinin yeri doğru değil
  // case 3 sarı + yeşil, bir tanesinin yeri doğru, diğerinin yeri yanlış ama toplam sayı sarı + yeşil kadar
  // case 4 sarı + yeşil + siyah sayıların toplamı sarı + yeşil kadar, yeşil olanın yeri doğru, siyah + sarıların yeri yanlış

  //sayacaksın, saydıktan sonra
  // eğer aynı harften bir tane sarı bir tane siyah varsa

  return []
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
    let hicgecmiyormu = appearances.filter((appearance,i)=>word[i]===letter && appearance!=='gray').length===0;
    console.log(letter);
    console.log(hicgecmiyormu);
    if(hicgecmiyormu){
      p("hic gecmiyor "+letter)
      f()
      possibleWords = possibleWords.filter(word=>!word.includes(letter));
      f()
    }else{
      let birTaneOlsunGriVarMi = appearances.filter((appearance,i)=>word[i]===letter && appearance==='gray').length!==0;
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