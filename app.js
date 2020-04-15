// DOM Objects

const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const prevButton = document.querySelector('.left-button');
const nextButton = document.querySelector('.right-button');
const downButton = document.querySelector('.d-pad__cell.bottom');
const upButton = document.querySelector('.d-pad__cell.top');
const leftButton = document.querySelector('.d-pad__cell.left');
const screenImage = document.querySelector('.screen__image');
const description = document.querySelector('.screen__description');
const abilities = document.querySelector('.screen__abilities');
const pokeAbility1 = document.querySelector('.ability1');
const pokeAbility2 = document.querySelector('.ability2');
const ability1Desc = document.querySelector('.ability1-desc');
const ability2Desc = document.querySelector('.ability2-desc');
const screenMoves = document.querySelector('.screen__moves');
const pokeMove1 = document.querySelector('.pokeMove1');
const pokeMoveDesc1 = document.querySelector('.pokeMove1-desc');
const pokeMove2 = document.querySelector('.pokeMove2');
const pokeMoveDesc2 = document.querySelector('.pokeMove2-desc');
const pokeMove3 = document.querySelector('.pokeMove3');
const pokeMoveDesc3 = document.querySelector('.pokeMove3-desc');
const pokeMove4 = document.querySelector('.pokeMove4');
const pokeMoveDesc4 = document.querySelector('.pokeMove4-desc');

let tempPokeName = null;
let pokeHomePage = true;

// Constants and variables 
const TYPES = [
  'normal', 'fighting', 'flying', 
  'poison', 'ground', 'rock', 
  'bug', 'ghost', 'steel',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
];

let prevUrl = null;
let nextUrl = null;


// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

const fetchPokeList = url => {
  fetch(url)
    .then(res => res.json())
      .then(data => {
        
        const { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;

        for (let i = 0; i < pokeListItems.length; i++){
          const pokeListItem = pokeListItems[i];
          const resultData = results[i];
          
          if(resultData) {
            const { name, url } = resultData;
            const urlArray = url.split('/');
            const id = urlArray[urlArray.length - 2];
            pokeListItem.textContent = id + '.' + capitalize(name);
          } else {
            pokeListItem.textContent = '';
          }
        }

      });

};

const fetchFirstAbility = id =>{
  return fetch(`https://pokeapi.co/api/v2/ability/${id}`)
    .then(res => res.json())
      .then(data => {

        const abilityDesc = data['effect_entries'];

        if(abilityDesc){
          ability1Desc.textContent = abilityDesc[0]['short_effect'];
        }

      });  
};

const fetchSecondAbility = id =>{
  return fetch(`https://pokeapi.co/api/v2/ability/${id}`)
    .then(res => res.json())
      .then(data => {

        const abilityDesc = data['effect_entries'];

        if(abilityDesc){
          ability2Desc.textContent = abilityDesc[0]['short_effect'];
        }

      });  
};

const fetchMove1 = id => {
  return fetch(`https://pokeapi.co/api/v2/move/${id}`)
  .then(res => res.json())
    .then(data => {

      const moveName = data['name'];
      const moveDesc = data['effect_entries'][0]['short_effect'];
      const moveChance = data['effect_chance'];

      if(moveChance){
        const newDesc = moveDesc.replace("$effect_chance%", moveChance + "%");
        console.log(newDesc);
        pokeMoveDesc1.textContent = newDesc;

      } else {
        pokeMoveDesc1.textContent = moveDesc;
      }

      pokeMove1.textContent = capitalize(moveName);  

    });  
};

const fetchMove2 = id => {
  return fetch(`https://pokeapi.co/api/v2/move/${id}`)
  .then(res => res.json())
    .then(data => {

      const moveName = data['name'];
      const moveDesc = data['effect_entries'][0]['short_effect'];
      const moveChance = data['effect_chance'];

      if(moveChance){
        const newDesc = moveDesc.replace("$effect_chance%", moveChance + "%");
        console.log(newDesc);
        pokeMoveDesc2.textContent = newDesc;

      } else {
        pokeMoveDesc2.textContent = moveDesc;
      }

      pokeMove2.textContent = capitalize(moveName);  
    });  
};

const fetchPokemon = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
 .then(res => res.json())       //convert into json object
  .then(data => {
    
    resetScreen();

    // rearranges orders of types
    const dataTypes = data['types'];
    
    const dataAbilities = data['abilities'];

    const moves = data['moves'];

    if(moves[0]){
      const { url } = moves[0]['move'];
      const moveUrl = url.split('/');
      const moveId = moveUrl[moveUrl.length - 2];
      fetchMove1(moveId);
    }

    if(moves[1]){
      const { url } = moves[1]['move'];
      const moveUrl = url.split('/');
      const moveId = moveUrl[moveUrl.length - 2];
      fetchMove2(moveId);
    }
    
    if(dataAbilities[0]){
      const { name, url} = dataAbilities[0]['ability'];
      const abilityUrl = url.split('/');
      const abilityId = abilityUrl[abilityUrl.length - 2];
      pokeAbility1.textContent = capitalize(name);
      fetchFirstAbility(abilityId);
    }

    if(dataAbilities[1]){
      const { name, url} = dataAbilities[1]['ability'];
      const abilityUrl = url.split('/');
      const abilityId = abilityUrl[abilityUrl.length - 2];
      pokeAbility2.textContent = capitalize(name);
      fetchSecondAbility(abilityId);
    }

    if(dataTypes[1]) {
      const dataFirstType = dataTypes[1];
      const dataSecondType = dataTypes[0];
      pokeTypeTwo.classList.remove('hide');
      pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
      pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
      mainScreen.classList.add(dataFirstType['type']['name'])
  }
  else {
      const dataFirstType = dataTypes[0];
      pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
      pokeTypeTwo.classList.add('hide');
      pokeTypeTwo.textContent = "";
      mainScreen.classList.add(dataFirstType['type']['name'])
  }

    //Split API-data into different variables 
    pokeName.textContent = capitalize(data['name']);
    tempPokeName = pokeName.textContent;
    pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
    pokeWeight.textContent = data['weight'];
    pokeHeight.textContent = data['height'];

    pokeFrontImage.src = data['sprites']['front_default'] || '';
    pokeBackImage.src = data['sprites']['back_default'] || '';
  });
};

