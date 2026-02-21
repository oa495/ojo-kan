// ─── DATA ──────────────────────────────────────────────────────────────────
const slides = [
  [
    `<p>
      I say listen me. Child them my.
      They listen me let me say for they.
    </p>`,

    `<p>
      Woman one that they call Ọlikpẹrẹbu. Not have town Itsẹkiri any town
      Itsẹkiri yet come -ing beg woman the, say they want take do wife,
      she says not accept. This when meet she says not accept. Place any place
      in world the all, town Itsẹkiri any town Itsẹkiri all come -ing see
      woman the she says not accept. What you do that you take say not accept?
      She says not accept, she says not want they any they.
    </p>`,

    `<p>
      Day one snake one in inside bush that they call Boa. It hear. It says
      woman what in world the, woman that they beg that she say not accept? It
      said I will reach there. Boa the take go transform body its. It take reach
      place that leg dey, it borrow ' leg. It take reach place that hand dey, it
      borrow ' hand. It take reach place that head dey, it borrow ' head. It
      take reach place that eye dey, it borrow ' eye. It wear ' shirt. It tie '
      cloth. It wear ' shoe. It borrow ' walking stick. It borrow ' cap. It go,
      it say it will meet woman Ọlikpẹrẹbu the.
    </p>`,

    `<p>
      Woman the but very beautiful. Woman the Ọlikpẹrẹbu really olikperebu.
      Woman Ọlikpẹrẹbu -ing see, she run -ing meet in motion, she embrace him.
      She call mother her and father her, she say this husband that ' me want
      marry.
    </p>`,

    `<p>
      Iyọ! They say "this man that you want marry?" She say "this man that
      me want marry oo. " You know before? She says this man that she want
      marry. They say okay oo. Snake the take enter ' home, they greet, they
      give food. He say not yet eat, say let ' they carry food the, let '
      they carry into room the. They carry into room the. He take look this look
      this. He enter inside room the, he transform body his take transform snake
      the Boa the. It turn food the towards ground the, it lick, it lick, it
      lick eat finish. It transform resemble person.
    </p>`,

    `<p >
      Wife his say 'ehen'! She says husband her eat food his finish. He take
      stay there take reach resemble nights some. He call inlaw his them, he
      says he want go home rẹẹn his. Woman the now she tie properties her, she
      carry on head, she says she will follow meet go. Iyọ! Mother her and
      father her say "don't go", she says she will go, she will follow meet go.
      Brother her Akpofi see snake the in room the before. He say Ọlikpẹrẹbu.
      Ọlikpẹrẹbu not listen, she say she will follow meet go.
    </p>`,

    `<p>
      That she -ing go, brother her man go dey follow, go dey follow in back. It
      -ing reach place that owner (of) cloth dey, it give cloth owner (of)
      cloth. It -ing reach place that owner (of) leg dey, it give leg owner (of)
      leg. It -ing reach place that owner (of) hand dey, it give hand owner (of)
      hand. It -ing reach place that owner (of) head dey, it give head for owner
      (of) head. It -ing reach place that owner (of) eye dey, it give eye owner
      (of) eye. Body its all it transform, shirt and cloth it return. It
      transform snake.
    </p>`,

    `<p>
      Became afraid Ọlikpẹrẹbu. Snake the call, it says Ọlikpẹrẹbu you ' not go
      place any place, it says na me and you oo. You ' not go place any place.
    </p>`,

    `<p>
      Ọlikpẹrẹbu, she cried. She say " this life her re oo. " Better person come
      -ing beg. She say not accept. Not accept. Eh! She accept say Boa she
      come marry? Snake the ka tie leg her take tree. She stay there.
    </p>`,

    `<p>
      Time that it come, that snake go place some, Akpofi come from bush. He see
      Ọlikpẹrẹbu tie take tree. It have bell that thing bad when before, bell
      the ka ring <i>gbangan</i>. Snake the ka hear.
    </p>`,

    `<p>
      Akpofi take plantain from tree the. He give her. She stuck plantain the,
      she stuck push in bell the. She stuck push in bell the, she stuck push in
      bell the. Plantain the that they put bell the, not allow let bell the
      do ring. Brother her go, he loosen Ọlikpẹrẹbu. Ọlikpẹrẹbu ran, Ọlikpẹrẹbu
      ran, Ọlikpẹrẹbu ran. They take run consistently, they reach place the that
      mother her and father her dey, Ọlikpẹrẹbu fell.</p>`,
  ],
  [
    `<p>
        I say listen to me. My children. 
        Make una listen make I tell una.
    </p>`,
    `<p>
        One woman that they call Olikperebu. No Itsekiri town
        that did not come begging the woman, saying the want to take her do wife,
        she say she no gree. When this (one) meets her she says she no gree. Every place
        in the whole world, every Itsekiri town, all coming to find
        the woman that doesn't agree. What is doing you that you say you don't want? 
        She says she doesn't agree, she said she doesn't want any of them.
    </p>`,
    `<p>
        One day one snake inside the bush that they call Boa. It heard. It says
        where is the woman in the world, a girl that they beg that she says she doesn't agree? It 
        said I will reach there. (So) Na in the Boa go change its body. It reach place
        that leg dey, it borrow leg. It reach place that hand dey, it borrow hand.
        It reach place that head dey, it borrow head. It reach place that eye dey,
        it borrow eye. It wore a shirt. It tied a cloth. It wore shoes. It borrowed walking stick.
        It borrowed cap. It went, it said it wants to meet the woman Olikperebu.
    </p>`,
    `<p>
        The woman Olikperebu is very beautiful. The woman Olikperebu is really "a woman who has it all"
        The woman Olikperebu was seeing (him), she was running to meet him, she embraced him.
        She called her father and mother, she said this is my husband that I want to marry. 
    </p>`,

    `<p>
        Ah! They said “this is the man that you want to marry?” She said this is the
        man that I want to marry oo. You know (him) before? She said this is the man I want
        to marry. They said okay oo. The snake was entering the house, they greeted, they
        give (him) food. He said he has not eaten yet, said let them carry the food, let
        them carry into the room. They carried it into the room, he transformed his body, transform (into) the snake,
        the Oribiti. It turned the food towards the ground, it licked, it licked, it licked
        eat finish. It transformed (to) resemble person.
    </p>`,
    `<p>
        His wife said ehen! She said her husband had finished eating his food.
        (Now) He was staying there reaching some nights. (Then) he called his inlaws,
        he said he wants to go home. The woman now tied her propertie, she carried
        it on her head, she said will follow him and go. Ah! Her mother and
        her father told her "don't go", she said she will go, she will follow him and go.
        Her brother Akpofi saw the snake in the room before. He told Ọlikpẹrẹbu.
        Ọlikpẹrẹbu (did) not listen, she said she will follow him and go.
    </p>`,

    `<p>
        When she was going, her brother will be following her, following her from the back.
        When it reached where the owner of cloth dey, it gave cloth to the owner.
        When it got to where the owner of leg dey, it gave leg to the owner.
        When it got to where the owner of hand dey, it gave hand to the owner.
        When it got to where the owner of head dey, it gave head to the owner.
        When it got to where the owner of eye dey, it gave eye to the owner.
        It changed his whole body, shirt and clothes it returned. It
        transformed (to) snake.
    </p>`,
    `<p>
        Olikperebu became frightened. The snake called her, said Ọlikpẹrẹbu, you
        won't go anywhere, he said na me and you oo. You nor de go anywhere.
    </p>`,
    `<p>
        Ọlikpẹrẹbu, she cried. She said, "(so) this is my life oo."  Better people were coming
        to beg. She said she nor gree. She didn't accept. Eh! So na Boa she go come marry?
        The snake tied her leg to a tree. She stayed there.
    </p>`,
    `<p>
        Time (that came) later, when the snake had went away, Akpofi came from the bush. He saw
        Ọlikpẹrẹbu tied to a tree. It had a bell that if something bad were to happen,
        the bell would ring <i>gbangan</i>. The snake would hear.
    </p>`,
    `<p>
        Akpofi took plantain from the tree. He gave her. She stuck the plantain,
        she stuck (and) push it in the bell. She stuck (and) push it in the bell,
        she stuck (and) push it in the bell. The plantain that they put in the bell,
        didn't allow the bell to ring. The brother went, he loosened Ọlikpẹrẹbu.
        (Then) Ọlikpẹrẹbu ran, Ọlikpẹrẹbu ran, Ọlikpẹrẹbu ran. They were running
        consistently, they got to the place
        that her mom and dad were (and) Ọlikpẹrẹbu fell.
    </p>`,
  ],
]
// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const MORPH_DURATION = 800 // Total morph time in ms
const WORD_STAGGER = 40 // Delay between each word starting its animation

