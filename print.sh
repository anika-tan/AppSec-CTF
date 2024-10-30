#!/bin/bash
# End new line with \n not \n\r yes yes yes
# Check if the file exists and is readable
if [[ -f "$1" && -r "$1" ]]; then
    # Read the CSV file and preserve newlines in a string variable
    csv_content=$(cat "$1")

    # Print the string with explicit \n for each line
    csv_content_with_newlines=$(echo "$csv_content")

    # Output the processed string
    echo "$csv_content_with_newlines"
else
    echo "File does not exist or is not readable."
fi