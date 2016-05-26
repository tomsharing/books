Ext.define('Books', {
	extend: 'Ext.data.Model',
	fields: ['author', 'name', 'year', 'genre']
});

Ext.define('BooksListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.bookslist',

	init: function (view) {
		Ext.Ajax.request({
			url: '../FrontController.php?ctrl=books&act=all',
			success: function (response, opts) {
				var obj = Ext.decode(response.responseText);
				//console.log('ajax response obj=',obj,'response.responseText=',response.responseText);
				view.getStore().add(obj);
			},
			failure: function (response, opts) {
				//console.log('server-side failure with status code ' + response.status);
			}
		});

	},

	onAddClick: function () {

		if (window.form === undefined) {
			form = createSaveBookForm();
		}
		form.getForm().reset();
	},

	onDeleteClick: function () {
		var view = this.getView(),
			selected = view.getSelectionModel().getSelection()[0],
			store = view.getStore();
		if (selected.getId()) {
			Ext.Ajax.request({
				url: '../FrontController.php?ctrl=books&act=del&id=' + selected.getId(),
				success: function (response, opts) {
					//var obj = Ext.decode(response.responseText);
					//console.log('response.responseText=',response.responseText);
					store.remove(selected);
				},
				failure: function (response, opts) {
					console.log('server-side failure with status code ' + response.status);
				}
			});
		}
	},

	onUpdateClick: function () {
		var view = this.getView(),
			selected = view.getSelectionModel().getSelection()[0],
			store = view.getStore();
		if (window.form === undefined) {
			form = createSaveBookForm();
		}
		if (selected.getId()) {
			Ext.Ajax.request({
				url: '../FrontController.php?ctrl=books&act=one&id=' + selected.getId(),
				success: function (response, opts) {
					var obj = Ext.decode(response.responseText);

					form.getForm().setValues(obj);
				},
				failure: function (response, opts) {
					console.log('server-side failure with status code ' + response.status);
				}
			});

		}

	},

	onSelectionChange: function (selModel, selections) {
		this.lookupReference('delete').setDisabled(selections.length === 0);
		this.lookupReference('update').setDisabled(selections.length === 0);
	}

});

Ext.define('BooksList', {
	extend: 'Ext.grid.Panel',
	controller: 'bookslist',

	tbar: [{
		text: 'Добавить',
		listeners: {
			click: 'onAddClick'
		}
	}, {
		text: 'Удалить',
		reference: 'delete',
		disabled: true,
		listeners: {
			click: 'onDeleteClick'
		}
	}, {
		text: 'Изменить',
		reference: 'update',
		disabled: true,
		listeners: {
			click: 'onUpdateClick'
		}
	}],
	store: {
		model: 'Books'
	},
	selModel: {
		type: 'rowmodel',
		listeners: {
			selectionchange: 'onSelectionChange'
		}
	},
	columns: [{
		flex: 1,
		dataIndex: 'name',
		text: 'Название книги'
	}, {
		flex: 1,
		dataIndex: 'author',
		text: 'Автор'
	}, {
		flex: 1,
		dataIndex: 'year',
		text: 'Год'
	}, {
		flex: 1,
		dataIndex: 'genre',
		text: 'Жанр'
	}]
});

Ext.onReady(function () {
	grid = new BooksList({
		renderTo: Ext.getBody(),
		width: 600,
		height: 400
	});
});



