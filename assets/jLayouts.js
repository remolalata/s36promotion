function jLayouts($,jLayoptions){
// need jQuery 1.4 ++
	var jLay=this;
	var listion={
			params:{},evs:{},
			bev:function(name,_fn){this.evs[name]=_fn;},
			fev:function(name){if( typeof this.evs[name] === 'function' ){this.evs[name].apply(this, [].slice.call(arguments, 1));}},
			run:function(){for(ev in this.evs){if(typeof this.evs[ev]==='function'){ this.evs[ev].apply(this, [].slice.call(arguments, 1));}}},
			trg:function(name){for(ev in this.evs[name]){if(typeof this.evs[name][ev]==='function'){ this.evs[name][ev].apply(this, [].slice.call(arguments, 1));}}}
		}
	jLay.params={
		bodyminwidth:600,
		body:true,
		wheelStepSize:120,
		none:null
	}
	if(jLayoptions){$.extend(jLay.params,jLayoptions);}
	jLay.listion=listion;
	jLay.scrollbarsize=gScrollbarSize();

	jLay.button=function(options){
		var button=this;
		var params={trg:'.btn',cls:null};
		$.extend(params,options);
		var trg=$(params.trg);
		trg.live('mouseover',function(event){$(this).addClass(gClss(this,params.cls)+'_ovr')});
		trg.live('mouseout',trg,function(event){if(isout(event,this)){$(this).removeClass(gClss(this,params.cls)+'_ovr')}});
		trg.live('mousedown',function(){$(this).addClass(gClss(this,params.cls)+'_prs')});
		trg.live('mouseup',function(){$(this).removeClass(gClss(this,params.cls)+'_prs')});
		$(document).live('mouseup',function(){trg.removeClass(function(){return gClss(this,params.cls)+'_prs';})});
		return button;
	}//==================================================================================
	jLay.tab=function(options){
		var tab=this;
		var params={
				trgarea:'.tabarea',
				trg:'.tab',
				rsparea:'.tabwrparea',
				rsp:'.tabwrp',
				index:0,
				lev:3,
				ev:'click'
			};
		$.extend(params,options);
		
		var trgareas=$(params.trgarea);
		trgareas.each(function(i){
			var rsparea,trgarea ;
			trgarea=$(this);
			
			if( trgarea.attr('rsp')){
				rsparea=gNear(trgarea,trgarea.attr('rsp'),params.lev);
			}else{
				rsparea=gNear(trgarea,params.rsparea,params.lev);
			}

			if(!rsparea.eq(0)[0]){return;}
			
			var trgs=trgarea.find(params.trg);
			var rsps=rsparea.find(params.rsp);
			
			if(trgs[params.index] && rsps[params.index]){
				$(trgs[params.index]).addClass(function(){return gClss(this)+'_on';});
				$(rsps[params.index]).addClass(function(){return gClss(this)+'_on';});
			}
			
			switch(params.ev){
				case 'click':
					trgs.click(function(){
						var cls=gClss(this);
						var idx=trgs.index(this); 
						
						if(!rsps[idx]){return ;}						
						
						trgs.removeClass(cls+'_on');
						$(this).addClass(cls+'_on');

						rsps.removeClass(function(){return gClss(this)+'_on';});
						$(rsps[idx]).addClass(function(){return gClss(this)+'_on';});
					});
				break;
				case 'hover':
					trgs.mouseover(function(){
						var cls=gClss(this);
						var idx=trgs.index(this); 
						
						if(!rsps[idx]){return ;}
						
						trgs.removeClass(cls+'_on');
						$(this).addClass(cls+'_on');

						rsps.removeClass(function(){return gClss(this)+'_on';});
						$(rsps[idx]).addClass(function(){return gClss(this)+'_on';});
					});
				break;
			}
		});
		
		
		return tab;
	}//==================================================================================
	jLay.status=function(options){
		var status=this;
		var params={
				trg:'.sbtn',
				rsp:null,
				index:0,
				time:0,
				blur:false,
				lev:0,
				ev:'click'
				
			};
		$.extend(params,options);
		var trgs=$(params.trg);
		trgs.each(function(){
		
			var rsp=$(),trg=$(this);
			if( trg.attr('rsp')){
				rsp=gNear(trg,trg.attr('rsp'),params.lev);
			}else{
				rsp=gNear(trg,params.rsp,params.lev);
			}
			if(!rsp.eq(0)[0]){return;}
			
		switch(params.ev){
			case 'click':
				
					trg.click(function(event){
						event.stopPropagation();
						if($(rsp).hasClass(gClss(rsp)+'_on')){
							trg.removeClass(function(){return gClss(this)+'_on';});
							rsp.removeClass(function(){return gClss(this)+'_on';});
						}else{
							trg.addClass(function(){return gClss(this)+'_on';});
							rsp.addClass(function(){return gClss(this)+'_on';});
						}
					});
					if(params.blur){
						$(document).click(function(){
							trg.removeClass(function(){return gClss(this)+'_on';});
							rsp.removeClass(function(){return gClss(this)+'_on';});
						});
					}
			break;
			case 'hover':
					trg.mouseover(function(event){
							$(this).addClass(gClss(this)+'_on');
							rsp.addClass(function(){return gClss(this)+'_on';});
						
					});
					trg.mouseout(function(event){
						if(isout(event,this) && isout(event,rsp)){
							$(this).removeClass(gClss(this)+'_on');
							var t=setTimeout(function(){
								rsp.removeClass(function(){return gClss(this)+'_on';});
							},params.time)
						}else{
							$(this).addClass(gClss(this)+'_on');
							rsp.addClass(function(){return gClss(this)+'_on';});
						}
					});
					rsp.mouseout(function(event){
						if(isout(event,this) && isout(event,trg)){
							trg.removeClass(function(){return gClss(this)+'_on';});
							var t=setTimeout(function(){
								rsp.removeClass(function(){return gClss(this)+'_on';});
							},params.time);
						}
					});
			break;
		}
		});
		return status;
	}//==================================================================================
	jLay.size=function(options){
		var size=this;
		var params={
				trg:'.height',
				mode:'screen',//'minheight' ,'screen','minscreen','minsize'
				sizename:'height',
				size:null,
				ett:0
			};
		$.extend(params,options);
		$(params.trg).each(function(){
			var trg=$(this);
			var minscreen=function(o){
				o.css(params.sizename,'auto');
				var trgsize=parseInt($(window)[params.sizename]())-params.ett;
				if((parseInt(o[params.sizename]()) < trgsize)){o[params.sizename](trgsize);}else{o.css(params.sizename,'auto');}
			}
			var screen=function(o){o[params.sizename](parseInt($(window)[params.sizename]())-params.ett);}
			var minsize=function(o){
				if(minsize && (parseInt(o[params.sizename]()) < params.size) ){o[params.sizename](params.size)}else{o.css(params.size,'auto');}
			}
			var maxsize=function(o){
				if(maxsize && (parseInt(o[params.sizename]()) > params.size) ){o[params.sizename](params.size)}else{o.css(params.size,'auto');}
			}
			switch(params.mode){
				case 'screen':screen(trg);$(window).resize(function(){screen(trg)});break;
				case 'minscreen':minscreen(trg);$(window).resize(function(){minscreen(trg);});break;
				case 'minsize':minsize(trg);$(window).resize(function(){minsize(trg);});break;
				case 'maxsize':maxsize(trg);$(window).resize(function(){maxsize(trg);});break;
			}
		});
		return size ;
	}//==================================================================================
	jLay.list=function(options){
		var list=this;
		var params={
			    trg:'.list',
			    li:'.li',
			    high:true,
			    col:1
		};
		$.extend(params,options);
		var trgs=$(params.trg);
		 	trgs.each(function(){
		    		var trg=$(this);
		    		trg.addClass('dl dl_'+gClss(trg));
		    		var lis=trg.find(params.li);
		    		    if(lis.length<1){return false}
		    		var lev=Math.ceil(lis.length/params.li);
		    		var tag=lis.eq(0).get(0).tagName.toLowerCase();
		    		var cls=gClss(lis.eq(0));
		    		var n=1,c=1,lic=[];
		    		    lis.each(function(idx,itm){
		    		    	lic[lic.length]=[itm,parseInt($(itm).height())];
		    		    		var colcls=cls+'c_'+c;
		    		    		if(params.col==0){colcls=""}
		    		    		if(params.high){$(itm).addClass(cls+'_'+n+' '+colcls)}
		    		    	if(((n%params.col==0) || (n==(lis.length))) && (idx!=0) && params.col!=0){
		    		    		$(itm).after('<'+tag+' class="'+cls+'_br"></'+tag+'>');
		    		    		if(params.high){
			    		    		lic.sort(function(a,b){ if(a[1]>b[1]){return -1;}else{ return 1;}} );
			    		    		for(i=0;i<lic.length;i++){$(lic[i][0]).css('height',lic[0][1]);}
			    		    		lic=[];
		    		    		}
		    		    		c=0;
		    		    	}
		    		    	c++;
		    		    	n++;
		    		    });
		   	 });
		return list;
	}//==================================================================================
	jLay.imgarea=function(options){
		var marquee=this;
		var params={
				trg:'.imgarea',
				view:'.view',
				list:'.list li'
			};
		$.extend(params,options);
		var trgs=$(params.trg);
		jLay.button({trg:(params.trg +" "+ params.list)});
		trgs.each(function(){
			var trg=$(this);
			var view=trg.find(params.view + ' img').eq(0);
			var lists=trg.find(params.list);
			lists.bind({
				'mouseover':function(){
					tag=$(this).attr('tag');
					if(tag){
						view.attr('src',tag);
					}
				}
			});
			
		});
		
	}
	jLay.marquee=function(options){
		var marquee=this;
		var params={
				trg:'.marquee',
				interval:500,
				distance:5,
				direction:'y',
				cycling:true
			};
		$.extend(params,options);
		var trgs=$(params.trg);
		var dir=params.direction,siz,pos;
		if(dir=='x'){siz='width';pos='left';}else if(dir=='y'){siz='height';pos='top';}else{return}
		
		trgs.each(function(){
			var trg=$(this),trgItvid;
			if(gppty(trg,'scroll'+siz) <=gppty(trg,siz) ){return}
			var mrq=function(){
				var scrollto=gppty(trg);
				if(params.cycling){
					if((gppty(trg,'scroll'+pos)+gppty(trg,siz) ) >=gppty(trg,'scroll'+siz) ){
						jLay.scrollto(dir,trg,0);
					}
				}
				jLay.scrollto(dir,trg,gppty(trg,'scroll'+pos)+params.distance);
			}
			trgItvid=setInterval(mrq,params.interval);
			trg.mouseover(function(){clearInterval(trgItvid);});
			trg.mouseout(function(event){
				if(isout(event,this)){
					trgItvid=setInterval(mrq,params.interval);
				}
			});
			trg.mousewheel(function(event,delta){
				var scrollSize=gppty(trg,'scroll'+pos);
				if(delta < 0){scrollSize+=jLay.params.wheelStepSize;}
				if(delta > 0){scrollSize-=jLay.params.wheelStepSize;}
				jLay.scrollto(dir,this,scrollSize);
				return false;
			});
		});

	}
	jLay.scrollto=function(dir,o,to){if(dir=='x'){$(o).scrollLeft(to)};if(dir=='y'){$(o).scrollTop(to)}}
	
	
	function onStartDrag(event){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;};if ($.browser.msie){$('html').bind('dragstart', stoped).bind('selectstart', stoped);};return false;};
	function onStopDrag(){if ($.browser.msie){$('html').unbind('dragstart', stoped).unbind('selectstart', stoped);}};
	function stoped(){return false;}
	function epage(event){ var page={'x':event.pageX,'y':event.pageY}; return page;}
	function gparent(_o,_slt,_lev){var prts=$(_o).parent(),prtslt=$(_o).parent(_slt).get(0);if(prtslt){return $(_o).parent(_slt).get(0)}if(!_lev){_lev=30};var c=0;while(!prtslt && (c<_lev)){prtslt=prts.parent(_slt).get(0);prts=prts.parent();c++;};if(c==_lev){return $();}else{return prts;}}
	function gppty(o,ppt){
		var property={
			'top':function(){return parseInt(o.css('top'));},'left':function(){return parseInt(o.css('left'))},
			'width':function(){return parseInt(o.width())},'height':function(){return parseInt(o.height())},
			'offsettop':function(){return parseInt(o.offset().top)},'ofsetleft':function(){return parseInt(o.offset().left)},
			'scrollwidth':function(){return parseInt(o.get(0).scrollWidth)},'scrollheight':function(){return parseInt(o.get(0).scrollHeight)},
			'clientwidth':function(){return parseInt(o.get(0).clientWidth)},'clientheight':function(){return parseInt(o.get(0).clientHeight)},
			'offsetwidth':function(){return parseInt(o.get(0).offsetWidth)},'offsetheight':function(){return parseInt(o.get(0).offsetHeight)},
			'scrolltop':function(){return parseInt(o.scrollTop());},'scrollleft':function(){return parseInt(o.scrollLeft());},
			'scrollto':function(d,p){if(d=='x'){o.scrollLeft(p)};if(d=='y'){o.scrollTop(p)}}
		};if(ppt){return property[ppt]();}else{return property;}
	    }
	function gNear(e,find,lev){if(e.find(find).eq(0)[0]){return e.find(find).eq(0);};var eParent=e.parent(),o=null,c=0;while( !o && ((eParent!=document.body) || (c<lev))){o=eParent.find(find).eq(0)[0];eParent=eParent.parent();c++;};return $(o);}
	function gClss(e,clss){if(clss){$(e).addClass(clss);return clss;};var cln='jl';if(!$(e).attr('class')){$(e).addClass(cln);}if($(e).attr('class')){classn=$(e).attr('class').split(' ');if(classn.length>0){cln=classn[0];} } return cln ;}
	function isout(event,e){if(event.relatedTarget==$(e)[0] || $(e).find(event.relatedTarget)[0]){return false;}else{return true};};
	function rKyvl(_obj){var _key,_val;for( x in _obj){_key=x;_val=_obj[x];};return {key:_key,val:_val} ;};
	function gScrollbarSize(){$('body').append('<div id="scrollSizeTest" style="position:absolute;visibility:hidden;width:100px;height:100px;overflow:scroll;"></div>');var r={'x':parseInt($('#scrollSizeTest').get(0).offsetWidth) - parseInt($('#scrollSizeTest').get(0).clientWidth),'y':parseInt($('#scrollSizeTest').get(0).offsetHeight) - parseInt($('#scrollSizeTest').get(0).clientHeight)};$('#scrollSizeTest').remove();return r ;}
	return jLay;
};
;(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
;(function(a){var b=function(b,c){var d=a.extend({},a.fn.nivoSlider.defaults,c);var e={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false};var f=a(b);f.data("nivo:vars",e);f.css("position","relative");f.addClass("nivoSlider");var g=f.children();g.each(function(){var b=a(this);var c="";if(!b.is("img")){if(b.is("a")){b.addClass("nivo-imageLink");c=b}b=b.find("img:first")}var d=b.width();if(d==0)d=b.attr("width");var g=b.height();if(g==0)g=b.attr("height");if(d>f.width()){f.width(d)}if(g>f.height()){f.height(g)}if(c!=""){c.css("display","none")}b.css("display","none");e.totalSlides++});if(d.randomStart){d.startSlide=Math.floor(Math.random()*e.totalSlides)}if(d.startSlide>0){if(d.startSlide>=e.totalSlides)d.startSlide=e.totalSlides-1;e.currentSlide=d.startSlide}if(a(g[e.currentSlide]).is("img")){e.currentImage=a(g[e.currentSlide])}else{e.currentImage=a(g[e.currentSlide]).find("img:first")}if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}f.css("background",'url("'+e.currentImage.attr("src")+'") no-repeat');f.append(a('<div class="nivo-caption"><p></p></div>').css({display:"none",opacity:d.captionOpacity}));a(".nivo-caption",f).css("opacity",0);var h=function(b){var c=a(".nivo-caption",f);if(e.currentImage.attr("title")!=""&&e.currentImage.attr("title")!=undefined){var d=e.currentImage.attr("title");if(d.substr(0,1)=="#")d=a(d).html();if(c.css("opacity")!=0){c.find("p").stop().fadeTo(b.animSpeed,0,function(){a(this).html(d);a(this).stop().fadeTo(b.animSpeed,1)})}else{c.find("p").html(d)}c.stop().fadeTo(b.animSpeed,b.captionOpacity)}else{c.stop().fadeTo(b.animSpeed,0)}};h(d);var i=0;if(!d.manualAdvance&&g.length>1){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}if(d.directionNav){f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+d.prevText+'</a><a class="nivo-nextNav">'+d.nextText+"</a></div>");if(d.directionNavHide){a(".nivo-directionNav",f).hide();f.hover(function(){a(".nivo-directionNav",f).show()},function(){a(".nivo-directionNav",f).hide()})}a("a.nivo-prevNav",f).live("click",function(){if(e.running)return false;clearInterval(i);i="";e.currentSlide-=2;o(f,g,d,"prev")});a("a.nivo-nextNav",f).live("click",function(){if(e.running)return false;clearInterval(i);i="";o(f,g,d,"next")})}if(d.controlNav){var j=a('<div class="nivo-controlNav"></div>');f.append(j);for(var k=0;k<g.length;k++){if(d.controlNavThumbs){var l=g.eq(k);if(!l.is("img")){l=l.find("img:first")}if(d.controlNavThumbsFromRel){j.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("rel")+'" alt="" /></a>')}else{j.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("src").replace(d.controlNavThumbsSearch,d.controlNavThumbsReplace)+'" alt="" /></a>')}}else{j.append('<a class="nivo-control" rel="'+k+'">'+(k+1)+"</a>")}}a(".nivo-controlNav a:eq("+e.currentSlide+")",f).addClass("active");a(".nivo-controlNav a",f).live("click",function(){if(e.running)return false;if(a(this).hasClass("active"))return false;clearInterval(i);i="";f.css("background",'url("'+e.currentImage.attr("src")+'") no-repeat');e.currentSlide=a(this).attr("rel")-1;o(f,g,d,"control")})}if(d.keyboardNav){a(window).keypress(function(a){if(a.keyCode=="37"){if(e.running)return false;clearInterval(i);i="";e.currentSlide-=2;o(f,g,d,"prev")}if(a.keyCode=="39"){if(e.running)return false;clearInterval(i);i="";o(f,g,d,"next")}})}if(d.pauseOnHover){f.hover(function(){e.paused=true;clearInterval(i);i=""},function(){e.paused=false;if(i==""&&!d.manualAdvance){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}})}f.bind("nivo:animFinished",function(){e.running=false;a(g).each(function(){if(a(this).is("a")){a(this).css("display","none")}});if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}if(i==""&&!e.paused&&!d.manualAdvance){i=setInterval(function(){o(f,g,d,false)},d.pauseTime)}d.afterChange.call(this)});var m=function(b,c,d){for(var e=0;e<c.slices;e++){var f=Math.round(b.width()/c.slices);if(e==c.slices-1){b.append(a('<div class="nivo-slice"></div>').css({left:f*e+"px",width:b.width()-f*e+"px",height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(f+e*f-f)+"px 0%"}))}else{b.append(a('<div class="nivo-slice"></div>').css({left:f*e+"px",width:f+"px",height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(f+e*f-f)+"px 0%"}))}}};var n=function(b,c,d){var e=Math.round(b.width()/c.boxCols);var f=Math.round(b.height()/c.boxRows);for(var g=0;g<c.boxRows;g++){for(var h=0;h<c.boxCols;h++){if(h==c.boxCols-1){b.append(a('<div class="nivo-box"></div>').css({opacity:0,left:e*h+"px",top:f*g+"px",width:b.width()-e*h+"px",height:f+"px",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(e+h*e-e)+"px -"+(f+g*f-f)+"px"}))}else{b.append(a('<div class="nivo-box"></div>').css({opacity:0,left:e*h+"px",top:f*g+"px",width:e+"px",height:f+"px",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(e+h*e-e)+"px -"+(f+g*f-f)+"px"}))}}}};var o=function(b,c,d,e){var f=b.data("nivo:vars");if(f&&f.currentSlide==f.totalSlides-1){d.lastSlide.call(this)}if((!f||f.stop)&&!e)return false;d.beforeChange.call(this);if(!e){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}else{if(e=="prev"){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}if(e=="next"){b.css("background",'url("'+f.currentImage.attr("src")+'") no-repeat')}}f.currentSlide++;if(f.currentSlide==f.totalSlides){f.currentSlide=0;d.slideshowEnd.call(this)}if(f.currentSlide<0)f.currentSlide=f.totalSlides-1;if(a(c[f.currentSlide]).is("img")){f.currentImage=a(c[f.currentSlide])}else{f.currentImage=a(c[f.currentSlide]).find("img:first")}if(d.controlNav){a(".nivo-controlNav a",b).removeClass("active");a(".nivo-controlNav a:eq("+f.currentSlide+")",b).addClass("active")}h(d);a(".nivo-slice",b).remove();a(".nivo-box",b).remove();var g=d.effect;if(d.effect=="random"){var i=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");g=i[Math.floor(Math.random()*(i.length+1))];if(g==undefined)g="fade"}if(d.effect.indexOf(",")!=-1){var i=d.effect.split(",");g=i[Math.floor(Math.random()*i.length)];if(g==undefined)g="fade"}if(f.currentImage.attr("data-transition")){g=f.currentImage.attr("data-transition")}f.running=true;if(g=="sliceDown"||g=="sliceDownRight"||g=="sliceDownLeft"){m(b,d,f);var j=0;var k=0;var l=a(".nivo-slice",b);if(g=="sliceDownLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);c.css({top:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="sliceUp"||g=="sliceUpRight"||g=="sliceUpLeft"){m(b,d,f);var j=0;var k=0;var l=a(".nivo-slice",b);if(g=="sliceUpLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);c.css({bottom:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="sliceUpDown"||g=="sliceUpDownRight"||g=="sliceUpDownLeft"){m(b,d,f);var j=0;var k=0;var o=0;var l=a(".nivo-slice",b);if(g=="sliceUpDownLeft")l=a(".nivo-slice",b)._reverse();l.each(function(){var c=a(this);if(k==0){c.css("top","0px");k++}else{c.css("bottom","0px");k=0}if(o==d.slices-1){setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({height:"100%",opacity:"1.0"},d.animSpeed)},100+j)}j+=50;o++})}else if(g=="fold"){m(b,d,f);var j=0;var k=0;a(".nivo-slice",b).each(function(){var c=a(this);var e=c.width();c.css({top:"0px",height:"100%",width:"0px"});if(k==d.slices-1){setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed)},100+j)}j+=50;k++})}else if(g=="fade"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:b.width()+"px"});q.animate({opacity:"1.0"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g=="slideInRight"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g=="slideInLeft"){m(b,d,f);var q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1",left:"",right:"0px"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){q.css({left:"0px",right:""});b.trigger("nivo:animFinished")})}else if(g=="boxRandom"){n(b,d,f);var r=d.boxCols*d.boxRows;var k=0;var j=0;var s=p(a(".nivo-box",b));s.each(function(){var c=a(this);if(k==r-1){setTimeout(function(){c.animate({opacity:"1"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+j)}else{setTimeout(function(){c.animate({opacity:"1"},d.animSpeed)},100+j)}j+=20;k++})}else if(g=="boxRain"||g=="boxRainReverse"||g=="boxRainGrow"||g=="boxRainGrowReverse"){n(b,d,f);var r=d.boxCols*d.boxRows;var k=0;var j=0;var t=0;var u=0;var v=new Array;v[t]=new Array;var s=a(".nivo-box",b);if(g=="boxRainReverse"||g=="boxRainGrowReverse"){s=a(".nivo-box",b)._reverse()}s.each(function(){v[t][u]=a(this);u++;if(u==d.boxCols){t++;u=0;v[t]=new Array}});for(var w=0;w<d.boxCols*2;w++){var x=w;for(var y=0;y<d.boxRows;y++){if(x>=0&&x<d.boxCols){(function(c,e,f,h,i){var j=a(v[c][e]);var k=j.width();var l=j.height();if(g=="boxRainGrow"||g=="boxRainGrowReverse"){j.width(0).height(0)}if(h==i-1){setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3,"",function(){b.trigger("nivo:animFinished")})},100+f)}else{setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3)},100+f)}})(y,x,j,k,r);k++}x--}j+=100}}};var p=function(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a};var q=function(a){if(this.console&&typeof console.log!="undefined")console.log(a)};this.stop=function(){if(!a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=true;q("Stop Slider")}};this.start=function(){if(a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=false;q("Start Slider")}};d.afterLoad.call(this);return this};a.fn.nivoSlider=function(c){return this.each(function(d,e){var f=a(this);if(f.data("nivoslider"))return f.data("nivoslider");var g=new b(this,c);f.data("nivoslider",g)})};a.fn.nivoSlider.defaults={effect:"fade",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,directionNavHide:true,controlNav:true,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch:".jpg",controlNavThumbsReplace:"_thumb.jpg",keyboardNav:true,pauseOnHover:true,manualAdvance:false,captionOpacity:.8,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};a.fn._reverse=[].reverse})(jQuery);;var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"<param name=wmode value=transparent /></object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