const rand = (a, b) => Math.random() * (b - a) + a

// ─── STRIP BUTTON TAGS TO PLAIN TEXT ──────────────────────────────────────
// Takes HTML with <button> tags and converts to plain text in <p> tags
// Preserves <i> and <sup><a> tags
function stripToPlainText(html) {
  const div = document.createElement('div')
  div.innerHTML = html

  // Get all paragraphs
  const paragraphs = div.querySelectorAll('.para-row, p')
  const plainParagraphs = []

  paragraphs.forEach((p) => {
    const newP = document.createElement('p')

    // Walk through all child nodes
    function extractText(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Preserve <i> and <sup><a> tags
        if (node.nodeName === 'I') {
          return `<i>${node.textContent}</i>`
        } else if (node.nodeName === 'SUP') {
          return node.outerHTML
        } else if (node.nodeName === 'BUTTON') {
          // Extract text from button's data-text or textContent
          return node.getAttribute('data-text') || node.textContent
        } else {
          // Recursively process children
          return Array.from(node.childNodes).map(extractText).join('')
        }
      }
      return ''
    }

    newP.innerHTML = Array.from(p.childNodes).map(extractText).join('')
    plainParagraphs.push(newP.outerHTML)
  })

  return plainParagraphs
}

// ─── PARSE: one <p> → tokens (with inline tags preserved as objects) ───────
function parseParagraph(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  const p = div.querySelector('p')
  const tokens = []

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (part !== '') {
          tokens.push({ type: 'text', value: part })
        }
      })
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (['SUP', 'A', 'I', 'SPAN', 'EM', 'STRONG', 'B'].includes(node.nodeName)) {
        tokens.push({ type: 'html', value: node.outerHTML, text: node.textContent })
      } else {
        node.childNodes.forEach(walk)
      }
    }
  }

  if (p) walk(p)
  return tokens
}

