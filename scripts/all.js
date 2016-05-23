Ext.application({
	name:'MyFirstExtJSApp',
	launch:function(){
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
	}
});