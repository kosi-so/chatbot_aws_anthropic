import time
import boto3
import json
import os
from dotenv import load_dotenv
from botocore.exceptions import ClientError

load_dotenv()

bedrock_client = boto3.client(
    'bedrock-runtime',
    region_name=os.getenv("AWS_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")       

)

def query_bedrock_claude(message_history:list):
    body ={
        "messages": message_history,
        "max_tokens": 300,
        "temperature":0.7,
        "anthropic_version": "bedrock-2023-05-31"
    }
    for attempt in range(5):
        try:
            response = bedrock_client.invoke_model(
        modelId="anthropic.claude-3-sonnet-20240229-v1:0",
        body=json.dumps(body),
        contentType='application/json',
        accept='application/json'
    )

            result = json.loads(response['body'].read())
            return result['content'][0]['text']
        except ClientError as e:
            if e.response['Error']['Code'] == 'ThrottlingException':
                time.sleep(1.5 * (attempt + 1))  # Exponential backoff
            else:
                raise e
    