// ─── BUILD word element ────────────────────────────────────────────────────
function buildWordEl(token) {
  const span = document.createElement('span')
  span.className = 'word'
  span.dataset.token = JSON.stringify(token)

  if (token.type === 'html') {
    span.innerHTML = token.value
  } else {
    span.textContent = token.value
  }

  return span
}

// ─── MORPH one word element from current to target ────────────────────────
function morphWord(wordEl, targetToken, startDelay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const srcToken = JSON.parse(wordEl.dataset.token || '{"type":"text","value":""}')

      // Get current position
      const startRect = wordEl.getBoundingClientRect()

      // Temporarily update content to measure target width/position
      const originalContent = wordEl.innerHTML
      const originalToken = wordEl.dataset.token

      if (targetToken.type === 'html') {
        wordEl.innerHTML = targetToken.value
      } else {
        wordEl.textContent = targetToken.value
      }

      const endRect = wordEl.getBoundingClientRect()

      // Restore original content
      wordEl.innerHTML = originalContent
      wordEl.dataset.token = originalToken

      // Calculate horizontal distance only (ignore vertical)
      const deltaX = endRect.left - startRect.left

      // Set up animation - only translate X
      wordEl.style.transition = `transform ${MORPH_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${MORPH_DURATION}ms ease`
      wordEl.style.transform = `translateX(${deltaX}px)`

      // If the words are different, fade through change
      if (!tokensEqual(srcToken, targetToken)) {
        wordEl.style.opacity = '0.3'

        setTimeout(() => {
          // Update content at midpoint
          if (targetToken.type === 'html') {
            wordEl.innerHTML = targetToken.value
          } else {
            wordEl.textContent = targetToken.value
          }
          wordEl.dataset.token = JSON.stringify(targetToken)
          wordEl.style.opacity = '1'
        }, MORPH_DURATION / 2)
      }

      setTimeout(() => {
        wordEl.style.transition = ''
        wordEl.style.transform = ''

        // Final content update
        if (targetToken.type === 'html') {
          wordEl.innerHTML = targetToken.value
        } else {
          wordEl.textContent = targetToken.value
        }
        wordEl.dataset.token = JSON.stringify(targetToken)

        resolve()
      }, MORPH_DURATION)
    }, startDelay)
  })
}

