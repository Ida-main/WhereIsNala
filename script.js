const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

//starts the game
function startGame() {
//empty
  state = {}
  //starts the first text
  showTextNode(1)
}

//shows the options
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
//takes which option we select
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You woke up with a feeling like you are missing something.',
    options: [
      {
        text: 'You dont really care and start your morning.',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'You feel scared, unsure what youre missing. ',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'After heading to the kitchen, you see something that gives you a deja vu. Is it the pink leash, the black blanket, or you cant be bothered that you gravitates towards?',
    options: [
      {
        text: 'Cant be assed honestly',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Black blanket',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Pink leash ',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After some time standing in stand by mode in kitchen, you move on- where?',
    options: [
      {
        text: 'Into your flatmates room',
        nextText: 4
      },
      {
        text: 'Go back to bed',
        nextText: 5
      },
      {
        text: 'Go to the basement',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You got caught your friend in a kinky position with her norwegian lover, you die of embarresment.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You go to bed, but something mauled your face off slowly why you slept. You died.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You walk down to the basement and sucessfully and gets a stronger deja vu feeling as you walk.',
    options: [
      {
        text: 'Around the corner you head a terrible noise!',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You hear hissing, and scratching behind the door. It scares the living daylight out of you! What are you going to do?',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'You scream in shock',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'You kicked the door down in pure need to defend yourself! ',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'you sneak into the open door, and ignore the mysterious man',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain, you trip in the staircase and dies.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You kicked the door down, and scared the creature that they mauled your eyes out.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You see a cat. You get a feeling that you know this cat. The cat gets so offended that it takes you hostage. youre now a slave',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You opened the door, there is sour Nala that you didnt let her inn soon enough but she gracefully as ever. Let you be blessed by the butt slapp..',
    options: [
      {
        text: 'Congratulations, youre now blessed my Nala. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()