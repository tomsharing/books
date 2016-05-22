<?php

class BooksController
{
	public function actionAll(){
		try{
			$db = new Db();
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
		$item = BooksModel::findOneByPk($id);
		$view = new View();
		$view->item = $item;
		$view->display('books/one.php');
	}

}