// ─── TOKEN EQUALITY ────────────────────────────────────────────────────────
function tokensEqual(a, b) {
  if (a.type !== b.type) return false
  if (a.type === 'html') {
    return a.value === b.value
  }
  return a.value === b.value
}

// ─── WRAP a plain .para-row into .word/.char structure ────────────────────
function wrapRow(row, tokens) {
  if (row.querySelector('.word')) return

  const newContent = document.createDocumentFragment()

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const nextToken = tokens[i + 1]

    if (token.type === 'text' && /^\s+$/.test(token.value)) {
      newContent.appendChild(document.createTextNode(token.value))
    } else if (token.type === 'text' || token.type === 'html') {
      newContent.appendChild(buildWordEl(token))

      if (nextToken && !(nextToken.type === 'text' && /^\s+$/.test(nextToken.value))) {
        newContent.appendChild(document.createTextNode(' '))
      }
    }
  }

  row.innerHTML = ''
  row.appendChild(newContent)
}

// ─── MORPH one paragraph row ───────────────────────────────────────────────
function morphRow(row, fromTokens, toTokens, wordOffset, stableDur) {
  if (!row.querySelector('.word') || fromTokens.length === 0) {
    wrapRow(row, fromTokens.length > 0 ? fromTokens : toTokens)
  }

  const wordEls = Array.from(row.querySelectorAll('.word'))
  const fromWords = fromTokens.filter((t) => {
    if (t.type === 'text' && /^\s+$/.test(t.value)) return false
    return true
  })
  const toWords = toTokens.filter((t) => {
    if (t.type === 'text' && /^\s+$/.test(t.value)) return false
    return true
  })
  const maxWords = Math.max(fromWords.length, toWords.length)
  const promises = []

  if (toWords.length > wordEls.length && fromWords.length === 0) {
    wrapRow(row, toTokens)
    const newWordEls = Array.from(row.querySelectorAll('.word'))
    newWordEls.forEach((el, i) => {
      const delay = (wordOffset + i) * WORD_STAGGER
      el.style.opacity = '0'
      promises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            el.style.transition = `opacity ${MORPH_DURATION}ms ease`
            el.style.opacity = '1'
            setTimeout(resolve, MORPH_DURATION)
          }, delay)
        }),
      )
    })
    return promises
  }

  for (let i = 0; i < maxWords; i++) {
    const el = wordEls[i]
    const fromWord = fromWords[i]
    const toWord = toWords[i]
    const delay = (wordOffset + i) * WORD_STAGGER

    if (!el && toWord) {
      const newEl = buildWordEl(toWord)
      newEl.style.opacity = '0'
      row.appendChild(document.createTextNode(' '))
      row.appendChild(newEl)
      promises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            newEl.style.transition = `opacity ${MORPH_DURATION}ms ease`
            newEl.style.opacity = '1'
            setTimeout(resolve, MORPH_DURATION)
          }, delay)
        }),
      )
    } else if (el && !toWord) {
      promises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            el.style.transition = `opacity ${MORPH_DURATION}ms ease`
            el.style.opacity = '0'
            setTimeout(() => {
              el.remove()
              resolve()
            }, MORPH_DURATION)
          }, delay)
        }),
      )
    } else if (el && toWord && fromWord && !tokensEqual(fromWord, toWord)) {
      promises.push(morphWord(el, toWord, delay))
    } else if (el && toWord && fromWord && tokensEqual(fromWord, toWord)) {
      // Stable word - just pulse
      el.classList.remove('stable')
      void el.offsetWidth
      el.style.setProperty('--stable-dur', `${stableDur}ms`)
      el.classList.add('stable')
      el.addEventListener('animationend', () => el.classList.remove('stable'), { once: true })
    }
  }
  return promises
}

