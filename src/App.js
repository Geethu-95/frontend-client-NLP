import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import axios from 'axios';
import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SummarizationLayout from "./Components/textSummarization";
import AnsweringLayout from "./Components/questionAnswering";

function App() {

  const[selected, setSelected] = useState();

  const handleChange = ev => {
    setSelected(ev.target.value);
  };
  return (
    <div>
      <br></br><br></br>
      <Typography variant="h3">Which task do you want to perform?</Typography>
      <br></br> <br></br>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">NLP Tasks</FormLabel>
        <RadioGroup
        onChange={handleChange} value={selected}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="summarize"
          name="radio-buttons-group"
        >
          <FormControlLabel value="summarise" control={<Radio />} label="Text summarization" />
          <FormControlLabel value="answering" control={<Radio />} label="Question answering" />

        </RadioGroup>
      </FormControl>

      <div>
        {
          selected === "summarise"? <SummarizationLayout/>:<AnsweringLayout/>
        }
      </div>
    </div>
  )
}

export default App;