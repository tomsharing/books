<?php

require __DIR__ . '/autoload.php';

$ctrl = isset($_GET['ctrl']) ? $_GET['ctrl'] : 'Books';
$act = isset($_GET['act']) ? $_GET['act'] : 'All';

$controllerClassName = $ctrl . 'Controller';

if (class_exists($controllerClassName))
{
	$controller = new $controllerClassName;
	$method = 'action' . $act;
	if (method_exists($controller, $method))
	{
		$controller->$method();
	} else
	{
		echo 'Не найдена функция ' . $method;
	}

} else
{
	echo 'Не найден модуль' . $_GET['ctrl'];
}


