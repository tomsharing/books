<?php

class BooksController
{
	public function actionAll()
	{
		try
		{
			$items = BooksModel::findAll();
			$view = new View();
			$view->items = $items;
			$view->display('books/all.php');
		} catch (Exception $e)
		{
			print_r('Error text: ' . $e->getMessage());
		}
	}

	public function actionSave()
	{
		$book = new BooksModel();

		//empty hidden field in add
		if ($_POST['id'] == '')
			unset($_POST['id']);

		foreach ($_POST as $key => $value)
		{
			$book->$key = $value;
		}
		try
		{
			$book->save();
			$response = [];
			if (isset($book->id))
			{
				$response['success'] = true;
				$response['data'] = $book;
			}
			$view = new View();
			$view->items = $response;
			$view->display('books/all.php');
		} catch (Exception $e)
		{
			print_r('Error text: ' . $e->getMessage());
		}

	}

	public function actionOne()
	{

		$id = (int)$_GET["id"];
		if (is_int($id))
		{
			try
			{
				$book = BooksModel::findOneByPk($id);
				$view = new View();
				$view->items = $book;
				$view->display('books/all.php');
			} catch (Exception $e)
			{
				print_r('Error text: ' . $e->getMessage());
			}

		} else
		{
			echo "Не коректный ID";
		}

	}

	public function actionDel()
	{
		$id = (int)$_GET["id"];
		if (is_int($id))
		{
			try
			{
				$book = BooksModel::findOneByPk($id);
				$book->delete();
			} catch (Exception $e)
			{
				print_r('Error text: ' . $e->getMessage());
			}

		} else
		{
			echo "Не коректный ID";
		}
	}
}
