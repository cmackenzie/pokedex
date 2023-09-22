import {
  EvolutionChain as ApiEvolutionChain,
  EvolutionLink as ApiEvolutionLink,
  SpriteInfo
} from '../../api/Pokemon/PokeModel';
import { EvolutionChain, EvolutionLink } from './Model';
import { OFFICIAL_ARTWORK_URL } from '../../constants';

// Helper function that does a simple text replace with a pokemon id for a working artwork url
export const getArtworkUrl = (id:string) => OFFICIAL_ARTWORK_URL.replace('[id]', id);

// Helper function that extracts the sprite urls and throws away the version sprites (sadge)
export const extractSprites = (spriteInfo: SpriteInfo) => {

  // filtering out versions here, theres too much to show, only show the good stuff
  delete spriteInfo.versions;

  const unprocessedSprites = Object.values(spriteInfo);
  const sprites:{ url: string }[] = [];

  while(unprocessedSprites.length > 0) {
    const sprite = unprocessedSprites.shift();
    if(sprite === null) {
      continue;
    }
    else if (typeof sprite === 'string') {
      sprites.push({ url: sprite });
    }
    else if(typeof sprite === 'object') {
      unprocessedSprites.push(...Object.values(sprite));
    }
  }

  return sprites;
};

// Recursive method that processes the nested evolution chain
// and returns only the data we care about
const processChain = (chain: EvolutionChain, rawLink:ApiEvolutionLink) => {
  chain.pokemonInChain++;

  const newLink:EvolutionLink = {
    id: Number(rawLink.species.url.split('/pokemon-species/')[1].replace('/', '')),
    avatar: getArtworkUrl(rawLink.species.url.split('/pokemon-species/')[1].replace('/', '')),
    species:  rawLink.species,
    triggers: rawLink.evolution_details.map(rawDetail => ({
      // A small hack to coerce types we know we are OK with processing
      trigger: (rawDetail.trigger as unknown as { name: string }).name,
      details: Object.entries(rawDetail)
        // Only process certain detail entries that we want to make visible to end user
        .filter(([key]) => rawDetail[key] !== null && rawDetail[key] !== '')
        .map(([key, value]) => ({ name: key, value: value as unknown as string | { name: string } })),
    })),
    evolvesTo: []
  };

  for(let i = 0; i < rawLink.evolves_to.length;++i) {
    newLink.evolvesTo.push(processChain(chain, rawLink.evolves_to[i]));
  }

  return newLink;
};

// Grabs the relevant evolution data from the nested evolution data
// Keeps track of the number of pokemon are involved in a chain
export const extractEvolutionChain = (evolutionChain: ApiEvolutionChain) => {
  const chain:EvolutionChain = {
    pokemonInChain: 0,
    evolvesTo: [] as EvolutionLink[]
  };

  chain.evolvesTo.push(processChain(chain, evolutionChain.chain));

  return chain;
};
