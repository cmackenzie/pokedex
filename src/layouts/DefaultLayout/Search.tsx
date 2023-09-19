import * as React from 'react';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetSearch, addSearchOption } from '../../slices/SearchSlice';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Button, Box } from '@mui/material';

// The core of this was mostly cribbed from
// https://mui.com/material-ui/react-autocomplete/
// And adapted as needed from there

interface PokeSearchType {
  name: string;
  inputValue: string;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 60%;
`;

const SearchText = styled(TextField)`
  background-color: #fff;
  border: 5px solid #333;
  border-radius: 5px;
  & label.Mui-focused {
    display: none;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      display: none;
    }
  }
`;

const BlackButton = styled(Button)`
  background-color: #333;
`;

const filter = createFilterOptions<PokeSearchType>();

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchValue = useSelector((state:RootState) => {
    return state.search.currentSearch;
  });

  const availableSearches = useSelector((state:RootState) => {
    return state.search.searches;
  });

  return (
    <SearchContainer>
      {location.pathname === '/' ? null : <Box pr={2}>
        <BlackButton
          variant='contained'
          size='large'
          onClick={() => navigate('/')}>
            Pokedex Home
        </BlackButton>
      </Box>}
      <Autocomplete
        value={searchValue}
        onChange={(event, newValue) => {
          // When the x on the search is clicked
          // Clear out any search values and go back to main
          if(newValue === null || newValue === undefined) {
            dispatch(resetSearch());
            navigate('/');
            return;
          }

          const normalizedValue = (typeof newValue === 'string' ?
            newValue : newValue.inputValue).toLowerCase();

          // Don't bother navigating to the active search
          if(normalizedValue === searchValue) {
            return;
          }

          dispatch(addSearchOption(normalizedValue));

          navigate(`/pokemon/${normalizedValue}`);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.inputValue);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name: `Search "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id='poke-search-box'
        options={availableSearches.map(s => ({ name: s, inputValue: s }))}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: '100%', paddingRight: '10px' }}
        freeSolo
        renderInput={(params) => (
          <SearchText {...params} label="Search the pokedex for any pokemon." />
        )}
      />
    </SearchContainer>
  );
}
