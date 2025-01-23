import { useColorScheme } from "@mui/joy/styles";

// Base components
import Map from "./comps/map";
import Controls from "./comps/controls";
import Navbar from "./comps/navbar";

// MUI
import { Button, Chip, CssBaseline, Divider } from "@mui/joy";

import { PiMouseSimpleLight } from "react-icons/pi";
import { GrZoomIn } from "react-icons/gr";
import { GrZoomOut } from "react-icons/gr";

import "./output.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const { mode, setMode } = useColorScheme();
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [myMap, setMap] = useState([]);
  const [mapHistory, setHistory] = useState([]);
  const [penType, setPen] = useState("1");
  const [enemy, setEnemy] = useState("T");
  const [zoom, setZoom] = useState(1);

  const handleZoom = (i) => {
    setZoom((Math.abs(zoom) + 1) * i * -1);
  };

  useEffect(() => {
    if (cols < 0) setCols(3);
    if (rows < 0) setRows(3);
    const arr = [];
    for (let i = 0; i < rows; i++) {
      const arr1 = [];
      for (let j = 0; j < cols; j++) {
        if (i == 0 || j == 0 || j == cols - 1 || i == rows - 1) arr1.push(1);
        else arr1.push(0);
      }
      arr.push(arr1);
    }
    setMap(arr);
  }, [rows, cols]);

  useEffect(() => {
    if (myMap.length == 0) return;
    const oldMapH = [...mapHistory];
    const lastMap = myMap.map((row) => [...row]);
    oldMapH.push(lastMap);
    setHistory(oldMapH);
    console.log(enemy);
  }, [myMap]);

  useEffect(() => {
    setMode("dark");
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar mode={mode} setMode={setMode}></Navbar>
      <Divider orientation="horizental"></Divider>

      <div className="flex lg:w-2/3 mx-auto">
        <div className="flex flex-col flex-1 ctrl">
          <Controls
            cols={cols}
            rows={rows}
            setCols={setCols}
            setRows={setRows}
            setPen={setPen}
            penType={penType}
            mapHistory={mapHistory}
            setHistory={setHistory}
            setMap={setMap}
            myMap={myMap}
            enemy={enemy}
            setEnemy={setEnemy}
          />
        </div>
        <Divider orientation="vertical"></Divider>

        <div className="map-p flex flex-col flex-4 min-h-svh items-center justify-between py-8">
          <div className="flex flex-col gap-4">
            <Chip
              size="lg"
              variant="outlined"
              startDecorator={<PiMouseSimpleLight />}
            >
              Mouse wheel up/down + CTRL to zoom
            </Chip>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="soft"
                onClick={() => handleZoom(1)}
                endDecorator={<GrZoomIn />}
              >
                {" "}
                zoom in
              </Button>
              <Button
                size="sm"
                variant="soft"
                onClick={() => handleZoom(-1)}
                endDecorator={<GrZoomOut />}
              >
                {" "}
                zoom out
              </Button>
            </div>
          </div>
          <Map
            myMap={myMap}
            zoom={zoom}
            enemy={enemy}
            setMap={setMap}
            penType={penType}
          />
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
