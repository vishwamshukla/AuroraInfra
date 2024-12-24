from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import os

app = FastAPI()

# Add CORS middleware for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for deployment
class DeploymentRequest(BaseModel):
    provider: str
    ami: str
    instanceType: str
    region: str
    awsAccessKey: str = None
    awsSecretKey: str = None

@app.post("/deploy")
def deploy_instance(request: DeploymentRequest):
    if request.provider.lower() == "aws":
        terraform_dir = "./terraform/aws"

        # Set AWS credentials as environment variables
        env = os.environ.copy()
        env["AWS_ACCESS_KEY_ID"] = request.awsAccessKey
        env["AWS_SECRET_ACCESS_KEY"] = request.awsSecretKey

        # Construct Terraform variables
        vars = [
            f"-var=ami={request.ami}",
            f"-var=instance_type={request.instanceType}",
            f"-var=region={request.region}"
        ]

        try:
            # Initialize Terraform
            subprocess.run(["terraform", "init"], cwd=terraform_dir, env=env, check=True)
            # Apply Terraform configuration
            subprocess.run(["terraform", "apply", "-auto-approve", *vars], cwd=terraform_dir, env=env, check=True)

            return {"status": "AWS deployment initiated successfully"}
        except subprocess.CalledProcessError as e:
            raise HTTPException(status_code=500, detail=f"Terraform error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Unsupported provider")