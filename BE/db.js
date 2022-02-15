foreach(let word in words)
unused = getUnusedLetters(word)
used = getUsedLetters(word)
query = query.Where(i=>!i.ContainAny(unused))
query =query.Where(i=>i.ContainAny(used));

