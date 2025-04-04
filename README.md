# Car History

This is my project for the final assignment of the CS50x course

#### Video demo: soon

#### Description:

This project aims to be a digital diary for a person's car. Register all expenses during the time you own the car.

### Original Idea

I've originally used Notion as the platform to build the diaries for my cars. Since it can be easely formated the way that I want, I had settled in a table with columns that had all the necessary data I could register. But, overtime, it became a hassle to have to open Notion everytime I wanted to register putting gas in the car, since it's a heavier app, sometimes it would stall to load data and I generally wanted to just quickly add a new entry.

### Tech stack

The project is built using the following technologies:
- Next.js 15
- Auth.js
- Shadcn Components
- Tailwind
- PostgreSQL (Database)
- Coolify (Deployment)

I've been wanting to learn Next.js for sometime and since the structure of the project was simple, I jumped at the opportunity to make a full stack app. Pretty much every item of the stack I had to learn and I can say that was very pleasant experience, none of the difficulties were very hard to overcome and much of the problems were solved by just reading a bit of the documentation.

### Features

The project is a digital diary for all of your cars expenses. Putting gas, new tires, oil changes, all the car's data can also be stored in its page.

The main page presents a form for adding a new entry and the list of the entries of the current year registered from the most recently accessed car. Each entry has a date, description, the odometer count, the place where it happened, any tags and the amount of the expense. They can be edited or deleted by the user at any time and all changes to data are reflected in real time, no need to reload the page.

New cars can be added in a page that has a form, and each registered car has a page, which can only be accessed by that car's owner or any linked emails. It has information about the car, which is name, model, brand, year, color, plate, renavan, which is an unique number in Brazil's equivalent to the DMV, the year of aquisition, the shared emails, containing any people that can also edit the car's data and entries, and the last reported mileage. Below that, there is a list of years for which entries exist.

Clicking any year's page, loads a page simmilar to the home page, only speciffic for that year. Almost everything that is contained in the home page is also here. It is also worth mentioning that almost every action, when done, concludes by showing a message at the bottom of the screen, communicating if it was successful or had an error.

### Technichal Aspects

Authentication is also fully implemented in the project, so anyone can create a profile and register their cars in the app. When creating an account, the user receives an email with a validation token, that is used to conclude the registering process. The user can also reset their password, in case it is forgotten.

Users can only see their's and shared cars, trying to access a car that is not valid results in an error.

The app is completly self hosted, using the Coolify Platform. The whole CI/CD pipeline was implemented by me, including setting up the database and configuring the tunnel to expose the app to the internet with my domain.