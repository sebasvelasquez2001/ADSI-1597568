<?php

require '../src/Calculatorclass.php';

use calculator\Calculatorclass;

try {

$number1 = (float) $_GET["number1"];
$number2 = (float) $_GET["number2"];
$operation = (integer) $_GET["operation"];

$calc = new Calculatorclass();

$calc->setnumber1 ($number1);
$calc->setnumber2 ($number2);

if ($operation === 1){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->sum();
}else if ($operation===2){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->rest();
}else if ($operation===3){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->mult();
}else if ($operation===4){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->div();
}else if ($operation===5){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->log();
}else if ($operation===6){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->squar();
}else if ($operation===7){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->pow();
}else if ($operation===8){
    $message = "the sum from" . $number1 . "and" . $number2 . "is" . $calc->aqur();
}else {
    $message = "error: curse";
}
} catch (exception $exc){
    
    if ($exc->getCode()===501){
      $message = $exc->getMessage();  
    } else {
        echo 'i am sorry pig <br>';
        echo $exc->getmessage();
        echo '<br>';
        echo $exc->getTraceAsString();
    }
} finally {
    if ($message !==null){
        require 'result.php';
    }    
}