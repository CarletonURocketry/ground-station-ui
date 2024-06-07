# Ground Station UI

Visualizes real-time telemetry data from the CUInSpace rocket. The telemetry data is parsed by the Python backend and
sent to the frontend as JSON over WebSocket. Map data is provided via a self-hosted tiling server.

## Installation Instructions

You will need both the front-end and back-end repos. [The backend repo can be found [here].

First clone both repositories:

```bash
  git clone https://github.com/CarletonURocketry/ground-station.git
  git clone https://github.com/CarletonURocketry/ground-station-ui.git
```

### Starting the Backend

Go to the project directory, setup the virtual environment and start the ground station.

```bash
cd ground-station
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py -l <logging-level>
```

### Starting the Frontend

Go to the project directory, install dependencies and start the UI.

```bash
cd ground-station
npm install
unzip mapping_tiles.zip
npm run tile_server mapping_tiles &
npm run start
```

You can also build the UI and start the built version using:
```bash
npm run build
npx serve -s build
```

## Tech Stack

**Client:** React, VisX/D3.js, React Grid Area, CSS, Node (bun ;) )

**Server:** Python

**Tiling Server:** Tile images provided by Mobile Atlas Creator and served using Python

## Documentation

[More coming in the near future]
Please visit [the repository's wiki](https://github.com/CarletonURocketry/ground-station-ui/wiki) to view the documentation for this project.

## Contributing

To contribute to this project, please view the contribution guidelines in the project's GitHub Wiki. **Note that
contributions are currently limited to Carleton University students or CU InSpace members.**

## Authors

- [@SippinOnJuiceBox](https://www.github.com/sippinonjuicebox)
- [@EliasJRH](https://github.com/EliasJRH)

## License

[MIT](https://choosealicense.com/licenses/mit/)

<!--- Links --->

[ground-station]: https://github.com/CarletonURocketry/ground-station
