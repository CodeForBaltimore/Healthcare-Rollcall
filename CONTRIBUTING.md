# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, slack, or any other method with the contributes of this repository, or Code for Baltimore, before making a change. 

Please note we have a [Code of Conduct](/docs/Code_of_Conduct.md), please follow it in all your interactions with the project.

## Overview

In the event of a disaster a municipality or state may have need to check in on the status of all healthcare providers, 
or other types of entities, within in the jurisdiction. This system will provide methods for healthcare providers and 
entities to check-in during disasters, and update their contact information during non-emergency periods. During an 
emergency this system will track (among other things) if any entity:

* Has power
* Has sufficient supplies
* Is informed about the emergency

This system will make use of digital services and modern methodologies to automate and simplify parts of the check-in process 
to help the municipality prioritize its call/check-in list and response plan. Additionally, the system will validate contact 
information regularly during non-emergency times to ensure the municipality has the most up-to-date information for each entity.

### Non Goals

What will this project not accomplish during its initial creation?

- No front-end website or app
- No outside data interactions
- Non-city employee full login (dashboard, etc)
- Statistical or analytical endpoints

### Minimum Viable Product

To use this product as quickly as possible we will be implementing the following features:
- User creation
- Contact creation
- Entity creation
- Contact->Entity linking
- Contact single-use login check-in ability

### Roadmap

We estimate the API will be at v1.0.0 by the end of March. Further Milestones and advancements can be viewed on the [Projects page](https://github.com/CodeForBaltimore/Bmore-Responsive/projects)

## Technology and Code

This project will make exclusive use of open-source software, packages, and contributions. The application is built with the following
technologies:

- Javascript/Typescript
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/v3/)
- [Docker](https://www.docker.com/)
- [Terraform](https://www.terraform.io/)

Please see our [Tech Spec](/docs/Tech_Spec.md) for a full breakdown of the project and workflows.

Please see our [Best Practices](/docs/Best_Practices.md) for code standards, git standards, and other guidance for writing clean and well 
documented code.

### Pull Request Process

1. Ensure you thoroughly fill out the pull request form presented when submitting the request. 
   This includes listing what work was done, what issues are resolved by that work, what tests
   have been added, how to perform other tests or run the code, and other potentially relevant
   notes. 
2. Update the README.md with details of changes to the application, this includes new environment 
   variables, exposed ports, useful file locations and/or container parameters.
3. If you are on the project team you may merge the Pull Request in once you have the sign-off of one other developer, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Contact

The best ways to get in touch with us is via Slack. An active Slack link can be found on our website:

***[codeforbaltimore.org](https://codeforbaltimore.org/)***

You can also reach out to the tech lead [Jason Anton](https://github.com/revjtanton) via email at [jason@codeforbaltimore.org](mailto:jason@codeforbaltimore.org).

## Sources and Links
We are also building a front-end application called [Healthcare Rollcall](https://github.com/CodeForBaltimore/Healthcare-Rollcall) to interact 
with this backend API. To view that project, or to contribute to it, please visit the repo here: https://github.com/CodeForBaltimore/Healthcare-Rollcall
