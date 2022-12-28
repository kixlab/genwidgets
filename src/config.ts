type MouseEventKey = "shiftKey" | "altKey" | "metaKey" | "ctrlKey";

const lightGrey = "#dedede";

const config = {
  borderWidthPx: 2,
  headerHeightPx: 50,
  maxTimeSteps: 100000,
  defaultTempDegC: 23,
  defaultCapJPerDegK: 10,
  defaultPowerGenW: 0,
  defaultTotalTimeSeconds: 600,
  defaultTimeStepSeconds: 0.1,
  defaultNodeName: "Unnamed",
  defaultNodeRadius: 20,
  defaultResistanceDegKPerW: 10,
  defaultSmallResistanceDegKPerW: 0.01,
  defaultSmallCapacitanceJPerDegK: 1,
  defaultEditorWidthFraction: 0.45,
  defaultCanvasHeightFraction: 1 / 1.61803398875,
  defaultTableHeightFraction: 0.5,
  minPanelFraction: 0.2,
  newNodeNamePrefix: "New Node",
  zoomSensitivity: 1500, // bigger = less zoom per click
  minZoom: 0.5,
  maxZoom: 2,
  maxZoomDelta: 2,
  minRadiusPx: 20,
  maxRadiusPx: 40,
  minLineThicknessPx: 2,
  maxLineThicknessPx: 4,
  activeNodeOutlineWidthPx: 5,
  tabHeightPx: 35,
  tableDeleteCellWidthPercent: 0.1,
  tableDeleteCellMinWidthPx: 40,
  plotHeightBufferPx: 10,
  plotMargin: {
    left: 10,
    right: 20,
    top: 20,
    bottom: 20,
  },
  plotYDomainPaddingPx: 15,
  plotTickFontSizePx: 15,
  maxPlotPoints: 400,
  multiSelectKeys: ["shiftKey", "metaKey", "ctrlKey"] as MouseEventKey[],
  errorMessageDurationSeconds: 4,
  maxNoteLengthChars: 500,
  activeColor: "rgba(112, 165, 255, 0.2)",
  pasteXOffset: 45,
  lightGrey: lightGrey,
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  tabColor: lightGrey,
  inactiveTabColor: lightGrey,
  timeControlsFontSize: "20px",
};

export default config;