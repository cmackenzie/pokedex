import React from 'react';

interface PokeEvolutionDetailProps {
  detail: {
    name: string
    value: { name: string } | string
  }
}

const detailLabelMap: { [index: string]: string } = {
  gender: 'be a',
  held_item: 'have',
  item: '',
  known_move: 'learn move',
  known_move_type: 'learn move type',
  location: 'be near',
  min_affection: 'have affection of',
  min_beauty: 'have beauty of',
  min_happiness: 'have happiness of',
  min_level: 'reach level',
  party_species: 'party specied',
  party_type: 'party type',
  relative_physical_stats: '',
  time_of_day: 'during the',
  trade_species: ''
};

const genderMap: {[index: string]: string } = {
  1: 'female',
  2: 'male'
};

const getDetailValue = (detailName:string, detailValue: string | { name: string }) => {
  if(typeof detailValue === 'string') {
    return detailValue.replaceAll('-', ' ');
  }

  if(typeof detailValue === 'number') {
    if(detailName === 'gender') {
      return genderMap[detailValue];
    }
    return detailValue;
  }
  return (detailValue as { name: string }).name.replaceAll('-', ' ');
};

function PokeEvolutionDetail(props: PokeEvolutionDetailProps) {
  const { detail } = props;

  return <div>
    {detailLabelMap[detail.name] || ''}&nbsp;
    {getDetailValue(detail.name, detail.value)}
  </div>;

}

export default PokeEvolutionDetail;
