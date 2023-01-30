## Server-side

In the `server` folder, create conda environment with necessary packages:

#### `conda create -f environment.yml`

Activate the environment by running:

#### `conda activate genwidget`

Then, set the OpenAI API key for the server by running (replace `YOUR API KEY` with your actual key):

#### `export OPENAI_API_KEY="YOUR API KEY"`

Finally, run the server:

#### `python start.py`

## Server API Documentation

### POST: `/api/generate`

Request should be of the following format: (for more information on the parameters check the OpenAI documentation)
```
{ 
    prompt: GENERATION PROMPT HERE,
    engine: OPTIONAL (DEFAULT: text-davinci-003),
    maxTokens: OPTIONAL (DEFAULT: 256),
    temperature: OPTIONAL (DEFAULT: 0.7),
    topP: OPTIONAL (DEFAULT: 1),
    frequencyPen: OPTIONAL (DEFAULT: 0.0),
    presencePen: OPTIONAL (DEFAULT: 0.0),
    bestOf: OPTIONAL (DEFAULT: 1),
    n: OPTIONAL (DEFAULT:1),
}
```

Response follows the format: `{success: true/false, generations: [ARRAY OF GENERATIONS]`}
