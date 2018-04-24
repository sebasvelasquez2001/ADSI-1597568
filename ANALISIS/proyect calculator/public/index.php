<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="css/css.css"
    </head>
    <body>
        <h1>CALCULATOR</h1>
        <form action="calc.php" method="get">
            <input type="number" name="number1">
            <select name="operation">
                <option value="">selete a operation</option>
                <option value="1">+</option>
                <option value="2">-</option>
                <option value="3">*</option>
                <option value="4">/</option>
                <option value="5">log</option>
                <option value="">X^2</option>
                <option value="">X^Y</option>
                <option value="">√</option>
            </select>
                <input type="number" name="number2"><br>
            <button type="submit">operation</button>
        </form>
    </body>
</html>
