import { Option, Select, Button } from "@mui/joy";
import { FaGithub } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { BsMoon } from "react-icons/bs";

const Navbar = ({ mode, setMode }) => {
  const handleChange = (event, newValue) => {
    setMode(newValue);
  };
 

  return (
    <div className=" h-12 justify-center gap-2 flex items-center">
      <Button variant="outlined" color="neutral" endDecorator={<FaGithub />}>
        Github
      </Button>
      <Select
        startDecorator={mode === "light" ? <CiLight /> : <BsMoon/>}
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
