import { Typography } from "@mui/joy";
import { useEffect, useRef } from "react";

const Map = ({ myMap, setMap, penType, enemy, zoom }) => {
  const map = useRef(null);

  const handleClick = (i, j) => {
    console.log(penType);
    const newMap = Array.from(myMap);
    if (newMap[i][j] == penType) return;
    newMap[i][j] = penType;
    setMap(newMap);
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
    if (e.ctrlKey) {
      e.preventDefault();
      let oldScale = 1;
      const transform = map.current.style.transform;
      const scaleMatch = transform.match(/scale\(([^)]+)\)/);
      if (scaleMatch) {
        oldScale = parseFloat(scaleMatch[1]);
      }
      const newScale = e.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
      map.current.style.transform = `scale(${newScale})`;
    }
  };

  useEffect(() => {
    let oldScale = 1;
    const transform = map.current.style.transform;
    const scaleMatch = transform.match(/scale\(([^)]+)\)/);
    if (scaleMatch) {
      oldScale = parseFloat(scaleMatch[1]);
    }
    const newScale = zoom > 0 ? oldScale * 0.9 : oldScale * 1.1;
    map.current.style.transform = `scale(${newScale})`;
  }, [zoom])


  return (
    <div className="grow-0 flex flex-col">
   
      <div
        onWheel={handleWheel}
        ref={map}
        className="flex flex-col gap-0 map-div "
      >
        {myMap.map((row, i) => (
          <div key={i} className="flex gap-0">
            {row.map((cell, j) => (
              <div
                key={j}
                onClick={() => handleClick(i, j)}
                className={`map-item h-10 w-10 ${
                  mapIndex[cell == enemy ? "T" : cell]
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
