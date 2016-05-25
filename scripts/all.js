Ext.onReady(function(){

		//
		//Ext.Ajax.request({
		//	url : '../FrontController.php?ctrl=books&act=all',
		//	success: function(response, opts) {
		//		var obj = Ext.decode(response.responseText);
		//		console.log('ajax response=',obj,'response.responseText=',response.responseText);
		//	},
		//	failure: function(response, opts) {
		//		console.log('server-side failure with status code ' + response.status);
		//	}
		//});
		//Ext.create('Ext.container.Viewport',{
		//		layout:'fit',
		//		items:[
		//			{
		//				title:'Мое первое приложение на Ext JS 6',
		//				html:'<h1 style="color:blue">Congratulations! ExtJS App is working!!!</h1>'
		//			}
		//		]
		//	}
		//);

	//var booksObj = '[{"id":"1","author":"Автор Автор Автор","name":"Название книги","year":"2000","genre":"фантастика"},{"id":"2","author":"Неизвестный человек","name":"Безымянная книга","year":"2009","genre":"Биография"}]';
	//obj = Ext.decode(booksObj);
	Ext.define('Books', {
		extend: 'Ext.data.Model',
		fields: ['author', 'name','year','genre']
	});

	Ext.define('BooksListController', {
		extend : 'Ext.app.ViewController',
		alias: 'controller.bookslist',

		init: function(view) {
			Ext.Ajax.request({
				url : '../FrontController.php?ctrl=books&act=all',
				success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					console.log('ajax response obj=',obj,'response.responseText=',response.responseText);
					view.getStore().add(obj);
				},
				failure: function(response, opts) {
					console.log('server-side failure with status code ' + response.status);
				}
			});

		},

		onAddClick: function() {
			Ext.create('Ext.form.Panel', {
				title: 'Basic Form',
				renderTo: Ext.getBody(),
				bodyPadding: 5,
				width: 350,

				// Any configuration items here will be automatically passed along to
				// the Ext.form.Basic instance when it gets created.

				// The form will submit an AJAX request to this URL when submitted
				url: '/../FrontController.php?ctrl=Books&act=Add',

				items: [{
					xtype: 'textfield',
					fieldLabel: 'title book',
					name: 'name'
				},{
					xtype: 'textfield',
					fieldLabel: 'author',
					name: 'author'
				},{
					xtype: 'textfield',
					fieldLabel: 'year',
					name: 'year'
				},{
					xtype: 'textfield',
					fieldLabel: 'genre',
					name: 'genre'
				}],

				buttons: [{
					text: 'Submit',
					handler: function() {
						// The getForm() method returns the Ext.form.Basic instance:
						var form = this.up('form').getForm();
						if (form.isValid()) {
							// Submit the Ajax request and handle the response
							form.submit({
								success: function(form, action) {
									console.log('form=',form,'action=',action);
									Ext.Msg.alert('Success', action.result.message);
								},
								failure: function(form, action) {

									Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
								}
							});
						}
					}
				}]
			});
			//this.addUser();
		},

		onDeleteClick: function() {
			var view = this.getView(),
				selected = view.getSelectionModel().getSelection()[0],
				store = view.getStore();

			store.remove(selected);
		},

		onSelectionChange: function(selModel, selections) {
			this.lookupReference('delete').setDisabled(selections.length === 0);
		},

		getUser: function() {

		},

		addUser: function() {
			this.getView().getStore().add(this.getUser());
		}

	});

	Ext.define('BooksList', {
		extend: 'Ext.grid.Panel',
		controller: 'bookslist',

		tbar: [{
			text: 'Add',
			listeners: {
				click: 'onAddClick'
			}
		}, {
			text: 'Delete',
			reference: 'delete',
			listeners: {
				click: 'onDeleteClick'
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
			text: 'Name'
		}, {
			flex: 1,
			dataIndex: 'author',
			text: 'author'
		}, {
			flex: 1,
			dataIndex: 'year',
			text: 'year'
		}, {
			flex: 1,
			dataIndex: 'genre',
			text: 'genre'
		}]
	});

	Ext.onReady(function() {
		new BooksList({
			renderTo: Ext.getBody(),
			width: 600,
			height: 400
		});
	});



});