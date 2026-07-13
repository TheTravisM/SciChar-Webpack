import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyScatterRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";

import { initZoomToFitChart } from "./zoom-to-fit.js";
import { initVisibleRange } from "./visiable-range.js";

async function initSciChart() {
  const { sciChartSurface, wasmContext } =
    await SciChartSurface.create("scichart-root");

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  // Create a Scatter series with EllipsePointMarker
  const scatterSeries = new XyScatterRenderableSeries(wasmContext, {
    pointMarker: new EllipsePointMarker(wasmContext, {
      width: 7,
      height: 7,
      fill: "#9FE2BF",
      stroke: "SteelBlue",
    }),
  });

  // Create a lineSeries with FastLineRenderableSeries
  const lineSeries = new FastLineRenderableSeries(wasmContext, {
    stroke: "#6e6eff",
    strokeThickness: 2,
  });

  sciChartSurface.renderableSeries.add(scatterSeries);
  sciChartSurface.renderableSeries.add(lineSeries);

  const scatterData = new XyDataSeries(wasmContext, {
    dataSeriesName: "Cos(x)",
  });
  const lineData = new XyDataSeries(wasmContext, { dataSeriesName: "Sin(x)" });

  for (let i = 0; i < 1000; i++) {
    lineData.append(i, Math.sin(i * 0.1));
    scatterData.append(i, Math.cos(i * 0.1));
  }

  // Assign these dataseries to the line/scatter renderableseries
  scatterSeries.dataSeries = scatterData;
  lineSeries.dataSeries = lineData;

  // Add Auto update of data
  let phase = 0.0;

  const updateDataFunc = () => {
      for (let i = 0; i < 1000; i++) {
          lineData.update(i, Math.sin(i * 0.1 + phase));
          scatterData.update(i, Math.cos(i * 0.1 + phase));
      }
      phase += 0.1;

      // Repeat at 60hz
      setTimeout(updateDataFunc, 1 / 60);
  };

  updateDataFunc();

}
initSciChart();

// Capture controls from the zoom-to-fit chart so we can stop/start/reset it
let zoomToFitControls = null;

initZoomToFitChart().then((controls) => {
  zoomToFitControls = controls;

  // Wire up buttons (they are defined in index.html)
  const btnStop = document.getElementById("btn-stop");
  const btnStart = document.getElementById("btn-start");
  const btnReset = document.getElementById("btn-reset");

  if (btnStop) {
    btnStop.addEventListener("click", () => {
      controls.stop();
    });
  }

  if (btnStart) {
    btnStart.addEventListener("click", () => {
      controls.start();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      controls.reset();
    });
  }
});

// Capture controls from the zoom-to-fit chart so we can stop/start/reset it
let visibleRangeControls = null;

initVisibleRange().then((controls) => {
  visibleRangeControls = controls;

  // Wire up buttons (they are defined in index.html)
  const btnStop = document.getElementById("btn-visiable-range-stop");
  const btnStart = document.getElementById("btn-visiable-range-start");
  const btnReset = document.getElementById("btn-visiable-range-reset");

  if (btnStop) {
    btnStop.addEventListener("click", () => {
      controls.stop();
    });
  }

  if (btnStart) {
    btnStart.addEventListener("click", () => {
      controls.start();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      controls.reset();
    });
  }
});