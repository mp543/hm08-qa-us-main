#Project 8


Project Name:
    Urban Routes App automaed tests

Description:
    JavaScript testing of the GET, POST, PUT, and DELETE HTTP requests used in the Urban Routes API.

Technologies:
    IDE: Visual Studio Code
    Runtime environment: Node.JS 
    Package manager: npm
    Test automation framework: webdriverIO

Techniques:
    aysnc/await asynchronous programming
    describe...it blocks
    assertions `expect`
    positive testing

How to Run the Project:
    1. Clone or save the repo to your local computer from GitHub. 
        - Open a terminal emulator such as Visual Studio Code
        - Save the project files to your local computer
        - Alternativly clone the repo using the following command based on your authentication strategy:
            HTTPS: git clone https://github.com/b1tn8/hm08-qa-us.git
            SSH: git clone git@github.com/b1tn8/hm08-qa-us.git

    2. Install NPM in the project folder:
        - First, update Chrome and Firefox 
        - Navigate to the terminal or terminal within Visual Studio
        - Navigate to the main project folder (/hm08-qa-us) in the terminal
        - Run `npm install`

    3. Set the test URL:
        - Open the wdio.config.js file
        - Copy the server URL into the base_URL variable

How to Run Tests:
     - Within the project folder, enter the command `npm run wdio` into the terminal
     - This will run all tests listed in the createAnOrder.e2e.js file
     - If you want to see the GUI as the tests run, navigate to wdio.config.js and //comment out the 'headless' option for Chrome & Firefox