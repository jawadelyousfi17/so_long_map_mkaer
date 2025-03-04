import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { useEffect, useState } from "react";

import { LuUndo2 } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import { Snackbar } from "@mui/joy";

const Controls = ({
  rows,
  cols,
  setRows,
  setCols,
  setPen,
  penType,
  mapHistory,
  setHistory,
  setMap,
  myMap,
  enemy,
  setEnemy,
}) => {
  const [tocopy, settocopy] = useState("");
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tocopy);
    setOpen(1);
    setTimeout(() => {setOpen(0)}, 1000)
  };
  const handleSetEnemy = (e) => {
    setEnemy(e.target.value);
  };
  useEffect(() => {
    let r = "";
    for (let i = 0; i < myMap.length; i++) {
      for (let j = 0; j < myMap[i].length; j++) {
        r += "" + myMap[i][j];
      }
      r += "\n";
    }
    settocopy(r);
  }, [myMap]);
  
  const handleKeyDown = (event) => {
    if (event.key === 'z') {
      handleUndo();
    }
  };
  const handleUndo = () => {
    if (mapHistory.length == 1) return;
    const lastMapH = [...mapHistory];
    lastMapH.pop();
    setHistory(lastMapH);
    setMap(lastMapH.pop());
  };
  

  const handleClear = () => {
    const map = [...myMap]
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (i == 0 || j == 0 || j == map[i].length - 1 || i == map.length - 1) map[i][j]=1;
        else map[i][j] = 0;
      }
    }
    setMap(map);
  };
  

  return (
    <div className="p-4 flex flex-col gap-3">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => {}}
        key={"top" + "center"}
      >
        Copied to clipboard
      </Snackbar>

      <FormControl>
        <FormLabel>Rows</FormLabel>
        <Input
          onChange={(e) => setRows(e.target.value)}
          value={rows}
          placeholder="Row"
          type="number"
        ></Input>
      </FormControl>

      <FormControl>
        <FormLabel>Cols</FormLabel>
        <Input
          onChange={(e) => setCols(e.target.value)}
          value={cols}
          placeholder="Cols"
          type="number"
        ></Input>
      </FormControl>

      <FormControl>
        <FormLabel>Enemy</FormLabel>
        <Input
          onChange={(e) => handleSetEnemy(e)}
          value={enemy}
          placeholder="Enemy"
          type="text"
        ></Input>
      </FormControl>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2">
          <Button
            variant={`${penType == 1 ? "soft" : "outlined"}`}
            onClick={() => setPen("1")}
          >
            Wall
          </Button>
          <Button
            variant={`${penType == 0 ? "soft" : "outlined"}`}
            onClick={() => setPen("0")}
          >
            Free
          </Button>
          <Button
            variant={`${penType == "P" ? "soft" : "outlined"}`}
            onClick={() => setPen("P")}
          >
            Player
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={`${penType == "C" ? "soft" : "outlined"}`}
            onClick={() => setPen("C")}
          >
            Coins
          </Button>
          <Button
            variant={`${penType == "E" ? "soft" : "outlined"}`}
            onClick={() => setPen("E")}
          >
            Exit
          </Button>
          <Button
            variant={`${penType == enemy ? "soft" : "outlined"}`}
            onClick={() => setPen(enemy)}
          >
            Enemy
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mt-8 mb-2">
      <Button color="warning" onClick={handleClear} endDecorator={<MdContentCopy />}>
          Clear all
        </Button>
        <Button onClick={handleUndo} endDecorator={<LuUndo2 />}>
          undo
        </Button>
        <Button onClick={handleCopy} endDecorator={<MdContentCopy />}>
          Copy
        </Button>
      </div>

      <textarea
        onChange={() => {}}
        value={tocopy}
        className="arrr w-full"
        rows={20}
      ></textarea>
    </div>
  );
};

export default Controls;
