import {
  EvolutionChain as ApiEvolutionChain,
  EvolutionLink as ApiEvolutionLink,
  SpriteInfo
} from '../../api/Pokemon/PokeModel';
import { EvolutionChain, EvolutionLink } from './Model';
import { OFFICIAL_ARTWORK_URL } from '../../constants';

export const getArtworkUrl = (id:string) => OFFICIAL_ARTWORK_URL.replace('[id]', id);

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

export const extractEvolutionChain = (evolutionChain: ApiEvolutionChain) => {
  const chain:EvolutionChain = {
    pokemonInChain: 0,
    evolvesTo: [] as EvolutionLink[]
  };

  chain.evolvesTo.push(processChain(chain, evolutionChain.chain));

  return chain;
};
