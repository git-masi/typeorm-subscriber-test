#!/bin/bash

# Define arrays of first and last names
firstNames=("John" "Jane" "Alex" "Emily" "Chris" "Katie" "Michael" "Sarah" "David" "Laura" "James" "Emma" "Daniel" "Olivia" "Matthew" "Sophia" "Andrew" "Megan" "Robert" "Hannah")
lastNames=("Smith" "Johnson" "Brown" "Williams" "Jones" "Garcia" "Miller" "Davis" "Martinez" "Lopez" "Anderson" "Taylor" "Thomas" "Moore" "Jackson" "White" "Harris" "Martin" "Thompson" "Young")

# If no ports are provided, default to port 8080
ports=("$@")
if [ ${#ports[@]} -eq 0 ]; then
  ports=(8080) # Default to 8080 if no arguments are passed
fi

# Generate random name
generate_random_name() {
  firstName=${firstNames[$RANDOM % ${#firstNames[@]}]}
  lastName=${lastNames[$RANDOM % ${#lastNames[@]}]}
}

# Create the JSON body dynamically
generate_json_body() {
  json=$(
    cat <<EOF
{
  "firstName": "$firstName",
  "lastName": "$lastName"
}
EOF
  )
}

# Loop through each port and make a request
for port in "${ports[@]}"; do
  generate_random_name
  generate_json_body

  echo "Sending request to http://localhost:$port/users with data:"
  echo "$json"

  # Make the curl POST request with the generated JSON body
  curl -X POST http://localhost:$port/users \
    -H "Content-Type: application/json" \
    -d "$json"

  echo "Request completed for port $port"
done
