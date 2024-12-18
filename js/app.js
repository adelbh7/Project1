let secretWord = ''
let guessedLetters = []
let wrongLetters = []
let mistakes = 0
let hint = ''
let randumHolder = 0
let userNameHolder = ""


const correctGuesses = document.querySelector('.lettersContainer')
const completeAnswerInput = document.querySelector('#completeanswer')
const wrongGuesses = document.querySelector('.wrongletters')
const hangmanImage = document.querySelector('.statusarea')
const UserNameInput = document.querySelector('#usernameinput')
const resetbutton = document.querySelector('#resetbutton')
const hintbutton = document.querySelector('#hintbutton')
const hangbodyElement = document.querySelector('.hangbody')
hangbodyElement.style.backgroundImage = 'url("photos/pirate-yes.webp")'



const keyboardContainer = document.querySelector('.alllettersboard')
const mouseHoverEng = document.querySelector('#hovereng')
const mouseHoverArb = document.querySelector('#hoverarb')

const reset = () => {
    secretWord = ''
    guessedLetters = []
    wrongLetters = []
    mistakes = 0
    hint = ''
    randumHolder = 0
    console.log("Pressesd")
    randumHolder = selectRandomWord()
    secretWord = words[randumHolder]
    hint = hints[randumHolder]
    console.log(secretWord)
    console.log(hint)
    keyboardContainer.textContent = ""
    document.querySelector('.hintarea').textContent = "Hint: Press Hint to View!"
    updateDisplay()
    createKeyboard()
    hangbodyElement.style.backgroundImage = 'url("photos/pirate-yes.webp")'

}
const hintText = () => {
    document.querySelector('.hintarea').textContent = `Hint: ${hint}`

}




const words = [
    'variable', 'function', 'array', 'object', 'class', 'method', 'loop', 'condition', 'string', 'boolean', 'integer', 'float', 'constant', 'scope', 'module', 'library', 'framework', 'compiler', 'debugger', 'algorithm', 'index', 'pointer', 'namespace', 'operator', 'protocol', 'interface', 'override', 'inherit', 'encapsulation', 'polymorphism'

]

const hints = [
    'A storage location paired with a name.', 'A block of code designed to perform a particular task.', 'A collection of elements, indexed by numbers.', 'A data structure that stores key-value pairs.', 'A blueprint for creating objects.', 'A function defined within a class.', 'A sequence of instructions that repeats.', 'A statement that controls the flow based on a condition.', 'A sequence of characters.', 'A data type that can be true or false.', 'A whole number.', 'A number with decimal points.', 'A value that cannot be altered.', 'The context in which a variable is defined.', 'A self-contained piece of code that can be reused.', 'A collection of precompiled routines.', 'A platform for developing software applications.', 'A tool that translates source code into executable code.', 'A tool for finding and fixing bugs in code.', 'A step-by-step procedure for solving a problem.', 'A numerical representation of the position of elements.', 'A variable that holds the memory address of another variable.', 'A container for identifiers to avoid naming conflicts.', 'A symbol that represents an operation.', 'A set of rules for transmitting data.', 'A definition of methods and properties that a class must implement.', 'A method that replaces a method in a parent class.', 'The process by which one class inherits properties from another.', 'The bundling of data and methods that operate on the data.', 'The ability of different objects to be treated as instances of the same class.'
]

const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)

    // return words[randomIndex]
    return randomIndex
}
randumHolder = selectRandomWord()
secretWord = words[randumHolder]
hint = hints[randumHolder]

console.log(secretWord)
console.log(hint)

mouseHoverEng.addEventListener('mouseenter', () => {
    document.querySelector('#target').textContent = 'Ahoy, matey! Get ready for an adventure to save the pirate and claim his hidden treasure. The secret to unlocking the gold lies in guessing the letters of the mysterious word. But beware, you have only 5 chances to make mistakes. Each wrong guess brings the pirate closer to being hanged. If you’re confident, you can guess the whole word, but remember, a wrong guess will cost you dearly! Can you outsmart the gallows and seize the treasure? Good luck, brave sailor! Your quest for pirate gold awaits. ⛏️💰 '

})

mouseHoverEng.addEventListener('mouseout', () => {
    document.querySelector('#target').textContent = ''
})

mouseHoverArb.addEventListener('mouseover', () => {
    document.querySelector('#target').textContent = '  يا صديقي، استعد لمغامرة لإنقاذ القرصان والحصول على الكنز المخفي. السر لفتح الذهب يكمن في تخمين حروف الكلمة الغامضة. لكن احذر، لديك 5 فرص فقط لارتكاب الأخطاء. كل تخمين خاطئ يقرب القرصان من المشنقة. إذا كنت واثقًا، يمكنك تخمين الكلمة كاملة، لكن تذكر، التخمين الخاطئ سيكلفك كثيرًا! هل تستطيع التفوق على المشانق والاستيلاء على الكنز؟ حظًا سعيدًا، أيها البحار الشجاع! مهمتك للحصول على الذهب القرصاني تنتظرك. ⛏️💰'

})

mouseHoverArb.addEventListener('mouseout', () => {
    document.querySelector('#target').textContent = ''

})


const createKeyboard = () => {



    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    letters.forEach(letter => {
        const button = document.createElement('button')
        button.textContent = letter
        button.addEventListener('click', () => handleGuess(letter))
        keyboardContainer.appendChild(button)
    })

}
createKeyboard()


const handleGuess = (letter) => {
    if (secretWord.includes(letter)) {
        guessedLetters.push(letter)
    } else {
        wrongLetters.push(letter)
        mistakes++
    }
    updateDisplay()
}

const updateDisplay = () => {
    correctGuesses.textContent = secretWord.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ')
    wrongGuesses.textContent = 'Wrong guesses: ' + wrongLetters.join(', ')
    updateHangmanImage()
}


const updateHangmanImage = () => {
    hangmanImage.textContent = 'Status: ' + mistakes + ' mistakes'
    if (mistakes >= 6) {
        hangmanImage.textContent += ` - I will take revenge on you ${userNameHolder}! The Word Is: ${secretWord}`
        keyboardContainer.textContent = ""
        hangbodyElement.style.backgroundImage = 'url("photos/pirate-no.webp")'
    }
}


completeAnswerInput.addEventListener('keypress', (fullans) => {
    if (fullans.key === 'Enter' && mistakes < 6) {
        if (completeAnswerInput.value.toLowerCase() === secretWord) {
            correctGuesses.textContent = 'You won! The word was ' + secretWord
        } else {
            mistakes++
            updateHangmanImage()
        }
        completeAnswerInput.value = ''
    }
})


UserNameInput.addEventListener('keypress', (username) => {
    if (username.key === 'Enter') {
        document.querySelector('#username').textContent = `Hi ${UserNameInput.value}`
        userNameHolder = UserNameInput.value
        UserNameInput.value = ''
    }
})

resetbutton.addEventListener('click', reset)

hintbutton.addEventListener('click', hintText)


updateDisplay()

