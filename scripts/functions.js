function createSaveBookForm() {
	return Ext.create('Ext.form.Panel', {
		title: 'Введите данные',
		renderTo: Ext.getBody(),
		bodyPadding: 5,
		width: 350,

		url: '/../FrontController.php?ctrl=Books&act=Save',

		items: [{
			xtype: 'textfield',
			fieldLabel: 'Название книги',
			name: 'name',
			allowBlank: false,
			blankText: 'Поле обязательно для заполнения!'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Автор',
			name: 'author',
			allowBlank: false,
			blankText: 'Поле обязательно для заполнения!'
		}, {
			xtype: 'numberfield',
			minValue: 1200,
			maxValue: 2016,
			fieldLabel: 'Год',
			name: 'year',
			allowBlank: false,
			blankText: 'Поле обязательно для заполнения!'
		}, {
			xtype: 'textfield',
			fieldLabel: 'Жанр',
			name: 'genre',
			allowBlank: false,
			blankText: 'Поле обязательно для заполнения!'
		}, {
			xtype: 'hiddenfield',
			name: 'id'
		}],

		buttons: [{
			text: 'Сохранить',
			handler: function () {
				// The getForm() method returns the Ext.form.Basic instance:
				var form = this.up('form').getForm();
				if (form.isValid()) {
					// Submit the Ajax request and handle the response
					form.submit({
						success: function (form, action) {
							grid.getStore().add(action.result.data);
							form.reset();
						},
						failure: function (form, action) {
							//console.log('form=', form, 'action=', action);
							Ext.Msg.alert('Ошибка добавления, попробуйте позже');
						}
					});
				}
			}
		}]
	});
}
