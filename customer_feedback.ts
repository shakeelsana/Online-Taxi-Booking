const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create an array to hold the feedback data
const feedbackData: { name: any; rating: any; comment: any; }[] = [];

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle feedback submissions
app.post('/feedback', (req: { body: { name: any; rating: any; comment: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; }; send: (arg0: string) => void; }) => {
  const { name, rating, comment } = req.body;

  // Validate the inputs
  if (!name || !rating || !comment) {
    return res.status(400).send('Invalid input');
  }

  // Add the feedback to the array
  feedbackData.push({ name, rating, comment });

  // Send a response to the client
  res.send('Feedback received');
});

// Define a route to retrieve all feedback data
app.get('/feedback', (req: any, res: { send: (arg0: { name: any; rating: any; comment: any; }[]) => void; }) => {
  res.send(feedbackData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
