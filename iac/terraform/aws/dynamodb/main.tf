resource "aws_dynamodb_table" "f1-championship-managment-table" {
  name         = "f1-va-championship"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "identifier"
  range_key    = "createdAt"

  attribute {
    name = "identifier"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  tags = {
    "Name" = "DynamoDB Terraform F1 Virtual Automobilism Championship Table"
  }
}