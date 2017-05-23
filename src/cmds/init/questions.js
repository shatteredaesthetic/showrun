export default const questions = [
  {
    type: 'input',
    name: 'projName',
    message: `What is this project\'s name?`
  },
  {
    type: 'input',
    name: 'projSections',
    message: 'How many sections/acts/etc?',
    default: '2'
  },
  {
    type: 'confirm',
    name: 'pre',
    message: 'Is there preshow?',
    default: true
  },
  {
    type: 'confirm',
    name: 'post',
    message: 'Is there postshow?',
    default: true
  },
  {
    type: 'confirm',
    name: 'inter',
    message: 'Is there intermission?',
    default: true
  },
  {
    type: 'confirm',
    name: 'curtain',
    message: 'Is there a curtain speech?',
    default: true
  },
  {
    type: 'input',
    name: 'smName',
    message: `What is the Contact/Stage Manager's name?`,
  },
  {
    type: 'input',
    name: 'smEmail',
    message: `What is the Contact/Stage Manager's email address?`
  },
  {
    type: 'input',
    name: 'sender',
    message: `What is the sender's email address?`
  }
  {
    type: 'list',
    name: 'assets',
    message: `What about Assets? Audio, Projections, or Both?`,
    choices: [ 'Audio', 'Projections', 'Both' ],
    default: 'Audio'
  },
  {
    type: 'confirm',
    name: 'qlScripts',
    message: 'Do you want to include all the cool QLab scripts?'
    default: true
  }
]
