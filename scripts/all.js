Ext.onReady(function(){


		Ext.Ajax.request({
			url : '../FrontController.php?ctrl=books&act=all',
			success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				console.log(obj);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
		Ext.create('Ext.container.Viewport',{
				layout:'fit',
				items:[
					{
						title:'Мое первое приложение на Ext JS 6',
						html:'<h1 style="color:blue">Congratulations! ExtJS App is working!!!</h1>'
					}
				]
			}
		);

});