import { VALID_GUESSES } from '../constants/validGuesses'

type Wordle = {
  word: string
  appearances: ('yellow' | 'green' | 'gray')[]
}
async function read() {
  let data = VALID_GUESSES
  return data
}
export async function Solver(input: Wordle[]): Promise<string[]> {
  let possibleWords = await read()
  //filter greens
  possibleWords = filterGreens(possibleWords, input)

  // filter yellows
  // possibleWords = filterYellows(possibleWords,input);
  // filter grays

  let mapped = input.map((i) => {
    let r: string[] = []
    i.word.split('').forEach((char, k) => {
      if (i.appearances[k] == 'gray') {
        r.push(char)
      }
    })
    return r
  })
  let reduced = mapped.reduce(function (prev, next) {
    return prev.concat(next)
  })
  let allNoPassingCharsSet = new Set(reduced)
  let allNoPassingChars = Array.from(allNoPassingCharsSet.values())
  // allNoPassingChars = ['B']
  // console.log(allNoPassingChars)
  for (let a = 0; a < allNoPassingChars.length; a++) {
    let char = allNoPassingChars[a]
    // console.log(char)
    // console.log(possibleWords.slice(0, 100))
    possibleWords = possibleWords.filter((i) => !i.includes(char!))
    // console.log(possibleWords.slice(0, 100))
  }
  // console.log(possibleWords.slice(0, 100))

  for (let wordle of input) {
    // remove yellows
    let word = wordle.word
    for (let ii = 0; ii < wordle.appearances.length; ii++) {
      if (wordle.appearances[ii] === 'yellow') {
        possibleWords = possibleWords.filter(
          (word) => word[ii] !== wordle.word[ii]
        )
        possibleWords = possibleWords.filter((word) =>
          word.includes(wordle.word[ii])
        )
      }
      if (wordle.appearances[ii] === 'green') {
        possibleWords = possibleWords.filter(
          (word) => word[ii] === wordle.word[ii]
        )
      }
    }

    //remove greens
  }
  // for(let w of input){
  //     for (var i = 0; i < w.word.length; i++) {
  //         if()
  //         possibleWords = possibleWords.filter(j => )
  //     }
  // }

  console.log(possibleWords.slice((possibleWords.length>100?possibleWords.length:100) - 100))
  return possibleWords
}
export async function SolverTest() {
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
    }
    
    // { word: 'shuts', appearances: ['gray', 'green', 'green', 'yellow', 'gray']},
    // { word: 'swink', appearances: ['green', 'green', 'green', 'gray', 'gray'] },
  ]
  let res = await Solver(w);
}

function filterGreens(possibleWords: string[], wordles: Wordle[]): string[] {
  type KonumVeHarf = {
    konum: number
    harf: string
  }
  //getGreensPlaces
  let greensAndPlaces = getGreensAndPlaces(wordles)

  greensAndPlaces.forEach(greenAndPlace=>{
    possibleWords = possibleWords.filter(word=>word[greenAndPlace.konum]===greenAndPlace.harf);
  })
  return possibleWords;


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

function filterBlacks(possibleWords: string[], input: Wordle[]): string[] {
  // case 1 hepsi siyah: o harf yok
  // case 2 sarı + siyah: harf sayısı sarı kadar, ancak hiçbirinin yeri doğru değil
  // case 3 siyah + yeşil, yeşiller doğru,toplam sayı yeşil kadar
  // case 4 sarı + yeşil + siyah sayıların toplamı sarı + yeşil kadar, yeşil olanın yeri doğru, siyah + sarıların yeri yanlış

  //sayacaksın, saydıktan sonra
  // eğer aynı harften bir tane sarı bir tane siyah varsa

  return []
}


