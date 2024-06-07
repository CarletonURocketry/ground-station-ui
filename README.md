
# Ground Station UI

Visualizes real-time telemetry data from the CUInSpace rocket. The telemetry data is parsed by the Python backend and sent to the frontend as JSON over WebSocket. Map data
is provided via a self-hosted tiling server.
## Installation Instructions
Pull both the front-end and back-end repos (Backend needs to be up and running for the front-end to work)

Backend repo: https://github.com/CarletonURocketry/ground-station.git
```bash
  git clone <my-project>
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start tiling server (used to show interactive map)
```bash
  npm run tile_server SAMapTiles2
```

Start the server

```bash
  npm run start
```


## Tech Stack

**Client:** React, VisX/D3.js, React Grid Area, CSS, Node (bun ;) )

**Server:** Python

**Tiling Server:** Tile images provided by Mobile Atlas Creator and served using Python

## Documentation

[More coming in the near future]
Please visit [the repository's wiki](https://github.com/CarletonURocketry/ground-station-ui/wiki) to view the documentation for this project.

## Contributing

To contribute to this project, please view the contribution guidelines in the project's GitHub Wiki. Note that contributions are currently limited to Carleton University students or CUInSpace members.


## Authors

- [@SippinOnJuiceBox](https://www.github.com/sippinonjuicebox)
- [@EliasJRH](https://github.com/EliasJRH)


## License

[MIT](https://choosealicense.com/licenses/mit/)

