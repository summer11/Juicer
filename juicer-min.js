(function(){var a={version:"0.2.3"};this.__cache={};this.__escapehtml={__escapehash:{"<":"&lt;",">":"&gt;",'"':"&quot;","&":"&amp;"},__escapereplace:function(b){return __escapehtml.__escapehash[b];},__escape:function(b){return typeof(b)!=="string"?b:b.replace(/[&<>"]/igm,__escapehtml.__escapereplace);},__detection:function(b){return typeof(b)==="undefined"?"":b;}};a.settings={forstart:/{@each\s*([\w\.]*?)\s*as\s*(\w*?)(,\w*?)?}/igm,forend:/{@\/each}/igm,ifstart:/{@if\s*([^}]*?)}/igm,ifend:/{@\/if}/igm,elsestart:/{@else}/igm,interpolate:/\${([\s\S]+?)}/igm,noneencode:/\$\${([\s\S]+?)}/igm,inlinecomment:/{#[^}]*?}/igm};a.template=function(){var b=this;this.__interpolate=function(d,g,e){var c=d.split("|"),f="";if(c.length>1){d=c.shift();f=c.shift();}return"<%= "+(g?"__escapehtml.__escape":"")+"("+(!e||e.detection!==false?"__escapehtml.__detection":"")+"("+f+"("+d+"))) %>";};this.__shell=function(d,c){var e=0;d=d.replace(a.settings.forstart,function(j,g,i,h){var i=i||"value",h=h&&h.substr(1);var f="i"+e++;return"<% for(var "+f+"=0,l="+g+".length;"+f+"<l;"+f+"++) {var "+i+"="+g+"["+f+"];"+(h?("var "+h+"="+f+";"):"")+" %>";}).replace(a.settings.forend,"<% } %>").replace(a.settings.ifstart,function(f,g){return"<% if("+g+") { %>";}).replace(a.settings.ifend,"<% } %>").replace(a.settings.elsestart,function(f){return"<% } else { %>";}).replace(a.settings.noneencode,function(g,f){return b.__interpolate(f,false,c);}).replace(a.settings.interpolate,function(g,f){return b.__interpolate(f,true,c);}).replace(a.settings.inlinecomment,"");if(!c||c.errorhandling!==false){d="<% try { %>"+d+'<% } catch(e) {console.warn("Juicer Render Exception: "+e.message);} %>';}return d;};this.__pure=function(d,c){if(c&&c.loose===true){buf=this.__looseconvert(d,!c||c.strip);}else{buf=this.__convert(d,!c||c.strip);}return buf;};this.__convert=function(d,e){var c=[].join("");c+="var data=data||{};";c+="var out='';out+='";if(e){c+=d.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out;";}else{c+=d.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';out+=$1;out+='").split("<%").join("';").split("%>").join("out+='")+"';return out.replace(/[\\r\\n]\\t+[\\r\\n]/g,'\\r\\n');";}return c;};this.__looseconvert=function(d,e){var c=[].join("");c+="var data=data||{};";c+="var p=[];";if(e){c+="with(data) {p.push('"+d.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');};return p.join('');";}else{c+="with(data) {p.push('"+d.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');};return p.join('').replace(/[\\r\\n]\\t+[\\r\\n]/g,'\\r\\n');";}return c;};this.parse=function(d,c){d=this.__shell(d,c);d=this.__pure(d,c);this.render=new Function("data",d);return this;};};a.compile=function(c,b){try{var d=__cache[c]?__cache[c]:new this.template().parse(c,b);if(!b||b.cache!==false){__cache[c]=d;}return d;}catch(f){console.warn("Juicer Compile Exception: "+f.message);return{render:function(){}};}};a.to_html=function(c,d,b){return this.compile(c,b).render(d);};typeof(module)!=="undefined"&&module.exports?module.exports=a:this.juicer=a;})();