import React from 'react';
import { capitalize } from '@mui/material';
import { EvolutionTrigger } from '../../services/Pokemon/Model';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import PokeEvolutionDetail from './PokeEvolutionDetail';
import styled from '@emotion/styled';

const TriggersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TriggerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding-bottom: 20px;
`;

const TriggerLabel = styled.div`
  font-weight: 800;
  font-size: 10px;
`;

// Only show a certain set of details
const allowedDetails = new Set([
  'gender',
  'held_item',
  'item',
  'known_move',
  'known_move_type',
  'location',
  'min_affection',
  'min_beauty',
  'min_happiness',
  'min_level',
  'party_species',
  'party_type',
  'relative_physical_stats',
  'time_of_day',
  'trade_species'
]);

interface PokeEvolutionTriggersProps {
  triggers: {
    trigger: string
    details: {
      name: string
      value: { name: string } | string
    }[]
  }[]
}

function PokeEvolutionTriggers(props: PokeEvolutionTriggersProps) {
  const { triggers } = props;

  if(triggers.length === 0) {
    return null;
  }

  const groups = triggers.reduce((groups:{ [index:string]: EvolutionTrigger[] }, trigger) => {
    groups[trigger.trigger] = groups[trigger.trigger] || [];
    groups[trigger.trigger].push(trigger);
    return groups;
  }, {});

  return <TriggersContainer>
    {Object.entries(groups).map(([trigger, grouped]) =>
      <TriggerContainer key={trigger}>
        <TriggerLabel>{capitalize(trigger.replace('-', ' '))}</TriggerLabel>
        {grouped.map((group, idx) =>
          <React.Fragment key={group.trigger + idx}>
            {group.details
              .filter(detail => allowedDetails.has(detail.name))
              .map(detail => <PokeEvolutionDetail key={detail.name} detail={detail} />)}
          </React.Fragment>)}
        <TrendingFlatIcon />
      </TriggerContainer>)}
  </TriggersContainer>;
}

export default PokeEvolutionTriggers;
