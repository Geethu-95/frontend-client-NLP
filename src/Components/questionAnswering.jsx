import { useState } from "react";
import Papa from "papaparse";
import axios from 'axios';
import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../App.css';

export default function AnsweringLayout() {

    const [parsedData, setParsedData] = useState([{}]);


    const [tableRows, setTableRows] = useState([]);

    const [values, setValues] = useState();

    const [data, setData] = useState(undefined);



    const [question, setQuestion] = useState();

    const [answer, setAnswer] = useState();

    // const [context, setContext] = useState("");
    let context="";

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
                console.log(optionsArray)
                setValues(optionsArray)


            }

        })
        console.log(values)

    }

    const submitHandler = () => {

       values && values.map((value)=>{
            context = context+value;
        })
        console.log(values)
        console.log(context)
        axios.get(`http://127.0.0.1:5000/answer_the_question`,
        {params: {
            question:question,
            context:context
        }}
        ).then((result) => {

            console.log(result)
            setAnswer(result.data.answer)
        }).catch((err) => {
            console.log(err)
        })

    }

    const textChangeHandler = (event) => {

        setQuestion(event.target.value);

    }


    return (

        <div align="center">
            <Typography variant="h4" className="headingText">QUESTION ANSWERING</Typography>
            <Grid container alignContent="center">

                <Grid item xs={12}>
                    <label><b>Select csv file containing text segments</b></label>
                    <input
                        type="file"
                        name="file"
                        onChange={changeHandler}
                        accept=".csv"
                        style={{ display: "block", margin: "10px auto" }}
                    />
                    <br />
                    <br />
                    <input type="text" value={question} onChange={textChangeHandler}></input>
                    <br></br> <br></br>
                    <Button variant="contained" onClick={submitHandler}>FIND ANSWER</Button>

                    <br>
                    </br>
                    <br></br>

                    <Box className="BoxStyle">
                        {answer}
                    </Box>
                    <br></br>
                </Grid>
            </Grid>
        </div>
    );
}