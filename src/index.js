import { initBasicChart } from "./basic-chart.js";
import { initZoomToFitChart } from "./zoom-to-fit.js";
import { initVisibleRange } from "./visiable-range.js";
import { initPanZoom } from "./pan-zoom.js";

// Basic Chart (scichart-root)
let basicChartControls = null;

initBasicChart().then((controls) => {
  basicChartControls = controls;

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
let zoomToFitControls = null;

initZoomToFitChart().then((controls) => {
  zoomToFitControls = controls;

  // Wire up buttons (they are defined in index.html)
  const btnStop = document.getElementById("btn-zoom-fit-stop");
  const btnStart = document.getElementById("btn-zoom-fit-start");
  const btnReset = document.getElementById("btn-zoom-fit-reset");

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

// Capture controls from the pan-zoom chart so we can stop/start/reset it
let panZoomControls = null;

initPanZoom().then((controls) => {
  panZoomControls = controls;

  // Wire up buttons (they are defined in index.html)
  const btnStop = document.getElementById("btn-pan-zoom-stop");
  const btnStart = document.getElementById("btn-pan-zoom-start");
  const btnReset = document.getElementById("btn-pan-zoom-reset");

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