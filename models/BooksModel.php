<?php

/**
 * Class BooksModel
 * @property $id
 * @property $name
 * @property $author
 * @property $year
 * @property $genre
 */
class BooksModel
	extends AbstractModel
{
	protected static $table = 'books';
}