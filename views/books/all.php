<?/* foreach ($items as $item): ?>

	<a href="/books/one?id=<?=$item->id; ?>"><h2><?=$item->name; ?></h2></a>
	<div><?=$item->genre; ?></div><br />
	<div><?=$item->author; ?></div><br />
	<div><?=$item->year; ?></div>
<? endforeach; */?>
<?

print_r(json_encode($items,JSON_UNESCAPED_UNICODE));

