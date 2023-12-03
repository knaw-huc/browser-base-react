import e,{useState as n,useEffect as t}from"react";import{useNavigate as a,useNavigation as c,useLoaderData as l,Link as i,Outlet as r,RouterProvider as o,createBrowserRouter as s}from"react-router-dom";function m(e,n,t){return async({params:a})=>{let c={searchvalues:[],page:1,page_length:n||500,sortorder:t||"title"};if(a.code){const e=JSON.parse(window.atob(a.code));c={searchvalues:e.searchvalues,page:e.page,page_length:n||500,sortorder:t||"title"}}const l=await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(c)});return{searchStruc:c,result:await l.json()}}}function d(n){const t=a(),i=c(),{searchStruc:r,result:o}=l();function s(e){t((n.noIndexPage?"/":"/search/")+window.btoa(JSON.stringify(e))),window.scroll(0,0)}document.title=`Search | ${n.title}`;return e.createElement("div",{className:"hcContentContainer"},e.createElement("div",{className:"hcBasicSideMargin hcMarginBottom1"},e.createElement("h1",null,"Search")),e.createElement("div",{className:"hcLayoutFacet-Result hcBasicSideMargin"},e.createElement("div",{className:"hcLayoutFacets"},e.createElement("div",{className:"hcLayoutFacetsToggel"},e.createElement(n.facetsComponent,{sendCandidateHandler:e=>{if(0===r.searchvalues.length)r.searchvalues=[{name:e.facet,field:e.field,values:[e.candidate]}];else if("object"==typeof r.searchvalues){let n=!1;r.searchvalues.forEach((t=>{t.name===e.facet&&(n=!0,t.values.includes(e.candidate)||t.values.push(e.candidate))})),n||r.searchvalues.push({name:e.facet,field:e.field,values:[e.candidate]})}s({...r,page:1})}}))),e.createElement("div",{className:"hcLayoutResults"},e.createElement("div",{className:"hcResultsHeader hcMarginBottom1"},n.withPaging?o.amount>9999?e.createElement("div",null,o.amount,"+ results, page ",r.page," of ",o.pages," pages"):e.createElement("div",null,o.amount," results, page ",r.page," of ",o.pages," pages"):e.createElement("div",null,o.amount," items found")),e.createElement("div",{className:"hcMarginBottom2"},e.createElement("div",{className:"hcSmallTxt hcTxtColorGreyMid"},"Selected facets:",e.createElement("span",{className:"hcFacetReset hcClickable",onClick:function(){s({...r,searchvalues:[],page:1})}},"Reset facets")),0===r.searchvalues.length?e.createElement("span",{className:"hcSelectedFacet"},e.createElement("span",{className:"hcSelectedFacetType"},"None")):r.searchvalues.map((n=>e.createElement("span",{className:"hcSelectedFacet"},e.createElement("span",{className:"hcSelectedFacetType"},n.name,": "),n.values.map(((t,a)=>e.createElement("div",{className:"hcFacetValues",key:a,onClick:()=>{return e=n.name,a=t,"object"==typeof r.searchvalues&&(r.searchvalues.forEach((n=>{n.name===e&&(n.values=n.values.filter((e=>e!==a)))})),r.searchvalues=r.searchvalues.filter((e=>e.values.length>0)),0===r.searchvalues.length&&(r.searchvalues=[])),void s({...r,page:1});var e,a}},t," ","[x]"))))))),n.headersElement,"loading"===i.state?e.createElement("div",{className:"hcResultListLoading"},"Loading..."):e.createElement(e.Fragment,null,e.createElement("div",null,o.items.map(((t,a)=>e.createElement(n.resultItemComponent,{item:t,key:a})))),n.withPaging&&o.amount>r.page_length&&e.createElement("div",{className:"hcPagination"},r.page<2?e.createElement("div",null):e.createElement("div",{className:"hcClickable",onClick:function(){r.page>0&&s({...r,page:r.page-1})}},"← Previous"),e.createElement("div",{className:"hcClickable"},e.createElement("select",{className:"hcPageSelector",value:r.page,onChange:e=>{return n=Number(e.target.value),void s({...r,page:n});var n}},Array.from({length:o.pages},((n,t)=>e.createElement("option",{key:t+1,value:t+1},t+1))))),r.page<o.pages?e.createElement("div",{className:"hcClickable",onClick:function(){s({...r,page:r.page+1})}},"Next →"):e.createElement("div",null))))))}const h=e=>async({params:n})=>fetch(e(n.id));function p(n){const t=c(),a=l();return document.title=`Item | ${n.title}`,"loading"===t.state?e.createElement("div",{className:"hcContentContainer"},e.createElement("div",null,"Loading")):e.createElement(n.detailComponent,{data:a})}function u(a){const[c,l]=n(""),[i,r]=n(!0);function o(){""!==c&&(a.add({facet:"Free text",field:"FREE_TEXT",candidate:c}),r(!i))}return t((()=>{l("")}),[i]),e.createElement("div",{className:"hcFacet"},e.createElement("div",{className:"hcFacetTitle"},"Text search"),e.createElement("div",{className:"hcFacetSearch"},e.createElement("input",{type:"text",value:c,placeholder:"Press ENTER to search",onChange:function(e){l(e.currentTarget.value)},onKeyUp:function(e){"Enter"===e.key&&o()}}),e.createElement("button",{type:"button",name:"button",onClick:()=>{o()}},"Search")))}function g(a){const[c,l]=n([]),[i,r]=n(a.url+"?name="+a.field+"&amount=10"),[o,s]=n(!0),[m,d]=n(!0),[h,p]=n(!0);return t((()=>{!async function(){const e=await fetch(i),n=await e.json();l(n),s(!1)}()}),[i]),e.createElement("div",{className:"hcFacet"},e.createElement("div",{className:"hcFacetTitle",onClick:()=>p(!h)},e.createElement("span",null,a.name),e.createElement("span",{className:"hcIconHelp"},h?"+":"-")),!h&&e.createElement("div",{className:"hcFacetItems"},o?e.createElement("div",null,"Loading..."):e.createElement("div",null,c.map(((n,t)=>e.createElement("div",{key:t,className:"hcFacetItem",onClick:()=>{return e=n.key,void a.parentCallback({facet:a.name,field:a.field,candidate:e});var e}},e.createElement("div",{className:"checkBoxLabel"}," ",n.key," (",n.doc_count,")")))),a.flex&&e.createElement("div",{className:"hcClickable",onClick:function(){r(m?a.url+"?name="+a.field+"&amount=500":a.url+"?name="+a.field+"&amount=10"),d(!m)}},m?e.createElement("div",null,"More..."):e.createElement("div",null,"Less...")))))}function f(a){n(!0);const[c,l]=n(""),[i,r]=n([]),[o,s]=n(a.url+"?name="+a.field+"&amount=10&filter="+c),[m,d]=n(!0);n(!1);const[h,p]=n(!0);return t((()=>{!async function(){const e=await fetch(o),n=await e.json();r(n),d(!1)}()}),[h]),e.createElement("div",{className:"hcFacet"},e.createElement("div",{className:"hcFacetTitle"},e.createElement("span",null,a.name)),e.createElement("div",{className:"hcFacetFilter"},e.createElement("input",{type:"text",name:"place",onChange:function(e){l(e.currentTarget.value),p(!h)},id:"place",placeholder:"Type to filter"})),m?e.createElement("div",{className:"hcFacetLoading"},"Loading..."):e.createElement("div",{className:"hcFacetItems"},i.map(((n,t)=>e.createElement("div",{key:t,className:"hcFacetItem",onClick:()=>{var e;e=n.key,a.parentCallback({facet:a.name,field:a.field,candidate:e})}},e.createElement("div",{className:"checkBoxLabel"}," ",n.key," (",n.doc_count,")"))))))}function E(e,n){void 0===n&&(n={});var t=n.insertAt;if(e&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.type="text/css","top"===t&&a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c),c.styleSheet?c.styleSheet.cssText=e:c.appendChild(document.createTextNode(e))}}function x(n){return e.createElement(e.Fragment,null,e.createElement("div",{className:"hcContentContainer pageHeader"},e.createElement("header",{className:"hcPageHeaderSimple hcBasicSideMargin"},e.createElement("div",{className:"hcBrand"},e.createElement(i,{to:"/"},e.createElement("div",{className:"hcTitle"},n.title))))),e.createElement("div",{className:"hcContentContainer pageHeaderAfter"}))}E(".hcPageHeaderSimple {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    font-size: 0.9rem;\n    width: 100%;\n}\n\n.hcPageHeaderSimple > * {\n    height: 100%;\n    display: flex;\n    align-items: center;\n}\n\n.hcBrand {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    height: 100%;\n}\n\n.hcTitle {\n    display: inline-block;\n    font-weight: bold;\n    font-size: 24px;\n    padding-top: 18px;\n}\n\n.pageHeader {\n    margin-bottom: 1rem;\n    background-color: #082045;\n    color: #fff;\n}\n\n.pageHeader a {\n    color: #fff;\n}\n\n.pageHeaderAfter {\n    margin-bottom: 5rem;\n    border-bottom: 1px solid #ededed;\n}");function v(n){const t=n.appComponent?e.createElement(n.appComponent,null,e.createElement(r,null)):e.createElement(b,{header:n.headerElement||e.createElement(x,{title:n.title}),footer:n.footerElement}),a=m(n.searchUrl,n.pageLength,n.sortOrder),c=e.createElement(d,{title:n.title,noIndexPage:n.noIndexPage,withPaging:n.withPaging,facetsComponent:n.facetsComponent,resultItemComponent:n.resultItemComponent,headersElement:n.headersElement}),l={path:"/",element:t,children:[...n.childRoutes||[],{index:!0,loader:n.noIndexPage?a:void 0,element:n.noIndexPage?c:n.rootElement||e.createElement(y,{title:n.title,description:n.description})},{path:n.noIndexPage?":code":"search/:code",loader:a,element:c},{path:"detail/:id",loader:h(n.getFetchUrl),element:e.createElement(p,{title:n.title,detailComponent:n.detailComponent})}]};return e.createElement(o,{router:s([l])})}function y(n){return document.title=n.title,e.createElement("div",{className:"hcContentContainer"},e.createElement("h2",null,n.title),n.description&&e.createElement("p",null,n.description),e.createElement(i,{to:"search/"},"Browse"))}function b(n){return e.createElement(e.Fragment,null,n.header,e.createElement(r,null),n.footer)}E('@import url("https://fonts.googleapis.com/css?family=Roboto:300,300i,700,700i");\n\nhtml,\nbody {\n    padding: 0;\n    margin: 0;\n}\n\n* {\n    box-sizing: border-box;\n}\n\na {\n    color: #0087d4;\n    text-decoration: none;\n}\n\nhtml {\n    font-size: 100%;\n}\n\nbody {\n    font-family: "Roboto", sans-serif;\n    font-weight: 300;\n    font-size: 18px;\n    line-height: 140%;\n    font-style: normal;\n    background-color: #fff;\n    color: #3e3e3e;\n    margin: 0;\n    padding: 0;\n}\n\nh1 {\n    font-size: 1.5em;\n    line-height: 130%;\n    font-weight: 700;\n}\n\nh2 {\n    font-size: 1.3em;\n    line-height: 130%;\n    font-weight: 700;\n}\n\nh1, h2 {\n    margin-top: 0;\n    margin-bottom: 0.3em;\n}\n\n@media (min-width: 600px) {\n    body {\n        font-size: 18px;\n        line-height: 150%;\n    }\n\n    h1 {\n        font-size: 2em;\n    }\n\n    h1, h2 {\n        line-height: 150%;\n    }\n\n    span.hcSelectedFacet, span.hcSelectedFacetType {\n        display: flex;\n        flex-direction: row;\n        align-items: baseline;\n        padding-right: 1rem;\n    }\n}\n\n.hcContentContainer p {\n    margin-top: 0;\n    margin-bottom: 1em;\n}\n\n.hcFacet button, .hcButton {\n    font-size: 0.7rem;\n    padding: 0.5rem;\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.07);\n    border: 1px solid rgba(0, 0, 0, 0.09);\n    cursor: pointer;\n    font-weight: 700;\n    margin: 0 0.3rem;\n    max-height: 40px;\n}\n\n.hcFacet input, .hcPageSelector select {\n    width: 100%;\n    padding: 0.5rem;\n    border: 1px solid #e1ebf3;\n    border-radius: 4px;\n    font-size: 1rem;\n    font-weight: 300;\n    color: #3e3e3e;\n    height: 40px;\n}\n\n.hcFacetSearch input::placeholder {\n    color: gray;\n    font-style: italic;\n    font-size: 0.85rem;\n}\n\n.hcContentContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n}\n\n.hcTxtColorGreyMid {\n    color: #666666;\n}\n\n.hcSmallTxt {\n    font-size: 0.85rem;\n}\n\n.hcBasicSideMargin {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n\n.hcMarginBottom1 {\n    margin-bottom: 1rem;\n}\n\n.hcMarginBottom2 {\n    margin-bottom: 2rem;\n}\n\n.hcResultsHeader {\n    display: flex;\n    justify-content: space-between;\n}\n\n.hcContentContainer > * {\n    width: 100%;\n    max-width: 1200px;\n}\n\n.hcLayoutFacet-Result {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n}\n\n.hcLayoutFacets {\n    width: 100%;\n}\n\n.hcLayoutResults {\n    width: 100%;\n}\n\n.hcLayoutFacetsToggel {\n    display: flex;\n    height: 230px;\n    flex-direction: row;\n    overflow-x: auto;\n    background-color: #fafafa;\n}\n\n.hcLayoutFacetsToggel div {\n    width: 250px;\n    margin-right: 3rem;\n}\n\n@media (min-width: 800px) {\n    .hcLayoutFacet-Result {\n        flex-direction: row;\n    }\n\n    .hcLayoutFacets {\n        width: 350px;\n    }\n\n    .hcLayoutResults {\n        width: calc(100% - 350px);\n    }\n\n    .hcLayoutFacetsToggel {\n        display: block;\n        overflow-x: none;\n        height: auto;\n        flex-direction: column;\n        background: none;\n    }\n\n    .hcLayoutFacetsToggel div {\n        width: 100%;\n        margin-right: auto;\n    }\n}\n\n.hcFacet {\n    margin-bottom: 1rem;\n    max-width: 250px;\n    font-size: 0.85rem;\n}\n\n.hcFacetItems {\n    display: flex;\n    flex-direction: column;\n}\n\n.hcFacetItem {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.hcFacetItem .hcFacetItemSpan {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height: 15px;\n}\n\n.hcFacetItem .hcFacetItemSpan input[type=checkbox] {\n    width: 15px;\n    background-color: #eee090;\n}\n\n.hcFacetItemSelected {\n    font-weight: 700;\n}\n\n.hcFacetTitle {\n    text-transform: uppercase;\n    font-size: 0.85rem;\n    font-weight: 700;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    cursor: pointer;\n}\n\n.hcFacetCount {\n    color: #666666;\n}\n\n.hcFacetSearch {\n    display: flex;\n    justify-content: space-between;\n}\n\n.hcFacetSearch input {\n    border-radius: 4px 0 0 4px;\n    border-right: 0;\n}\n\n.hcFacetSearch button {\n    margin: 0;\n    border-radius: 0 4px 4px 0;\n}\n\n.hcSelectedFacet {\n    font-size: 0.85rem;\n    padding: 0.2rem 0.5rem;\n    background-color: #f6f6f6;\n    border-radius: 3px;\n    margin: 0 0.5rem 0.5rem 0;\n    cursor: pointer;\n}\n\n.hcSelectedFacet:after {\n    margin-left: 0.3rem;\n    opacity: 0.4;\n}\n\n.hcSelectedFacetType {\n    color: rgba(0, 0, 0, 0.4);\n    font-style: italic;\n    margin-right: 0.3rem;\n}\n\n.hcFacetFilter input {\n    padding: 0.3rem;\n    font-size: 0.85rem;\n    height: auto;\n    border: 1px solid #ebebeb;\n}\n\n.hcFacetFilter input::placeholder {\n    font-style: italic;\n    color: rgba(0, 0, 0, 0.4);\n}\n\n.hcFacetHelp {\n    display: none;\n    position: absolute;\n    background-color: #25a39a;\n    padding: 0.5rem;\n    width: 250px;\n}\n\n.hcPagination {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n}\n\n.hcPagination > * {\n    margin: 0 0.5rem;\n}\n\n.hcPagination a {\n    padding: 0.5rem;\n}\n\n.hcTxtColorGreyMid {\n    color: #999999;\n}\n\n.hcSmallTxt {\n    font-size: 0.9rem;\n}\n\n.hcClickable {\n    color: #0087d4;\n    cursor: pointer;\n    display: inline;\n}\n\n.hcPageSelector {\n    height: 36px;\n    font-size: 12px !important;\n}\n\n.hcFacetItem {\n    cursor: pointer;\n}\n\n.hcFacetReset {\n    float: right;\n}\n\n.hcFacetValues {\n    margin-right: 4px;\n}\n');export{v as BrowserBase,p as Detail,f as FilteredListFacet,u as FreeTextFacet,g as ListFacet,d as Search,h as createDetailLoader,m as createSearchLoader};
