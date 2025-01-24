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
import { HiAcademicCap } from "react-icons/hi2";
import { LuCommand } from "react-icons/lu";

import "./output.css";
import { useEffect, useState, useRef } from "react";
import { CgLayoutGrid } from "react-icons/cg";

function App() {
  const { mode, setMode } = useColorScheme();
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [myMap, setMap] = useState([]);
  const [mapHistory, setHistory] = useState([]);
  const [penType, setPen] = useState("1");
  const [enemy, setEnemy] = useState("T");
  const [zoom, setZoom] = useState(1);
  const [iw, setIw] = useState(30)

  const handleZoom = (i) => {
    setIw(iw => iw + i * 4)
  };

  const handleUndo = () => {
    if (mapHistory.length == 1) return;
    const lastMapH = [...mapHistory];
    lastMapH.pop();
    setHistory(lastMapH);
    setMap(lastMapH.pop());
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
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode('dark');
    }
  }, []);

  function handleKeyDown(e) {
    if (e.ctrlKey && e.key=='z')
        handleUndo()
  }

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      <CssBaseline />
      <Navbar mode={mode} setMode={setMode}></Navbar>
      <Divider orientation="horizental"></Divider>

      <div className="flex lg:w-full md:w-full mx-auto">
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

        <div className={`${mode=='light' ? 'map-d' : 'map-l'} flex flex-col flex-4 min-h-svh py-8 px-4`}>
          <div className="flex gap-2">
            <Chip
              size="lg"
              variant="outlined"
              startDecorator={<PiMouseSimpleLight />}
            >
              Mouse wheel up/down + CTRL to zoom
            </Chip>
            <Chip
              size="lg"
              variant="outlined"
              startDecorator={<LuCommand />}
            >
              Move + CTRL to draw
            </Chip>
            <Chip
              size="lg"
              variant="outlined"
              startDecorator={<LuCommand />}
            >
              CTRL + Z to undo
            </Chip>
         
          </div>
          <div className="flex gap-2 mt-4">
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
          <Map
            myMap={myMap}
            zoom={zoom}
            enemy={enemy}
            setMap={setMap}
            penType={penType}
            iw={iw}
            setIw={setIw}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
