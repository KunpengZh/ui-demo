(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3dfc6da4"],{"366c":function(t,a,n){"use strict";var e=n("470a"),i=n.n(e);i.a},"470a":function(t,a,n){},7333:function(t,a,n){"use strict";var e=n("0d58"),i=n("2621"),s=n("52a7"),o=n("4bf8"),c=n("626a"),r=Object.assign;t.exports=!r||n("79e5")(function(){var t={},a={},n=Symbol(),e="abcdefghijklmnopqrst";return t[n]=7,e.split("").forEach(function(t){a[t]=t}),7!=r({},t)[n]||Object.keys(r({},a)).join("")!=e})?function(t,a){var n=o(t),r=arguments.length,l=1,d=i.f,u=s.f;while(r>l){var g,v=c(arguments[l++]),h=d?e(v).concat(d(v)):e(v),f=h.length,p=0;while(f>p)u.call(v,g=h[p++])&&(n[g]=v[g])}return n}:r},cf30:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"elementContainer tagscontainer"},[n("div",{staticClass:"contentAlignLeft"},[n("el-button-group",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleDocSearch}},[t._v("文档搜索")]),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleDocumentUpdate}},[t._v("文档录入")])],1)],1),t._l(t.navagators,function(a,e){return n("el-card",{key:a.text,staticStyle:{"margin-top":"10px","margin-bottom":"10px"}},[n("div",{staticClass:"clearfix contentAlignLeft",attrs:{slot:"header"},slot:"header"},[n("span",{staticStyle:{"margin-right":"30px","font-size":"14px"}},[t._v(t._s(a.text))]),n("el-button",{staticStyle:{padding:"3px"},attrs:{size:"mini",icon:"el-icon-close",type:"text"},on:{click:function(a){t.handleDeleteAll(e)}}},[t._v("Delet All")]),n("el-button",{staticStyle:{padding:"3px"},attrs:{size:"mini",icon:"el-icon-circle-plus",type:"text"},on:{click:function(a){t.handleAddNewTag(e)}}},[t._v("Add New Tag")])],1),n("div",{staticClass:"contentAlignLeft filterTagsDiv"},t._l(a.value,function(e,i){return n("el-tag",{key:e,staticClass:"filterTag",attrs:{size:"mini",closable:"",hit:t.tagborder,"disable-transitions":t.disableTransitions,type:t.tagsType[i%5]},on:{close:function(n){t.handleTagClose(a.text,i)}}},[t._v(t._s(e)+"\n      ")])}))])})],2)},i=[],s=(n("f751"),{name:"TagsManagement",data:function(){return{navagators:[],tagborder:!0,disableTransitions:!0,tagsType:["primary","success","warning","danger","info","text",""]}},methods:{handleDocSearch:function(){this.$router.push("/doccenter")},handleDocumentUpdate:function(){this.$router.push("/docinput")},saveAndUpdateNavagators:function(){this.$store.state.doc.data.navagators=this.navagators},handleTagClose:function(t,a){var n=Object.assign([],this.navagators),e=null;for(var i in n){var s=n[i];if(s.text===t){e=s.value;var o=e.slice(0,a).concat(e.slice(a+1));s.value=o;break}}this.navagators=n,this.saveAndUpdateNavagators()},handleDeleteAll:function(t){var a=Object.assign([],this.navagators);a=a.slice(0,t).concat(a.slice(t+1)),this.navagators=a,this.saveAndUpdateNavagators()},handleAddNewTag:function(t){var a=this;this.$prompt("Input new Tag","Reminder",{confirmButtonText:"OK",cancelButtonText:"Cancel"}).then(function(n){var e=n.value,i=Object.assign([],a.navagators);i[t].value.push(e),a.navagators=i,a.saveAndUpdateNavagators()}).catch(function(){})},showLoading:function(){this.loading=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},closeLoading:function(){this.loading.close()}},created:function(){this.navagators=this.$store.state.doc.data.navagators}}),o=s,c=(n("366c"),n("2877")),r=Object(c["a"])(o,e,i,!1,null,"1c45ee24",null);r.options.__file="TagsManagement.vue";a["default"]=r.exports},f751:function(t,a,n){var e=n("5ca1");e(e.S+e.F,"Object",{assign:n("7333")})}}]);
//# sourceMappingURL=chunk-3dfc6da4.1e7c0c8b.js.map