// ─── FULL MORPH TRANSITION ────────────────────────────────────────────────
async function fullMorphTransition(fromSlide, toSlide) {
  const existingRows = Array.from(display.querySelectorAll('.para-row'))

  const fromParagraphs = fromSlide.map(parseParagraph)
  const toParagraphs = toSlide.map(parseParagraph)
  const maxRows = Math.max(fromParagraphs.length, toParagraphs.length)

  // Adjust row count
  while (existingRows.length < maxRows) {
    const newRow = document.createElement('p')
    newRow.className = 'para-row'
    display.appendChild(newRow)
    existingRows.push(newRow)
  }

  let wordOffset = 0
  const allPromises = []

  for (let i = 0; i < maxRows; i++) {
    const row = existingRows[i]
    const fromToks = fromParagraphs[i] || []
    const toToks = toParagraphs[i] || []

    if (toToks.length === 0) {
      // Row being removed - fade out all words
      const wordEls = Array.from(row.querySelectorAll('.word'))
      wordEls.forEach((el, idx) => {
        const delay = (wordOffset + idx) * WORD_STAGGER
        allPromises.push(
          new Promise((resolve) => {
            setTimeout(() => {
              el.style.transition = `opacity ${MORPH_DURATION}ms ease`
              el.style.opacity = '0'
              setTimeout(resolve, MORPH_DURATION)
            }, delay)
          }),
        )
      })
      setTimeout(
        () => {
          row.style.display = 'none'
        },
        (wordOffset + wordEls.length) * WORD_STAGGER + MORPH_DURATION,
      )
      wordOffset += wordEls.length
    } else {
      row.style.display = 'block'
      const stableDur =
        WORD_STAGGER * toToks.filter((t) => !(t.type === 'text' && /^\s+$/.test(t.value))).length
      const promises = morphRow(row, fromToks, toToks, wordOffset, stableDur)
      allPromises.push(...promises)
      wordOffset += toToks.filter((t) => !(t.type === 'text' && /^\s+$/.test(t.value))).length
    }
  }

  await Promise.all(allPromises)

  // Remove hidden rows
  existingRows.forEach((row, idx) => {
    if (idx >= toParagraphs.length || toParagraphs[idx].length === 0) {
      row.remove()
    }
  })
}

// ─── NAVIGATION ────────────────────────────────────────────────────────────
async function goToSlide(index) {
  if (isAnimating || index < 0 || index >= slides.length || index === currentSlide) return
  isAnimating = true

  // SPECIAL CASE: Going back to slide 0 - restore original HTML
  if (index === 0) {
    // Remove everything except div#slide1
    Array.from(display.children).forEach((child) => {
      if (child.id !== 'slide1') {
        child.remove()
      }
    })

    currentSlide = index
    isAnimating = false
    return
  }

  // STEP 1: If leaving slide 0 for the first time, save original HTML
  let fromSlide = slides[currentSlide]
  if (currentSlide === 0) {
    // Check if we have button tags in the DOM
    if (display.querySelector('button.word')) {
      // Strip to plain text
      const plainText = stripToPlainText(display.innerHTML)
      fromSlide = plainText

      // Replace DOM with plain text version
      display.innerHTML = plainText.join('')

      // Add para-row class to all paragraphs
      display.querySelectorAll('p').forEach((p) => p.classList.add('para-row'))

      // Small delay to let DOM settle
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }

  // STEP 2: Morph to target slide
  await fullMorphTransition(fromSlide, slides[index])

  currentSlide = index
  isAnimating = false
}

// ─── FULL SLIDE TRANSITION ─────────────────────────────────────────────────
let currentSlide = 0
let isAnimating = false
let display

function init() {
  display = document.getElementById('story')
}

export { init, slides, goToSlide }
