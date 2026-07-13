# SciChart.js Webpack Demo

A collection of interactive real-time 2D chart examples built with [SciChart.js](https://www.scichart.com/javascript-chart-library) and bundled using Webpack.

## Overview

This project demonstrates several common real-time data visualization patterns using SciChart's high-performance JavaScript charting library:

- **Basic Animated Chart** — Sine and cosine waves with live data updates at ~60 Hz
- **Zoom to Fit** — Automatically zooms to fit new data as it streams in
- **Visible Range** — Maintains a sliding window showing only the most recent data points
- **Pan & Zoom** — Interactive panning and zooming with chart modifiers while data continues to append in the background

## Prerequisites

- Node.js v18 or later
- npm (or yarn)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

## Available Scripts

| Command          | Description                                      |
|------------------|--------------------------------------------------|
| `npm start`      | Start webpack-dev-server with live reloading     |
| `npm run build`  | Build optimized production bundle to `build/`    |

## Project Structure

```
SciChar-Webpack/
├── src/
│   ├── index.js           # Entry point – basic animated chart
│   ├── index.html         # HTML with four chart containers + controls
│   ├── zoom-to-fit.js     # Auto-zooming real-time chart
│   ├── visiable-range.js  # Sliding visible range chart
│   └── pan-zoom.js        # Chart with ZoomPanModifier + ZoomExtentsModifier
├── webpack.config.js      # Webpack configuration (copies WASM + HTML)
├── package.json
└── build/                 # Production output (generated)
```

## Key Features Demonstrated

- Real-time data appending and updating
- Multiple `XyDataSeries` + `FastLineRenderableSeries` / `XyScatterRenderableSeries`
- `NumericAxis` with dynamic `visibleRange`
- `sciChartSurface.zoomExtents()`
- `ZoomPanModifier` and `ZoomExtentsModifier`
- Start / Stop / Reset controls for each demo
- WebAssembly-powered high-performance rendering

## Built With

- [SciChart.js](https://www.scichart.com/javascript-chart-library) v5
- Webpack 5 + webpack-dev-server
- ES Modules

## Learn More

- [SciChart.js Documentation](https://www.scichart.com/javascript-chart-documentation)
- [SciChart.js Live Demos](https://demo.scichart.com/)

## License

MIT

