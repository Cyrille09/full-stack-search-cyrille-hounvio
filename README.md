# Accommodation Search

## Technical Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with [vite](https://vitejs.dev/).

## Install and run

From the project root:

```
npm install
```

### Run

Once install has finished, you can use the following to run both the API and UI:

```
npm run start
```

### API

To run the API separately, navigate to the `./packages/api` folder

```
$ cd packages/api
```

Create .env file in the `./packages/api` folder and add the below info

```
PORT=3001
DATABASE_URL="mongodb://localhost:27017/accommodation"
PROTOCOL="HTTP"
HOST="localhost"

# redis
REDIS_URL=redis://localhost:6379
REDIS_EXPIRY_TIME= 3600
HOTEL_REDIS_KEY=hotel
```

And run the `api` server with

```
$ npm run dev
```

And run the `api` test

```
$ npm run test
```

Migrate data into the MongoDB database using the endpoint provided below with a [POST] request.

```
$ curl http://localhost:3001/api/migration
```

Copy and paste the endpoint below into a browser to monitor API health checks.

```
$ curl http://localhost:3001/status
```

The API should start at http://localhost:3001

### Client

To run the `client` server separately, navigate to the `./packages/client` folder

```
$ cd ./packages/client
```

And run the `client` with

```
$ npm run start
```

And run the `client` test

```
$ npm run test
```

The UI should start at http://localhost:3000

### Database connection & environment variables

By default, the code is set up to start and seed a MongoDB in-memory server, which should be sufficient for the test. The database URL will be logged on startup, and the seed data can be found at ./packages/api/db/seeds.

If this setup does not work for you or if you prefer to use your own MongoDB server, you can create a .env file. In the ./packages/api folder, create a .env file (or rename the existing .env.sample) and fill in the environment variables.

## Task at hand

When the project is up and running, you should see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignment is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the word `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

Clicking the close button within the search field should clear out the field and results.

When clicking on one of the `Hotels`, `Cities` or `Countries` links, the application should redirect to the relevant page and render the selected `Hotel`, `City` or `Country` as a heading.

### Limitations

Given the time constraints, we do not expect a fully production-ready solution. We're primarily interested in the approach and the overall quality of the solution.
Feel free to modify the current codebase as needed, including adding or removing dependencies.
For larger or more time-intensive changes, you're welcome to outline your ideas in the write-up section below and discuss them further during the call.

<img src="./assets/search-example.png" width="400px" />

### Write-up

<!-- Write-up/conclusion section -->

_When all the behaviour is implemented, feel free to add some observations or conclusions you like to share in the section_

In completing the accommodation search project, I focused on enhancing the functionality and performance of the application while ensuring a smooth user experience. The primary goal was to implement a robust search feature that allows users to find hotels, cities, and countries based on partial string matches.

#### Implementation Insights

##### Search Functionality:

- I utilised a combination of client-side filtering and API calls to ensure that the search results are both fast and relevant. The search input is connected to the /hotels endpoint, allowing for real-time updates as the user types.
- The search logic was designed to handle partial matches for hotel names, city names, and country names. This was achieved by leveraging JavaScript's filter method on the arrays of hotels, cities, and countries fetched from the API. However, If the search value does not match any records, the page will display a message indicating "No records found." This clear notification informs users that their search did not contain any results, enhancing the overall user experience by providing immediate feedback on their query.
- Additionally, I implemented a logic to extract unique countries and cities from the search results. For instance, if the search contains five hotels located in the United Kingdom and three hotels in London, the application will display "United Kingdom" and "London" only once each. This enhancement not only streamlines the results but also improves the user experience by reducing redundancy and making it easier for users to identify relevant locations.

##### Performance Considerations:

- To optimise performance, I implemented debouncing on the search input. This prevents excessive API calls by waiting for the user to stop typing before triggering a search. This approach significantly reduces the load on the server and improves the responsiveness of the UI.
- Additionally, I ensured that the search results are displayed in a user-friendly manner, grouping them under appropriate headings for hotels, cities, and countries.

##### User Experience:

- The UI was designed to be intuitive, with clear headings and a responsive layout. When a user clicks on a hotel, city, or country, they are redirected to a dedicated page that displays the selected item as a heading.
- I also implemented a clear button within the search field, allowing users to easily reset their search and clear the displayed results. This feature enhances usability, especially for users who may want to start a new search without refreshing the page.

#### Key Enhancements

##### Caching with Redis:

- I integrated Redis to cache frequently accessed data, which significantly improved the application's performance. This caching layer reduces the load on the MongoDB database, allowing for faster response times. By storing common queries and their results, the application can serve repeated requests without hitting the database each time.

##### Structured Logging with Winston:

- To facilitate better monitoring, debugging, and error tracking, I implemented Winston for structured logging. This allows for detailed logs that can be easily filtered and analyzed, providing insights into application behavior and helping to identify issues quickly.

##### API Health Checks:

- I added health check endpoints to monitor the status and availability of critical APIs. This feature ensures that the application can proactively detect issues and maintain high availability. By regularly checking the health of the API, we can quickly respond to any outages or performance degradation.

##### Persistent Data Storage:

- Instead of using an in-memory MongoDB server, I switched to a local MongoDB instance for persistent data storage. This change allows the application to retain data across restarts, making it more suitable for real-world usage.

##### Unit Testing:

- I implemented unit tests to validate the functionality of individual components within the application. These tests ensure that each part of the code works as expected and helps maintain code quality through automated validation. By covering various scenarios, the tests provide confidence that new changes will not introduce regressions.

#### Conclusion

Overall, the project provided a valuable opportunity to enhance my skills in building scalable web applications with a focus on user experience and performance. The implementation of caching, structured logging, and health checks significantly improved the application's performance and reliability. The switch to a local MongoDB instance and the addition of unit tests further strengthened the codebase, making it more robust and maintainable.
Moving forward, I would consider exploring additional optimisations, such as implementing more advanced search algorithms or integrating user feedback mechanisms to refine the search experience. Additionally, I would look into further enhancing the logging system to capture more granular metrics, which could provide deeper insights into user interactions and application performance.

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```

## React UI Screenshots

### Search page

![Screenshot 2025-01-30 at 10 56 43](https://github.com/user-attachments/assets/6833a576-70cf-4401-8696-baa44c01f562)

![Screenshot 2025-01-30 at 11 04 52](https://github.com/user-attachments/assets/164f29d9-b4a6-41bb-9154-11344710d533)

### Hotel page

#### Hotel selected

![Screenshot 2025-01-30 at 11 09 27](https://github.com/user-attachments/assets/23038fc4-e4d1-40fc-aac2-178fc207b4b0)

#### Country selected

![Screenshot 2025-01-30 at 11 11 33](https://github.com/user-attachments/assets/c4aa7260-4acb-4964-abd1-42fc93161f27)

#### City selected

![Screenshot 2025-01-30 at 11 11 59](https://github.com/user-attachments/assets/e1ec4a34-94fc-4fd4-9540-a1c2b476b3bb)
