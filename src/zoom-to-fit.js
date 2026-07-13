import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { XyScatterRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";

export async function initZoomToFitChart() {
  const { sciChartSurface, wasmContext } =
    await SciChartSurface.create("scichart-zoom-to-fit");

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

  let timeoutId = null;

  const updateDataFunc = () => {
    // Append another data-point to the chart. We use dataSeries.count()
    // to determine the current length before appending
    const i = lineData.count();
    lineData.append(i, Math.sin(i * 0.1));
    scatterData.append(i, Math.cos(i * 0.1));

    // ZoomExtents after appending data.
    // Also see XAxis.AutoRange, and XAxis.VisibleRange for more options
    sciChartSurface.zoomExtents();

    // Repeat at ~60Hz
    timeoutId = setTimeout(updateDataFunc, 1000 / 60);
  };

  // Start the animation loop
  updateDataFunc();

  function stop() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function start() {
    if (timeoutId === null) {
      updateDataFunc();
    }
  }

  function reset() {
    stop();

    // Clear all data
    scatterData.clear();
    lineData.clear();

    // Re-populate with the initial 1000 points
    for (let i = 0; i < 1000; i++) {
      lineData.append(i, Math.sin(i * 0.1));
      scatterData.append(i, Math.cos(i * 0.1));
    }

    sciChartSurface.zoomExtents();
  }

  // Return controls so the caller can stop/reset to avoid memory issues
  return {
    stop,
    start,
    reset,
    sciChartSurface,
  };
}
