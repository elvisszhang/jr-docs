import 'easyui';
import './easyui/metro/easyui.css'; //version 1.5.1
import './css/kube.css';
import './css/main.css';
import './prettify/prettify.css';

$(function(){
	var converter = new showdown.Converter();
	var options = converter.getOptions();
	options.tables = true;
	function openTab(file,title,closable){
		if ($('#tt').tabs('exists',title)){
			$('#tt').tabs('select', title);
		} else {
			$('#tt').tabs('add',{
				title:title,
				href: file,
				closable:closable,
				bodyCls:'content-doc', 
				extractor:function(text){
					return converter.makeHtml(text);
				}
			});
		}
	}
	openTab('README.md','jrdocs文档首页',false);
	$('#tt').tabs({
		onLoad:function(panel){ 
			var plugin = panel.panel('options').title;
			panel.find('pre').each(function(){
				var data = $(this).find('code').text(); 
				data = data.replace(/(\r\n|\r|\n)/g, '\n');
				if (data.indexOf('\t') == 0){
					data = data.replace(/^\t/, '');
					data = data.replace(/\n\t/g, '\n');
				}
				data = data.replace(/\t/g, '    ');
				var pre = $('<pre name="code" class="prettyprint linenums"></pre>').insertAfter(this);
				pre.text(data);
				$(this).remove();
			});
			//prettyPrint();
		}
	});
	
	$('#navtree').tree({
		url: 'nav.json',
		method: 'get',
		animate:true,
		onClick: function (node) { 
			if (!node.children){ 
				openTab(node.id,node.text,true); 
			}
		}
	});

	var sw = $(window).width();
	if (sw < 767){
		$('body').layout('collapse', 'west');
	}
	$('.navigation-toggle span').bind('click', function(){
		$('#head-menu').toggle();
	});

	function setNav(){
		if ($(window).width() < 767){
			$('.navigation-toggle').each(function(){
				$(this).show();
				var target = $(this).attr('data-target');
				$(target).hide();
			});
		} else {
			$('.navigation-toggle').each(function(){
				$(this).hide();
				var target = $(this).attr('data-target');
				$(target).show();
			});
		}
	}
	setNav();
	$(window).bind('resize', function(){
		setNav();
	});
	$('.navigation-toggle').bind('click', function(){
		var target = $(this).attr('data-target');
		$(target).toggle();
	});
});
