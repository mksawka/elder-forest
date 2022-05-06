/*
 * First Elder Forest game prototype.
 */


const output = document.querySelector('.output');
const input = document.querySelector('.input');
const locationName = document.querySelector('.location-name');

let gameState = {
	isBearComing: false,
};

const player = {
	inventory: [],
};

function setCurrentLocation(target) {
	gameState.currentLocation = locations.find( location => location.name === target);
}

function clearPlayerInputOptions() {
	document.querySelectorAll('.input__option').forEach(element => element.remove());
}

function updateGameState(state) {
	gameState = Object.assign(gameState, state);
}

function updateLocationName(name) {
	locationName.textContent = name;
}

function updateOutput(txt) {
	output.textContent = txt;
}

// Dopracować
function checkGameStateRequirements(inputOption) {
	return Object.keys(inputOption.requiredGameState).every(key => gameState.hasOwnProperty(key) && gameState[key] === inputOption.requiredGameState[key]);
}

function updateInput(locationInputOptions) {
	locationInputOptions.forEach( option => {
		if (checkGameStateRequirements(option)) {
			const newInputLine = document.createElement('div');
			newInputLine.classList.add('input__option');
			newInputLine.textContent = option.text;
			newInputLine.addEventListener('click', () => { option.selectThisOption() });
			input.appendChild(newInputLine);
		}
	});
}

function renderLocation() {
	clearPlayerInputOptions();
	updateLocationName(gameState.currentLocation.name);
	updateOutput(gameState.currentLocation.description);
	updateInput(gameState.currentLocation.inputOptions);
}

function movePlayerTo(destination) {
	setCurrentLocation(destination);
	renderLocation();
}

function runGame() {
	setCurrentLocation('Mystery forest');
	renderLocation();
}

/*
 *
 *	In-game items.
 *
 */
const woodenClub = {
		 id: 'woodenClub',
		 dmg: 10,
		 def: 2,
		 weight: 2,
};

/*
 *
 *	In-game locations.
 *
 */
const locations = [
	{
		name: 'Mystery forest',
		description: 'A dream ends rapidly in a fraction of a second. You find yourself lying in a deep cold forest. Location is deeply unknown for you. You feel dizzy. There is a long solid-looking wooden club laying on the ground. What are you going to do now?',
		inputOptions: [
			{
				id: 'scream',
				requiredGameState: {},
				text: 'Scream for help.',
				outputText: gameState.hugeLungs ? 'You are screaming for help. You hear roar of a bear in distance.' : 'No one hears you.',
				setGameState: { isBearComing: true  },
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
				}
			},
			{
				id: 'memorize dream',
				requiredGameState: {},
				text: 'Try to remember what was your dream about.',
				outputText: 'Nothing comes to your mind. You are far too confused right now.',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
				}
			},
			{
				id: 'swamps',
				requiredGameState: {},
				text: 'Go deeper into the woods.',
				outputText: '',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
					movePlayerTo('Swamps');
				}
			},
			{
				id: 'take the club',
				requiredGameState: {},
				text: 'Pick up the wooden club.',
				outputText: 'You bow to take the club from ground. You now carry the wooden club. It feels pretty heavy.',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
					player.inventory.push(woodenClub);
				}
			}
		]
	},
	{
		name: 'Swamps',
		description: 'In front of you unfolds wide and foggy swamps. You find yourself standing in heavy mud. You are unable to move.',
		inputOptions: [
			{
				id: 'scream again',
				requiredGameState: { isBearComing: true },
				text: 'Scream for help, again.',
				outputText: 'You are screaming for help, again. The bear, whose attention you caught by shouting for help earlier, has found you stuck in the mud and ate you alive. It was gruesome death.',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
				}
			},
			{
				id: 'scream',
				requiredGameState: { isBearComing: false },
				text: 'Scream for help.',
				outputText: gameState.isBearComing ? 'You are screaming for help, again. The bear, whose attention you caught by shouting for help earlier, has found you stuck in the mud and ate you alive. It was gruesome death.' : 'You are screaming for help. No one answers. You think you heared something like a roar.',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
				}
			},
			{
				id: 'memorize dream',
				requiredGameState: {},
				text: 'Try to remember what was your dream about.',
				outputText: 'Nothing comes to your mind. You are far too confused right now.',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
				}
			},
			{
				id: 'swamps',
				requiredGameState: {},
				text: 'Go deeper into the woods.',
				outputText: '',
				setGameState: {},
				selectThisOption() {
					updateGameState(this.setGameState);
					updateOutput(this.outputText);
					movePlayerTo('Swamps');
				}
			}
		]
	}
];

runGame();
