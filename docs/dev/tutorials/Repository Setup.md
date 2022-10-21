# Repository Set Up

Now that everything is installed, you can set up the repository on your own machine so that you can start working on adding features.

## Cloning the Repository

The repository for the Ground Station UI can be found [here](https://github.com/CarletonURocketry/ground-station-ui).

**To clone the repository to your machine:**

1. In your terminal, navigate to the directory (folder) where you want to store the repository
2. Enter the command `git clone https://github.com/CarletonURocketry/ground-station-ui.git`
3. Once the repository has been cloned, open the groud-station-ui folder in your code editor of choice (VSCode is recommended)
4. Celebrate!

## Running the UI

The React framework requires _a lot_ of dependencies, called node modules. Because there are so many of these, they aren't included in the repository, or it would take forever to `push` and `clone` because so much data is being sent each time.

When you clone the repository for the first time, you will be missing these dependencies that are required to run the UI. This means you need to install them. Thankfully, `package.json` keeps track of everything that needs to be installed.

**To install dependencies, follow these steps:**

1. Navigate to the `ground-station-ui` folder in your terminal
2. Enter the command `npm install`
3. Wait while all the dependencies are installed

_**Note:** Even though you've installed the dependencies now, there may be more added libraries later. If you get an error about a missing dependency, just follow three steps above again._

Now the dependencies are installed, but you still need to run the UI. To do this, there is one easy step.

1. Enter the command `npm start` in your terminal whilst in the `ground-station-ui` folder

You will see the UI begin at the URL `localhost:3000` in your browser. It's pretty boring because it's not connected to the backend, but that's okay. Now you will connect to the backend.

## Connecting to the Backend

Because the UI is supposed to run with real-time data, the backend needs to simulate that (because obviously the rocket isn't going to be launched every time we need to test the UI).

The UI connects to a websocket when you open it, so all you need to do is run the backend. For that, you will use the repository you cloned in the [Installing Dependencies](./Installing%20Dependencies.md) tutorial.

1. In your terminal, navigate to the ground-station backend folder
2. Enter the command `py main.py`
3. When prompted for which port to use, enter `test` (newer versions don't require this step)

Now the backend is running and sending fake data. You may need to reload the UI in your browser to see this working. The UI
should display **connected** in green at the top.

## Final Note

You're now set up for development! Also note that our `npm start` command runs the UI in development mode. This means that it will refresh with your changes any time you edit a file in the `ground-station-ui` folder and save it.