(function( $ ) {
	$.scrollFollow = function ( box, options )
	{ 
		box = $( box );
		var position = box.css( 'position' );
		function ani()
		{		
			box.queue( [ ] );
			var viewportHeight = parseInt( $( window ).height() );	
			var pageScroll =  parseInt( $( document ).scrollTop() );
			var parentTop =  parseInt( box.cont.offset().top );
			var parentHeight = parseInt( box.cont.attr( 'offsetHeight' ) );
			var boxHeight = parseInt( box.attr( 'offsetHeight' ) + ( parseInt( box.css( 'marginTop' ) ) || 0 ) + ( parseInt( box.css( 'marginBottom' ) ) || 0 ) );
			var aniTop;
			if ( isActive )
			{
				if ( options.relativeTo == 'top' )
				{
					if ( box.initialOffsetTop >= ( pageScroll + options.offset ) )
					{
						aniTop = box.initialTop;
					}
					else
					{
						aniTop = Math.min( ( Math.max( ( -parentTop ), ( pageScroll - box.initialOffsetTop + box.initialTop ) ) + options.offset ), ( parentHeight - boxHeight - box.paddingAdjustment ) );
					}
				}
				else if ( options.relativeTo == 'bottom' )
				{
					if ( ( box.initialOffsetTop + boxHeight ) >= ( pageScroll + options.offset + viewportHeight ) )
					{
						aniTop = box.initialTop;
					}
					else
					{
						aniTop = Math.min( ( pageScroll + viewportHeight - boxHeight - options.offset ), ( parentHeight - boxHeight ) );
					}
				}
				if ( ( new Date().getTime() - box.lastScroll ) >= ( options.delay - 20 ) )
				{
					box.animate(
						{
							top: aniTop
						}, options.speed, options.easing
					);
				}
			}
		};
		var isActive = true;
		if ( $.cookie != undefined )
		{
			if( $.cookie( 'scrollFollowSetting' + box.attr( 'id' ) ) == 'false' )
			{
				var isActive = false;
				
				$( '#' + options.killSwitch ).text( options.offText )
					.toggle( 
						function ()
						{
							isActive = true;
							
							$( this ).text( options.onText );
							
							$.cookie( 'scrollFollowSetting' + box.attr( 'id' ), true, { expires: 365, path: '/'} );
							
							ani();
						},
						function ()
						{
							isActive = false;
							
							$( this ).text( options.offText );
							
							box.animate(
								{
									top: box.initialTop
								}, options.speed, options.easing
							);	
							
							$.cookie( 'scrollFollowSetting' + box.attr( 'id' ), false, { expires: 365, path: '/'} );
						}
					);
			}
			else
			{
				$( '#' + options.killSwitch ).text( options.onText )
					.toggle( 
						function ()
						{
							isActive = false;
							
							$( this ).text( options.offText );
							
							box.animate(
								{
									top: box.initialTop
								}, 0
							);	
							
							$.cookie( 'scrollFollowSetting' + box.attr( 'id' ), false, { expires: 365, path: '/'} );
						},
						function ()
						{
							isActive = true;
							
							$( this ).text( options.onText );
							
							$.cookie( 'scrollFollowSetting' + box.attr( 'id' ), true, { expires: 365, path: '/'} );
							
							ani();
						}
					);
			}
		}
		if ( options.container == '')
		{
			box.cont = box.parent();
		}
		else
		{
			box.cont = $( '#' + options.container );
		}
		
		box.initialOffsetTop =  parseInt( box.offset().top );
		box.initialTop = parseInt( box.css( 'top' ) ) || 0;
		if ( box.css( 'position' ) == 'relative' )
		{
			box.paddingAdjustment = parseInt( box.cont.css( 'paddingTop' ) ) + parseInt( box.cont.css( 'paddingBottom' ) );
		}
		else
		{
			box.paddingAdjustment = 0;
		}
		$( window ).scroll( function ()
			{
				// Sets up the delay of the animation
				$.fn.scrollFollow.interval = setTimeout( function(){ ani();} , options.delay );
				
				// To check against right before setting the animation
				box.lastScroll = new Date().getTime();
			}
		);
		
		// Animate the box when the page is resized
		$( window ).resize( function ()
			{
				// Sets up the delay of the animation
				$.fn.scrollFollow.interval = setTimeout( function(){ ani();} , options.delay );
				
				// To check against right before setting the animation
				box.lastScroll = new Date().getTime();
			}
		);

		// Run an initial animation on page load
		box.lastScroll = 0;
		
		ani();
	};
	
	$.fn.scrollFollow = function ( options )
	{
		options = options || {};
		options.relativeTo = options.relativeTo || 'top';
		options.speed = options.speed || 500;
		options.offset = options.offset || 0;
		options.easing = options.easing || 'swing';
		options.container = options.container || this.parent().attr( 'id' );
		options.killSwitch = options.killSwitch || 'killSwitch';
		options.onText = options.onText || 'Turn Slide Off';
		options.offText = options.offText || 'Turn Slide On';
		options.delay = options.delay || 0;
		
		this.each( function() 
			{
				new $.scrollFollow( this, options );
			}
		);
		
		return this;
	};
})( jQuery );