const handleNextButtonClick = () => {

  if(nextUrl){
    fetchPokeList(nextUrl);
  }
};

const handlePrevButtonClick = () => {
  if(prevUrl){
    fetchPokeList(prevUrl);
  }
};

const handleListItemClick = (e) => {
  if (!e.target) return;
 const listItem = e.target;

  if (!listItem.textContent) return;
  const id = listItem.textContent.split('.')[0];
  fetchPokemon(id);
  handleUpArrowClick();
};

const handleDownArrowClick = (e) => {
  screenImage.classList.add('hide');
  description.classList.add('hide');
  abilities.classList.remove('hide');
  screenMoves.classList.add('hide');
  if(pokeHomePage){
    tempPokeName = pokeName.textContent;
  }
  pokeHomePage = false;
  pokeName.textContent = "Abilities";

}

const handleUpArrowClick = (e) => {
  abilities.classList.add('hide');
  screenMoves.classList.add('hide');
  screenImage.classList.remove('hide');
  description.classList.remove('hide');
  pokeName.textContent = tempPokeName;
  pokeHomePage = true;
}

const handleLeftButtonClick = (e) => {
  screenImage.classList.add('hide');
  description.classList.add('hide');
  abilities.classList.add('hide');
  screenMoves.classList.remove('hide');
  if(pokeHomePage){
    tempPokeName = pokeName.textContent;
  }
  pokeHomePage = false;
  pokeName.textContent = "Moves";

}

// adding event listeners
prevButton.addEventListener('click', handlePrevButtonClick);
nextButton.addEventListener('click', handleNextButtonClick);
downButton.addEventListener('click', handleDownArrowClick);
upButton.addEventListener('click', handleUpArrowClick);
leftButton.addEventListener('click', handleLeftButtonClick);


for (const pokeListItem of pokeListItems){
  pokeListItem.addEventListener('click', handleListItemClick);
}

// initialize app
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')