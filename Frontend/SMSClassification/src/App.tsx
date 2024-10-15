import { useState } from "react";
import MessageForm from "./components/MessageForm"
import { Row, Col, Card } from 'react-bootstrap';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  // Function to handle form submission and API call
  const handleSubmit = async (message: string) => {
    try {
      // Making a POST request to our Django backend API
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Error while making API call');
      }

      const data = await response.json();

      // Update the prediction result from the API response
      setPrediction(data.prediction);
      setError(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to fetch the prediction');
      setPrediction('')
    }
    finally
    {
      setLoading(false);
    }
  };

  return (
    <div className="App mt-5">
      <Row className="justify-content-center">
      <Col md={5}>
        <Card className='mb-4'>
          <Card.Header><h1>SMS Classifier</h1></Card.Header>
          <Card.Body>
            {/* MessageForm component for input */}
            <MessageForm onSubmit={handleSubmit} isLoading={isLoading} />
            {/* Error Handling */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="justify-content-center">
      <Col md={5}>
        {prediction && (
          <Card>
            <Card.Header><h3>Result</h3></Card.Header>
            <Card.Body>Prediction: {prediction}</Card.Body>
          </Card>
        )}
      </Col>
    </Row>
    </div>
  );
}

export default App;