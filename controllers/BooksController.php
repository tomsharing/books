<?php

class BooksController
{
	public function actionAll()
	{
		try{

			$items = BooksModel::findAll();
			$view = new View();
			$view->items = $items;
			$view->display('books/all.php');
		}catch (Exception $e){
			print_r('Error text: '.$e->getMessage());
		}
	}

	public function actionOne()
	{

		$id = $_GET['id'];
		if(is_int($id)){
			$item = BooksModel::findOneByPk($id);
		}else{
			throw new Exception('id is not valid');
		}

		$view = new View();
		$view->item = $item;
		$view->display('books/one.php');
	}

	public function actionAdd()
	{
		$book = new BooksModel();



		$_POST['success'] = true;
		echo json_encode($_POST);
	}

}
