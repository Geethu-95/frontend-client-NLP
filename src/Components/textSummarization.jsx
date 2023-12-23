import '../App.css';
import { useState } from "react";
import Papa from "papaparse";
import axios from 'axios';
import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SummarizationLayout() {

    const [parsedData, setParsedData] = useState([{}]);


    const [tableRows, setTableRows] = useState([]);

    const [values, setValues] = useState();

    const [data, setData] = useState(undefined);

    const [url, setUrl] = useState();

    const [csvFragmentSummarized, setCsvFragmentSummarized] = useState();

    const [textSummarized, setTextSummarized] = useState();

    const [dataAppended, setDataAppended] = useState();

    const changeHandler = (event) => {
        let rowsArray = [];
        let valuesArray = [];
        let optionsArray = [];
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                // let rowsArray = [];
                // let valuesArray = [];
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                    optionsArray.push(d.text);
                });
                parsedData.push(results.data);
                setTableRows(rowsArray[0]);
                // setValues(valuesArray);
                setValues(optionsArray)


            }

        })
        console.log(values)

    }

    const onOptionChangeHandler = (event) => {
        setData(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };

    const submitHandler = () => {


        axios.get(`http://127.0.0.1:5000/summary_generate_csv/${values}`).then((result) => {

            console.log(result)
            setCsvFragmentSummarized(result.data[0].summary_text)
        }).catch((err) => {
            console.log(err)
        })

    }
    const onInputChangeHandler = (event) => {
        setUrl(event.target.value);
        console.log(
            "Entered URL - ",
            event.target.value
        );
    };

    const submitUrlHandler = () => {

        axios.get(`http://127.0.0.1:5000/summary_generate/${url}`).then((result) => {

            console.log(result)
            setTextSummarized(result.data[0].summary_text)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div align="center">
            <Typography variant="h4" className="headingText">DATA SUMMARIZER</Typography>
            <Grid container>

                <Grid item xs={6}>
                    <label><b>Select csv file containing text fragments</b></label>
                    <input
                        type="file"
                        name="file"
                        onChange={changeHandler}
                        accept=".csv"
                        style={{ display: "block", margin: "10px auto" }}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={submitHandler}>SUMMARIZE</Button>

                </Grid>

                <Grid item xs={6}>
                    <TextField
                        className="textBox"
                        id="outlined-multiline-static"
                        label="Text to summarize"
                        multiline
                        rows={8}
                        // defaultValue="Text to summarize"
                        onChange={onInputChangeHandler}
                        value={url}
                    />
                    <br></br> <br></br>
                    <Button variant="contained" onClick={submitUrlHandler}>SUMMARIZE</Button>

                </Grid>
                <br></br>  <br></br>  <br></br>
                <Grid item xs={12}>
                    <Typography variant="h4">SUMMARIZED TEXT</Typography>
                    <br></br>
                    <Typography variant="h7">
                        <Box className="BoxStyle">
                            {textSummarized ? textSummarized : csvFragmentSummarized}
                        </Box>

                    </Typography>

                </Grid>

            </Grid>
            <br></br><br></br><br></br>
        </div>
    );
}