
!function(t,s,i){"use strict";t.DropDown=function(s,i){this.$el=t(i),this._init(s)},t.DropDown.defaults={speed:300,_class:"",previtem:"",easing:"ease",gutter:2,stack:!1,itemscontainer:"ul",delay:0,random:!1,rotated:!1,slidingIn:!1,onOptionSelect:function(t){return!1}},t.DropDown.prototype={_init:function(s){this.options=t.extend(!0,{},t.DropDown.defaults,s),this._layout(),this._initEvents()},_layout:function(){var s=this;this.minZIndex=1e3;var o=this._transformSelect();this.opts=this.listopts.children("li"),this.optsCount=this.opts.length,this.size={width:this.dd.width(),height:this.dd.height()};var n=this.$el.attr("name"),e=this.$el.attr("id"),a=n!==i?n:e!==i?e:"cd-dropdown-"+(new Date).getTime();this.inputEl=t('<input  type="hidden" name="'+a+'" value="'+o+'"></input>').insertAfter(this.selectlabel),this.selectlabel.css("z-index",this.minZIndex+this.optsCount),this._positionOpts(),Modernizr.csstransitions&&setTimeout(function(){s.opts.css("transition","all "+s.options.speed+"ms "+s.options.easing)},25)},_transformSelect:function(){var s="",o="",n=-1;return this.$el.children("option").each(function(){var e=t(this),a=isNaN(e.attr("value"))?e.attr("value"):Number(e.attr("value")),h=e.attr("class"),p=e.attr("selected"),d=e.text();-1!==a&&(s+=h!==i?'<li data-value="'+a+'"><span class="'+h+'">'+d+"</span></li>":'<li data-value="'+a+'"><span>'+d+"</span></li>"),p&&(o=d,n=a)}),this.listopts=t("<ul/>").append(s),this.selectlabel=t("<span/>").append(o),this.dd=t('<div class="cd-dropdown"/>').append(this.selectlabel,this.listopts).insertAfter(this.$el),this.$el.remove(),n},_positionOpts:function(s){var i=this;this.listopts.css("height","auto"),this.opts.each(function(s){t(this).css({zIndex:i.minZIndex+i.optsCount-1-s,top:i.options.slidingIn?(s+1)*(i.size.height+i.options.gutter):0,left:0,marginLeft:i.options.slidingIn?s%2==0?i.options.slidingIn:-i.options.slidingIn:0,opacity:i.options.slidingIn?0:1,transform:"none"})}),this.options.slidingIn||this.opts.eq(this.optsCount-1).css({top:this.options.stack?9:0,left:this.options.stack?4:0,width:this.options.stack?this.size.width-8:this.size.width,transform:"none"}).end().eq(this.optsCount-2).css({top:this.options.stack?6:0,left:this.options.stack?2:0,width:this.options.stack?this.size.width-4:this.size.width,transform:"none"}).end().eq(this.optsCount-3).css({top:this.options.stack?3:0,left:0,transform:"none"})},_initEvents:function(){var s=this;this.selectlabel.on("mousedown.dropdown",function(t){return s.opened?s.close():s.open(),!1}),this.opts.on("mouseover",function(){t(s.options.itemscontainer).find("li").removeClass("active"),t(this).addClass("active")}),this.opts.on("click.dropdown",function(i){if(s.opened){i.preventDefault();var o=t(this);s.options.onOptionSelect(o),s.inputEl.val(o.data("value")),s.selectlabel.html(o.html()),s.close()}})},open:function(){var s=this;this.dd.toggleClass("cd-active"),this.listopts.css("height",(this.optsCount+1)*(this.size.height+this.options.gutter)),this.opts.each(function(i){t(this).css({opacity:1,top:s.options.rotated?s.size.height+s.options.gutter:(i+1)*(s.size.height+s.options.gutter),left:s.options.random?Math.floor(11*Math.random()-5):0,width:s.size.width,marginLeft:0,transform:s.options.random?"rotate("+Math.floor(11*Math.random()-5)+"deg)":s.options.rotated?"right"===s.options.rotated?"rotate(-"+5*i+"deg)":"rotate("+5*i+"deg)":"none",transitionDelay:s.options.delay&&Modernizr.csstransitions?s.options.slidingIn?i*s.options.delay+"ms":(s.optsCount-1-i)*s.options.delay+"ms":0})}),this.opened=!0},close:function(){var s=this;this.dd.toggleClass("cd-active"),this.options.delay&&Modernizr.csstransitions&&this.opts.each(function(i){t(this).css({"transition-delay":s.options.slidingIn?(s.optsCount-1-i)*s.options.delay+"ms":i*s.options.delay+"ms"})}),this._positionOpts(!0),this.opened=!1},closeAll:function(){var s=this;this.dd.removeClass("cd-active"),this.options.delay&&Modernizr.csstransitions&&this.opts.each(function(i){t(this).css({"transition-delay":s.options.slidingIn?(s.optsCount-1-i)*s.options.delay+"ms":i*s.options.delay+"ms"})}),this._positionOpts(!0),this.opened=!1},dropDownHendler:function(t,s){}},t.fn.dropdown=function(s){var i=t.data(this,"dropdown");if("string"==typeof s){var o=Array.prototype.slice.call(arguments,1);this.each(function(){i[s].apply(i,o)})}else this.each(function(){i?i._init():i=t.data(this,"dropdown",new t.DropDown(s,this))});return i}}(jQuery,window);