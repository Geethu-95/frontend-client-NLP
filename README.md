# client

#### STEPS FOR PROCESSING DATA
The client app uses papaparse to extract the data from csv file and store it in a variable. It is assumed that the csv file has a column named text with the text information.

#### FUNCTIONALITY

1. Provide options to choose between NLP tasks to perform (summarization / question answering).
2. If summarization taks is selected. There are two options. Option 1, select csv file and send it for parsing followed by selection of text to be summarized. Option 2, paste text you want to summarize in the text box.
3. If question answering is chosen, provide the app with a question and context is assumed to be from the csv file containing text segments. Answer is searched in the context and output is generated.

#### API ENDPOINTS

1. http://127.0.0.1:5000/summary_generate_csv/${values} - values is csv file which is parsed.
2. http://127.0.0.1:5000/summary_generate/${url} - url is text provided in the text box of the UI.
Both parameters are inputs for summarization.
3. http://127.0.0.1:5000/answer_the_question`,
        {params: {
            question:question,
            context:context
        }} - question which is entered by the user , and context which is assumed to be the csv file provided in the assignment.
        
#### KEY CHALLENGES

1. Perfecting the UI look and feel.

#### IMPROVEMENTS

1. Design the UI more beautifully.
 
