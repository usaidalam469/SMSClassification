import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

interface MessageFormProps {
    onSubmit: (message: string) => void;
    isLoading:  boolean;
  }

const MessageForm: React.FC<MessageFormProps>= ({ onSubmit,isLoading }) => {
    const [message, setMessage] = useState<string>('');
  
    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Pass the message to the parent component
      onSubmit(message); 
      // Clear the form after submission
      setMessage('');  
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Form.Label htmlFor="message">Enter Message</Form.Label>
            <Form.Control
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                required
            />
            <Button
                type='submit'
                className='mt-2 float-end'
                variant="primary"
                disabled={isLoading}
                aria-busy={isLoading}
            >
                {isLoading ? <Spinner animation="border" size="sm" /> : "Classify"}
            </Button>
      </form>
    );
  }
export default MessageForm