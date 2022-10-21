<img width="140px" align="left" style="padding: 15px" src="https://github.com/CarletonURocketry/ground-station-ui/blob/main/public/colour_logo.png?raw=true"/>
<h1>Ground Station UI</h1>
<h3>CUInSpace</h3>

[![License: MIT](https://img.shields.io/badge/License-MIT-FF2D00.svg)](https://opensource.org/licenses/MIT)

Displays data pertaining to the CUInSpace rocket in real-time during launch using a series of graphs and maps. Allows for commands to be sent to the backend and then passed to the ground station.

Currently under construction.

## Overview

A dashboard design with visualization for rocket data. Numerical values are plotted on charts, while the rocket location is recorded on an offline compatible map to allow for easy retrieval by the recovery team.

The UI fundamentally makes use of a websocket connection to the [Python backend](https://github.com/CarletonURocketry/ground-station), which sends telemetry data in real-time as it receives it from the rocket transmission chip. This data is sent in JSON format, where it is unpacked and displayed in chart components.

Importantly, a buffer of historical data is saved to local storage to provide seamless display. If the connection with the ground station or backend is interrupted, the display will statically display the historical data while it attempts to reconnect. As soon as a connection is possible, the UI reconnects and continues real-time display.

Hotkey commands are available to send commands to the backend. These commands are not yet implemented.

The UI also supports flight replay. The backend can send the UI recorded flight data to simulate the launch, allowing for analysis of test flights.

## Technologies

- HTML
- CSS
- React JS

## Documentation

- [Developer documentation](./docs/dev/DevDocs.md)
- [User documentation](./docs/user/UserDocs.md)

## Contribution

To contribute to this project, please view the [contribution guidelines](./docs/dev/tutorials/Contributing.md) listed in the [developer documentation](./docs/dev/DevDocs.md).
