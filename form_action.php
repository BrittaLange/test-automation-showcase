<?php
    try {
        // Connect to database.
        $db = require_once  '../../config/connect.php';
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Insert SQL statement.
        $sql = "INSERT INTO customers (name, location) VALUES (:name, :location)";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ":name" => $_POST['name'],
            ":location" => $_POST['location']
        ]);
        echo $stmt->rowCount() . " row/s of data affected.";
    } catch (PDOException $e) {
        echo "Saving data did not work: " . $e->getMessage();
    }
?>