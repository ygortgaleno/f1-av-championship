terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.2.0"
    }
  }

  # backend "s3" {
  #   bucket         = "f1-va-championships-terraform-state-store"
  #   key            = "dynamodb/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "terraform_state_lock"

  #   endpoint                    = "http://localhost:4566"
  #   dynamodb_endpoint           = "http://localhost:4566"

  #   skip_credentials_validation = true
  #   skip_metadata_api_check     = true
  #   force_path_style            = true
  #   encrypt                     = true
  # }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "my-access-key"
  secret_key = "my-secret-key"

  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3       = "http://localhost:4566"
    dynamodb = "http://localhost:4566"
  }
}