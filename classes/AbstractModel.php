<?php

abstract class AbstractModel
	implements JsonSerializable
{
	static protected $table;

	protected $data = [];

	public static function findAll()
	{
		$class = get_called_class();
		$sql = 'SELECT * FROM ' . static::$table;
		$db = new DB();
		$db->setClassName($class);
		return $db->query($sql);
	}

	public static function findOneByPk($id)
	{
		$class = get_called_class();
		$sql = 'SELECT * FROM ' . static::$table . ' WHERE id=:id';
		$db = new DB();
		$db->setClassName($class);
		return $db->query($sql, [':id' => $id])[0];
	}

	public function __get($k)
	{
		return $this->data[$k];
	}

	public function __set($k, $v)
	{
		$this->data[$k] = $v;
	}

	public function __isset($k)
	{
		return isset($this->data[$k]);
	}

	public function save()
	{
		if (!isset($this->id))
		{
			$this->insert();
		} else
		{
			$this->update();
		}
	}

	protected function insert()
	{
		$cols = array_keys($this->data);
		$data = [];
		foreach ($cols as $col)
		{
			$data[':' . $col] = $this->data[$col];
		}

		$sql = '
          INSERT INTO ' . static::$table . '
          (' . implode(', ', $cols) . ')
          VALUES
          (' . implode(', ', array_keys($data)) . ')
        ';
		$db = new DB();
		$db->query($sql, $data);
		$this->id = $db->lastInsertId();
	}

	protected function update()
	{
		$cols = [];
		$data = [];
		foreach ($this->data as $k => $v)
		{
			$data[':' . $k] = $v;
			if ('id' == $k)
			{
				continue;
			}
			$cols[] = $k . '=:' . $k;
		}
		$sql = '
            UPDATE ' . static::$table . '
            SET ' . implode(', ', $cols) . '
            WHERE id=:id
        ';
		$db = new DB();
		$db->query($sql, $data);
	}

	public function delete()
	{
		$id = $this->data['id'];
		$sql = 'DELETE FROM ' . static::$table . ' WHERE id=:id';
		$db = new DB();
		$db->query($sql, [':id' => $id]);
	}

	public function jsonSerialize()
	{
		return $this->data;
	}

}