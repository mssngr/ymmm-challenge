# ymmm-challenge
A solution to a code challenge, listing cars by their year, make, model, and mileage.

## Getting Started
To view the solution in your browser:
1. Clone the repository to your local machine:
	- With SSH: `git clone git@github.com:mssngr/ymmm-challenge.git`
	- With HTTPS: `git clone https://github.com/mssngr/ymmm-challenge.git`
2. Navigate to the repository: `cd ymmm-challenge`
3. Install dependencies:
	- With Yarn: `yarn`
	- With NPM: `npm i`
4. Run the dev server:
	- With Yarn: `yarn start`
	- With NPM: `npm run start`
5. Navigate to `http://localhost:3000` in your browser

The main UI and logic can be found in `src/components/VehicleList.jsx`, which is a good file to start examining the source in. Search and Sorting code can be found in their own components within the Header component (`src/components/Header.jsx`.) Pagination is found within its own component in the Footer (`src/components/Footer.jsx`.) Lastly, The redux reducer also handles a bit of logic concerning data transformation (`src/state/reducers.js`.)

## Decisions

### React
I chose React for my front end framework simply because of my extensive experience with it, ensuring I could build the project out quickly and efficiently.

### Redux
I could have made the HTTP request at the top layer of the app (the App component,) then passed the local state to its children, along with the setState function. This being such a small project, that would have been reasonable. However:

1. I hate passing props all over the place, down through 2-3 layers of components just to get it to the component I want.
2. Putting all the logic for shared state in the presentational components can get messy and confusing.
3. Storing all my shared data in reducers makes it much easier to test.

So, I decided to bring Redux into the project to simplify and organize the code (especially since others would be looking at it) and to reduce the chance of unexpected side effects.

There were some specific decisions I made about my reducer structure, so I’ll explain them here:
- Vehicles/Pages: There’s not much going on with the “pages” reducer, but it felt more “organized” to separate that shared state from the shared vehicle state. A bit of a “separation of concerns” decision.
- Filtered/Unfiltered Vehicle Data: The decision to store vehicle data in two places was a hard one to make. I wanted to be able to filter down the vehicle objects, while retaining an untouched version of the full vehicle list. I couldn’t think of another way to do this but to have a clone that never gets filtered, so it can always be referenced as the “full” list.
- Sorting: There’s a definite case that could be made against my decision to sort the actual data in Redux, rather than doing that sorting in the UI component at time of display. There’s ways I could have accomplished this (like only storing the “sort by” method in redux and referencing that in the UI component,) but I decided for time’s sake and for ease of coding, firing off actions that triggered the data to change in Redux was a decent compromise, and the vehicle data was not being shared with a component that needed unsorted data. No harm, no foul. I’d probably go back and just do my sorting in the actual component, if I did it again, though, instead of in Redux.

### Styled Components
I like to use CSS in JS libraries like Styled Components when I get the opportunity because of how quickly and easily I can write scoped CSS for components. There’s almost no boiler plate to having isolated, reusable styles. I also really like how Styled Components lets you write semantic elements (`<Box>` instead of `div className=“box”`.) Unfortunately, in this project, I didn’t do much “reusing” at all. So I didn’t benefit as much from that.

### Tests
I used Jest, because that’s what I’m most familiar with. As the requirement didn’t call for complete test coverage, but more a sampling of how I write tests, I decided to write tests for the reducers (which I think is extremely valuable in any project using Redux) and for the local state of the Pagination component, which I think will give a good picture of the kinds of things I test for and how I test.

### Pagination
As listing every single vehicle from the endpoint would show thousands of cars on the screen at once, I decided to paginate the items. It wasn’t in the requirements, but it was annoying to navigate the app while I built it with all those images rendering at once. I had built a custom pagination component for a previous project, so I repurposed/rewrote that same code for this project.

### Search
As long as you’re not trying to implement autocomplete, search is a pretty simple process, just filtering data through “matching.” Abstracting this with a library (`react-search-input`) made sense to me and kept the “Search” component under 100 lines of code. 👍

### Sorting
As discussed in my section on Redux, sorting would have probably made more sense at the time of display in the `VehicleList` component, itself, instead of mutating the data in Redux. For ease of use and timeliness concerns, and because I know no other components were dependent on “unsorted” data, I made the compromise to do my sorting directly on the data in Redux.

### `display-if`
I typically like to use the babel plugin, `display-if`, in my JSX, rather than `condition && <Component>`. However, this would have required me to “eject” my `create-react-app`, and this seemed too unnecessary for a code challenge.

### Routing
If this were a real app, I would have wanted to implement routing for each vehicle’s detail “page,” enabling history, shareability, and back button usage. This seemed overkill for a code challenge, though.

### Loading
Sometimes network requests can hang. It was simply bugging me having the UI jump around all over the place when data finally “popped” in, so I created a loading circle and some placeholder images to stand in for content when it wasn’t quite loaded yet.