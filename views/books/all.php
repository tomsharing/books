<? foreach ($items as $item): ?>
	<a href="/books/one?id=<?=$item->id; ?>"><h2><?=$item->name; ?></h2></a>
	<div><?=$item->genre; ?></div><br />
	<div><?=$item->author; ?></div>
<? endforeach; ?>