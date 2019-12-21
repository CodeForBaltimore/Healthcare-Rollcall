![Code for Baltimore](/docs/img/CfB.png)

# Healthcare Rollcall
In the event of a disaster, Baltimore City and the Baltimore City Health Department (BCHD) is required to verify the electrical power status of all healthcare providers in the city. This system will provide methods for healthcare providers to check-in during disasters, and update their information during non-emergency periods. During an emergency this system will track if any provider:
* Has power
* Is running on backup power
* Has no power
This system will make use of digital services and modern methodologies to automate parts of the check-in process to help the city prioritize its call list and response plan. Additionally, the system will validate contact information regularly during non-emergency times to ensure the city has the most up-to-date information for each provider.

## Documentation
We've included a `docs` folder with a template [Tech Spec](/docs/Tech_Spec.md) and [Best Practices](/docs/Best_Practices.md) document, though using Github's Wiki capabilities is also a good idea. This will get you started with documenting your project.  Other documents and relevant information that has no other place can live in the `docs` folder.  Replace this paragraph with a brief breakdown of what you've included in your `docs` folder.

## Setup
To run locally you will need NodeJS and Docker installed. You can find install information for your operating system at https://nodejs.org/en/ and https://docs.docker.com/v17.09/engine/installation/

Once Node is install you may run the app locally by running the following commands from the `app` directory:
```
cd /backend
npm install

cd ..
cd /frontend 
npm install 

cd ..
docker-compose up
```

The application will be available at http://localhost:8080/  

**Note:** Depending on the OS you are running Docker on your localhost may be mapped to a different IP address. The standard IP address Docker is mapped to on Windows is 192.168.99.100 so you would access the application at 192.168.99.100:8080.  

## Using this product
How would someone use this product? Give a few examples here.

## Testing
What does someone need to do to test their work? Have you included a specific testing framework or guideline (hint: you should)? Any information about testing should be added here.

## Sources and Links
If referencing any third party service, code, etc, cite it here.

