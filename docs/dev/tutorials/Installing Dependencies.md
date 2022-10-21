# Installing Development Dependencies

This documentation will outline the base requirements you need to have in order to begin contributing.

## Project Overview

The ground station UI uses HTML, CSS and React. React is a JavaScript framework that makes it simpler to divide parts of our HTML in components.

This allows us to re-use code snippets, and also bundles the HTML snippets with their CSS styles and JavaScript functionality. This way, each component is independent, and can be re-used multiple times anywhere in the UI.

Handy tutorials for HTML, CSS, JavaScript and React are linked in the [resources section](./Resources.md).

If you are already familiar with React, please note that this project uses functional components.

## Dependencies

In order to contribute to this project, you will need to have a few dependencies installed.

### Node.js

In order to be able to run the front-end, you will need to install Node.js to your machine. **The installation guide can be found [here](https://nodejs.org/en/)**, and you will just need to install the latest version for your operating system and follow the instructions that the installer displays when you run it.

### Python

Install the latest version of Python for your operating system **[here](https://www.python.org/downloads/)**, and similarly to Node.js, follow the installer's instructions.

Make sure that when you see the option **Add Python to PATH** with a checkbox, select it. Otherwise Python may cause you trouble.

### Backend

The backend that will supply us with live testing data can be found **[here](nhttps://github.com/CarletonURocketry/ground-station)**. You will need to clone the repository on your machine (anywhere is fine) using the command `git clone <url>` where the URL is the repository URL you will copy from the bright green **code** button.

This assumes you have Git installed already as per the previous meetings. If not, please Google how to install Git or ask a team member.

**Backend Modules**

The Python backend requires a few additional dependencies to run. These dependencies can be found [here](https://github.com/TASelwyn/CU-InSpace-ground-station/blob/main/README.md) in the backend documentation.

For each of these dependencies, you will need to type `pip install <module>` into your terminal (the directory you are in does not matter, this installs globally). Replace `<module>` with the name of the module you are installing.

If you have trouble installing any modules, Google "how to install" and the name of your module.
