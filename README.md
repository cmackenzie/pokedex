# Getting Started with your new Pokedex

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and as such includes all of the amenities one would expect from such a well maintained project!

Your Pokedex is running on React 18.5, Redux 4.2 and Typescript 4.9.5.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## A Tour of Your Pokedex

While your Pokedex runs at any resolution, maximum viewing pleasure is around 800px-1200px. This gives the right amount of information density, and feels like a pocket utility. Large resolutions make it sparse. Smaller resolutions are fine as well.
![image](https://github.com/cmackenzie/pokedex/assets/453326/844a1c58-2042-4350-b205-f54efa32e197)
![image](https://github.com/cmackenzie/pokedex/assets/453326/083d761a-fa9a-4ea0-945b-51e04edacc6a)

### Inspiration

It's been years since I've played any Pokemon game, realistically probably Pokemon Red/Blue in the mid/late 90s, so I had to refresh myself a bit on what a Pokedex is and what it's supposed to do.

There are 2 Pokedex online I used as guide for how a Pokedex should work

- The official Pokedex https://www.pokemon.com/us/pokedex
- The unofficial Pokedex https://pokemondb.net/pokedex/all

I drew inspiration from these for how a Pokedex should work while putting my own spin on it -easier navigation than the official one, and a more modern design than the unofficial

### What you can do (aka Feature City)

#### Endlessly scroll all pokemon until you've seen em all
![image](https://github.com/cmackenzie/pokedex/assets/453326/08d50876-c958-4109-855f-457236cd02a9)

The main screen of your pokedex allows you to scroll through all pokemon seamlessly, without having to navigate or manually load in.

#### Search for and view a specific pokemon
![image](https://github.com/cmackenzie/pokedex/assets/453326/8bf2fb81-efd4-4644-be5f-99ffb7d4dcd8)

The search box in the top right of your pokedex allows your to lookup specific pokemon directly. After you've searched them once, their name will remain in your search history (localStorage) indefinitely, so you may reuse previous searches as needed.

#### Review meta data (height/weight/type/abilities) of any pokemon
![image](https://github.com/cmackenzie/pokedex/assets/453326/90850566-ad3d-41db-a9d0-95ed25fb9b65)

Did you know Charizard isn't even 6 feet tall? One of the several TIL while working on this project.
Name, number, height, weight growth rate, shape, color, types, and abilities are all available for your viewing pleasure.

#### Review base stats and compare them to min/max for those stats
![image](https://github.com/cmackenzie/pokedex/assets/453326/0c65470d-cbb1-457c-aebe-3871b2bdb602)

A quick at a glance view of every pokemons base stats gives you an idea of what their floor and ceiling are in terms of power. A useful tool!

#### Review all possible evolution chains
![image](https://github.com/cmackenzie/pokedex/assets/453326/0bc3b1f2-e14b-4013-bcf0-d321cd9c92bf)

Eevee has evolution options like I have shoe options. How do I even choose? Every possible evolution chain is available for review. Chains that fork (Ralts, Kirlia) create distinct evolution chains for each form. This was done to make it easier to see what you're available discrete paths are for each pokemon. Evolution criteria is listed between the evolved states.

#### Geek out over alternative poke media (sprites)
![image](https://github.com/cmackenzie/pokedex/assets/453326/5ccde749-c18c-42ad-9b91-ff52e8f460c0)

All of the non-version sprites are available for persual, enjoy!. I removed version sprites because there were so many and I felt it took up too much real-estate (taking my PM hat off now).

#### View a list of learnable moves
![image](https://github.com/cmackenzie/pokedex/assets/453326/4e59a2e0-9d36-4ee9-996f-4aadbec5cb0b)

You may take a look at all of the available moves for a pokemon. Clicking on a move will take you out to a pokemondb page where you can read what it does. Future iterations of this pokedex would make this data easier to read/search/filter/review. Given the scope of the project I felt this was a reasonable stopping point though.

#### Known Issues

No project is perfect and every project has bugs/rough edges. I'm filing these with the backlog to be prioritized with future work (whoops how did this hat get back on my head?).

- When scrolling through the pokemon and then selecting a pokemon. After you navigate back you lose your spot on the scroll. Similarly if you're scrolled significantly far down on the list of pokemon, navigating to a pokemon view starts you mid-scroll. These are probably one in the same problem.
- There is a race condition if you use the search/jump to pokemon too soon while it's still loading a previous pokemon. It can fail to load sometimes in this case.

#### Feature Requests

Can be sent to cameron.r.mackenzie@gmail.com I'd be glad to add whatever you'd like!

## A Tour of Your Pokedex Code

The code/project structure is a fairly standard react/redux app. The whole app is 2 routes, an index aka Dashboard, and a pokemon view - Pokemon... there are only 2 hard things in computer science.

### api

The api layer is just the datasource layer, it is soley responsible for reaching out to external data providers and parsing/processing data/results from those external entities. More robust projects would have a ton of edge case/error handling in this layer dealing with network issues and bad request/responses. In this project it's a light wrapper around the PokeApi with minimal error handling. There is one datasource, the pokeapi.

### components

This houses shared and/or reusable components.

### layouts

Maybe we offer more features or different UX to paid users over the freeloaders. It probably starts with a different layout for those folks. For now, there is one Default layout that all users may enjoy. This is also where theming would likely go, had I gotten to it.

### pages

Top-level pages and other navigatible routes go here. There are 2 right now, Dashboard (default) and Pokemon (pokemon view).

### services

We leave presentation to the react components and data retrival to the api layer. The services layer transforms/manipulates/validates/stitches together our data into something our components want to work with. A lot of business logic like "What data is valuable to us?" is decided here. That way the components are working with a tight object of useful data.

### slices

Your every day Redux reducers and store manipulaters. There are 2, a SearchSlice that leverages localstorage for persistant storage and a PokemonSlice that manages the data on the Dashboard/Pokemon pages.

### Wishlist (things I thought about doing but didn't get to)

#### Code

- There is some theming I would have liked to have done to centralize a lot of the reused styles/fonts/colors, but I didn't quite get around to it, so #333 for instance is reused quite often (the soft black font you see everywhere).
- Organize my imports better
- Organize my css a bit better (BEM, SMACSS)
- More and better tests, I ran in to some issues setting up proper testing wrt mocks and the api (yea this should be dead simple, I know).

#### Features (shiny things)

- navigating forward/back in the pokemon list from a pokemon view
- deleting saved searches
- better UX for moves (search/sort/filter and more meta data in general)
- better UX for base stats (more context, interactibilty)
- better UX for the sprites (they're all diff sizes and taking up odd amounts of space)
