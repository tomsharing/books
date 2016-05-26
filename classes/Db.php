<?php

class Db
{

	protected $dbh;
	protected $className = 'stdClass';

	public function __construct()
	{
		$config = include __DIR__ . '/../config/db.php';
		$dsn = 'mysql:dbname=' . $config['dbname'] . ';host=' . $config['host'];
		$this->dbh = new PDO($dsn, $config['user'], $config['password']);
	}

	public function setClassName($className)
	{
		$this->className = $className;
	}

	public function query($sql, $params = [])
	{
		$sth = $this->dbh->prepare($sql);
		$sth->execute($params);
		return $sth->fetchAll(PDO::FETCH_CLASS, $this->className);
	}

	public function execute($sql, $params = [])
	{
		$sth = $this->dbh->prepare($sql);
		return $sth->execute($params);
	}

	public function lastInsertId()
	{
		return $this->dbh->lastInsertId();
	}

}