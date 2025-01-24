import { Option, Select, Button, Avatar } from "@mui/joy";
import { FaGithub } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { BsMoon } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";

import avatar from "../assets/avatar.jpg"

const Navbar = ({ mode, setMode }) => {
  const handleChange = (event, newValue) => {
    setMode(newValue);
  };


  return (
    <div className=" h-12 justify-between px-14 gap-2 flex items-center">
      <div className="flex gap-2">
        <Button component="a" variant="plain" href="#as-link" endDecorator={<MdOutlineOpenInNew />} startDecorator={<FaGithub />}>
          Github
        </Button>
        <Button component="a" variant="plain" href="#as-link" endDecorator={<MdOutlineOpenInNew />}>
          42
        </Button>
        <Button component="a" variant="plain" href="#as-link" endDecorator={<MdOutlineOpenInNew />}>
          Report bugs
        </Button>
      </div>
      <Select
        startDecorator={mode === "light" ? <CiLight /> : <BsMoon />}
        onChange={handleChange}
        defaultValue={mode}
      >
        <Option value="dark">Dark</Option>
        <Option value="light">Light </Option>
      </Select>
    </div>
  );
};

export default Navbar;
