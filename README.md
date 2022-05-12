# NookBuddy

An ACNH (Animal Crossing: New Horizon) wiki app where users can look up specific information from the game database.
 - Deployed Link: http://nookbuddy.herokuapp.com/

# User Story:
**As a Public User:**
- sign up

**As a Logged in User:**
- login and logout.
- view the index page of all the villages currently available in the game.
- click and view individual villagers to see specific information.
- Add villagers to a favorites list.
- Add or delete personal notes to favorite villagers.

# Installation Instructions
 1. Fork and clone this repository
 2. Navigate to the project folder
 3. Create a `.env` file and add the following:
    *  `DATABASE_URL=mongodb://localhost/ PORT=3000`
    *  `SECRET=<ThisCanBeAnything>`
 4. Inside the project folder, run `npm install`
 5. To start the server, run `npm start`
 6. Navigate to `https://localhost:3000`55
 7. The app should now up and running!

 # API Used:
 - Documentation: http://acnhapi.com/doc
 - Github Repo: https://github.com/alexislours/ACNHAPI

# Routes Table:

| Endpoint         | Component | `AuthenticatedRoute`? |
|------------------|-------------------|-------|
| `/auth/signup`       | `SignUp`    | No |
| `/auth/login`       | `SignIn`    | Yes |
| `/villagers`  | `Index`     | Yes |
| `/villagers/:id`  | `Show`| Yes |
| `/my_villagers`  | `Index`| Yes |
| `/villagers/my_villagers/:id`  | `Show`| Yes |
| `/my_villagers/:id/edit`  | `Update`| Yes |

# ERD:
![layout](/public/img/erd2.jpg)

# Wireframe:
![layout](/public/img/wireframe.jpg)
![layout](/public/img/wireframe2.jpg)

# Tech Used:
- JavaScript
- Liquid Express views
- Css/Bootstrap
- Mongoose
- Express
- Node.js

# Stretch Goals:
- Add more data for users to view:
    * Fish, Bugs, Fossils, Art, Items, etc.
- Add more styling
- Fix styling to be responsive
- Coming soon...