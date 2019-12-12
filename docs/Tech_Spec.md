# Tech Spec
*_Healthcare Rollcall_* is an open-source project designed to be used by the City of Baltimore to supplement its existing emergency response plan. The application will be an API-first project to ensure maximum extendibility and flexibility..

## Overview
In the event of a disaster, Baltimore City and the Baltimore City Health Department (BCHD) is required to verify the electrical power status of all healthcare providers in the city. This system will provide methods for healthcare providers to check-in during disasters, and update their information during non-emergency periods. During an emergency this system will track if any provider:
* Has power
* Is running on backup power
* Has no power
This system will make use of digital services and modern methodologies to automate parts of the check-in process to help the city prioritize its call list and response plan. Additionally, the system will validate contact information regularly during non-emergency times to ensure the city has the most up-to-date information for each provider.

## Scenarios
This section (and subsections) should describe a couple of real-world scenarios that demonstrate the need for the project. This should include an example of the problem, and an example of how the project will resolve that problem. It is recommended that at least 2 scenarios are provided.

## Non Goals
Simply put: what are you _not_ doing with the project at this time? This section is vital to keeping everyone on task and avoid gold-plating. This section can be broken down to illustrate what won't be considered now, but what may be considered in future iterations of the project.

## Minimum Viable Product
1. _Automated or semi-automated check-in system_: The system will allow providers to automatically, or semi-automatically, check-in with the city and provide their status in an emergency.
2. _Emergency administration and triage dashboards_: The system will have a detailed set of dashboards tailored to specific roles within a response team to inform city workers of the state of responses and assign priorities.
3. _Contact management system_: The system will include methods to verify and update provider contact information.
4. _Extendability_: The system will be designed to interface with other systems to integrate information as it becomes available (ie: power grid data).

## Diorama-rama
Can you put your project into pictures? Sure you can! We recommend using [draw.io](https://draw.io) because it's free and you can make pretty diagrams of all sorts like this:

![draw.io example](https://github.com/CodeForBaltimore/ProjectTemplate/blob/master/docs/img/mind-map-with-drawio.png?raw=true)

## Components
Break down your project into as many different sections or components as possible. This could include various pages for a web app, or endpoints for an API project just to name a couple of examples. Try to include any wireframes or mock-ups you can to fully illustrate your idea for each piece!

## Roadmap 
### Research 
Code for Baltimore and partners will conduct research to identify UX priorities, alert and check-in methods, and how the product can best supplement Baltimore’s response plan.
### Development 
Based on findings in the research phase the development will be broken into segments to facilitate speedy delivery of each facet of the application. 
### Implementation
Based on development timelines implementation of the system will be rolled out in phases.

## Components
### Web Portal
[VueJS](https://vuejs.org/) - Client Logic and display framework in JavaScript, HTML, and CSS. A peer to Angular and React, but is Open Source. 

### Server Technologies
[Node JS](https://nodejs.org/en/) JavaScript runtime environment
Node provides the following services
* Package management
* JS interpreter for logic (routing, business, database access, etc.)

[Express JS](https://expressjs.com/en/guide/routing.html) Provides the http(s) server for the application
Express JS provides the interface between the the web client and the server-side logic. Runs on Node.

[Docker](https://www.docker.com/products/docker-desktop) Container system. Used for code deployment and server configuration. This allows developers to run the product locally on an identical environment as the Cloud application. Typically, a we would set up Docker container on a Cloud vender which runs the Node environment. There are docker containers for almost any runtime environment under the sun. 

[Heroku](https://www.heroku.com/) The standard cloud vender for _Code for Baltimore._ A competitor to AWS, Google Cloud, Azure etc.

### Database
[PosgreSQL](https://www.docker.com/products/docker-desktop) Heroku's preferred relational database technology. Uses the popular SQL standard.

## Contact Info
Tech Lead: [Jason Anton](https://github.com/revjtanton)
