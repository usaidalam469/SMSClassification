from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import joblib
import pandas as pd
import os
from .utilities import preprocess_text

@api_view(['POST'])
def predict(request):
    # Load the model from the file
    model_path = os.path.join('api','static', 'model', 'random_forest_model.pkl')
    
    loaded_model = joblib.load(model_path)
    # Extract the message from the request body
    message = request.data.get('message', '')
    if not message or message.strip() == "":
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    cleaned_message = preprocess_text(message)
    # Creating a DataFrame to match the input format of the model
    input_data = pd.DataFrame([cleaned_message], columns=['message'])

    # Make predictions
    prediction = loaded_model.predict(input_data['message'])
    
    # Return the prediction result
    response_data = {
        'message': message,
        'prediction': 'Ham' if int(prediction[0]) == 0 else 'Spam',
    }
    return Response(response_data, status=status.HTTP_200_OK)