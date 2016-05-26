<?php

class View
	implements Countable
{
	protected $data = [];

	public function __get($k)
	{
		return $this->data[$k];
	}

	public function __set($k, $v)
	{
		$this->data[$k] = $v;
	}

	public function display($template)
	{
		foreach ($this->data as $key => $val)
		{
			$$key = $val;
		}

		$file = __DIR__ . '/../views/' . $template;

		if (file_exists($file))
		{
			include __DIR__ . '/../views/' . $template;
		} else
		{
			throw new Exception("Не найден файл /views/" . $template);
		}

	}

	public function count()
	{
		return count($this->data);
	}
}