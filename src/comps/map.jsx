import { Typography } from "@mui/joy";
import { useEffect, useRef } from "react";

const Map = ({ myMap, setMap, penType, enemy, zoom, iw, setIw }) => {
  const map = useRef(null);
  const mapItem = useRef(null);

  const handleClick = (e, i, j) => {
    const newMap = Array.from(myMap);
    if (newMap[i][j] == penType) return;
    newMap[i][j] = penType;
    setMap(newMap);
  };

  const handleHover = (e, i, j) => {
    if (e.ctrlKey) {
      const newMap = Array.from(myMap);
      if (newMap[i][j] == penType) return;
      newMap[i][j] = penType;
      setMap(newMap);
    }
  };


  const mapIndex = {
    1: "wall",
    P: "player",
    0: "free",
    C: "coin",
    E: "exit",
    T: "enemy",
  };

  const handleWheel = (e) => {
    console.log(e.ctrlkey)
    e.preventDefault();
    const newScale = e.deltaY > 0 ? iw * 0.9 : iw * 1.1;
    setIw(newScale)
  };

  useEffect(() => {
    map.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      console.log(e.deltaY)
      const newScale = e.deltaY > 0 ? iw + 4 : iw - 5;
      setIw(newScale)
    });
  }, [map])



  useEffect(() => {

  }, [zoom])


  return (
    <div className="flex flex-col">

      <div
        ref={map}
        className="flex flex-col gap-0 map-div mt-4 "
      >
        {myMap.map((row, i) => (
          <div key={i} className="flex gap-0">
            {row.map((cell, j) => (
              <div
                key={j}
                style={{
                  height: iw,
                  width: iw
                }}
                onClick={(e) => handleClick(e, i, j)}
                onMouseMove={(e) => handleHover(e, i, j)}
                className={`map-item ${mapIndex[cell == enemy ? "T" : cell]
                  }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
