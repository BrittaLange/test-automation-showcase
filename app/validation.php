<?php

    const MAX_NAME_LENGTH = 120;
    const MAX_LOCATION_LENGTH = 120;
    
    /**
     * Validates input fields for name and location, ensuring they are not empty, 
     * do not exceed 120 characters, and have leading and trailing whitespace trimmed.
     *
     * @param array     $input       name and location of the input fields in an array.
     * 
     * @return array    {data: array<string, string>, errors: array<string, string>}    
     *                  An array containing the validated data and any validation errors.
     *                  - `data`: An array holding the validated name and location.
     *                  - `errors`: An array of error messages, if any.
     */
    function validateForm(array $input) : array
    {
        $data = [];
        $errors = [];
        // Validating name field.
        if (isset($input['name'])) {
            $name = trim($input['name']);
        }
        if (strlen($name) > MAX_NAME_LENGTH) {
            $errors['name'] = 'The name should not be longer than 120 characters.';
        }
        if (strlen($name) == 0) {
            $errors['name'] = 'Name is required.';
        }
        $data['name'] = $name;

        // Validating location field.
        if (isset($input['location'])) {
            $location = trim($input['location']);
        }
        if (strlen($location) > MAX_LOCATION_LENGTH) {
            $errors['location'] = 'The location should not be longer than 120 characters.';
        }
        if (strlen($location) == 0) {
            $errors['location'] = 'Location is required.';
        }
        $data['location'] = $location;

        // Return an array with a data array and an errors array.
        return [
            "data" => $data,
            "errors" => $errors
        ];
    }
?>