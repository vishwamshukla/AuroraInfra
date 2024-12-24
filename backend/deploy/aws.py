import subprocess

def deploy_aws(ami, instance_type, region, access_key, secret_key):
    terraform_dir = "./terraform/aws"
    vars = f"-var='ami={ami}' -var='instance_type={instance_type}' -var='region={region}'"
    env = {
        "AWS_ACCESS_KEY_ID": access_key,
        "AWS_SECRET_ACCESS_KEY": secret_key,
    }

    try:
        subprocess.run(["terraform", "init"], cwd=terraform_dir, env=env, check=True)
        subprocess.run(["terraform", "apply", "-auto-approve", vars], cwd=terraform_dir, env=env, check=True)
        return {"status": "AWS deployment successful"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": str(e)}