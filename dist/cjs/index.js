"use strict";var e=require("react"),n=require("react-router-dom");function t(e,n,t){return async({params:a})=>{let c={searchvalues:[],page:1,page_length:n||500,sortorder:t||"title"};if(a.code){const e=JSON.parse(window.atob(a.code));c={searchvalues:e.searchvalues,page:e.page,page_length:n||500,sortorder:t||"title"}}const r=await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(c)});return{searchStruc:c,result:await r.json()}}}function a(t){const a=n.useNavigate(),c=n.useNavigation(),{searchStruc:r,result:l}=n.useLoaderData();function i(e){a((t.noIndexPage?"/":"/search/")+window.btoa(JSON.stringify(e))),window.scroll(0,0)}document.title=`Search | ${t.title}`;return e.createElement("div",{className:"hcContentContainer"},e.createElement("div",{className:"hcBasicSideMargin hcMarginBottom1"},e.createElement("h1",null,"Search")),e.createElement("div",{className:"hcLayoutFacet-Result hcBasicSideMargin"},e.createElement("div",{className:"hcLayoutFacets"},e.createElement("div",{className:"hcLayoutFacetsToggel"},e.createElement(t.facetsComponent,{sendCandidateHandler:e=>{if(0===r.searchvalues.length)r.searchvalues=[{name:e.facet,field:e.field,values:[e.candidate]}];else if("object"==typeof r.searchvalues){let n=!1;r.searchvalues.forEach((t=>{t.name===e.facet&&(n=!0,t.values.includes(e.candidate)||t.values.push(e.candidate))})),n||r.searchvalues.push({name:e.facet,field:e.field,values:[e.candidate]})}i({...r,page:1})}}))),e.createElement("div",{className:"hcLayoutResults"},e.createElement("div",{className:"hcResultsHeader hcMarginBottom1"},t.withPaging?l.amount>9999?e.createElement("div",null,l.amount,"+ results, page ",r.page," of ",l.pages," pages"):e.createElement("div",null,l.amount," results, page ",r.page," of ",l.pages," pages"):e.createElement("div",null,l.amount," items found")),e.createElement("div",{className:"hcMarginBottom2"},e.createElement("div",{className:"hcSmallTxt hcTxtColorGreyMid"},"Selected facets:",e.createElement("span",{className:"hcFacetReset hcClickable",onClick:function(){i({...r,searchvalues:[],page:1})}},"Reset facets")),0===r.searchvalues.length?e.createElement("span",{className:"hcSelectedFacet"},e.createElement("span",{className:"hcSelectedFacetType"},"None")):r.searchvalues.map((n=>e.createElement("span",{className:"hcSelectedFacet"},e.createElement("span",{className:"hcSelectedFacetType"},n.name,": "),n.values.map(((t,a)=>e.createElement("div",{className:"hcFacetValues",key:a,onClick:()=>{return e=n.name,a=t,"object"==typeof r.searchvalues&&(r.searchvalues.forEach((n=>{n.name===e&&(n.values=n.values.filter((e=>e!==a)))})),r.searchvalues=r.searchvalues.filter((e=>e.values.length>0)),0===r.searchvalues.length&&(r.searchvalues=[])),void i({...r,page:1});var e,a}},t," ","[x]"))))))),t.headersElement,"loading"===c.state?e.createElement("div",{className:"hcResultListLoading"},"Loading..."):e.createElement(e.Fragment,null,e.createElement("div",null,l.items.map(((n,a)=>e.createElement(t.resultItemComponent,{item:n,key:a})))),t.withPaging&&l.amount>r.page_length&&e.createElement("div",{className:"hcPagination"},r.page<2?e.createElement("div",null):e.createElement("div",{className:"hcClickable",onClick:function(){r.page>0&&i({...r,page:r.page-1})}},"← Previous"),e.createElement("div",{className:"hcClickable"},e.createElement("select",{className:"hcPageSelector",value:r.page,onChange:e=>{return n=Number(e.target.value),void i({...r,page:n});var n}},Array.from({length:l.pages},((n,t)=>e.createElement("option",{key:t+1,value:t+1},t+1))))),r.page<l.pages?e.createElement("div",{className:"hcClickable",onClick:function(){i({...r,page:r.page+1})}},"Next →"):e.createElement("div",null))))))}const c=e=>async({params:n})=>fetch(e(n.id));function r(t){const a=n.useNavigation(),c=n.useLoaderData();return document.title=`Item | ${t.title}`,"loading"===a.state?e.createElement("div",{className:"hcContentContainer"},e.createElement("div",null,"Loading")):e.createElement(t.detailComponent,{data:c})}function l(e,n){void 0===n&&(n={});var t=n.insertAt;if(e&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.type="text/css","top"===t&&a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c),c.styleSheet?c.styleSheet.cssText=e:c.appendChild(document.createTextNode(e))}}function i(t){return e.createElement(e.Fragment,null,e.createElement("div",{className:"hcContentContainer pageHeader"},e.createElement("header",{className:"hcPageHeaderSimple hcBasicSideMargin"},e.createElement("div",{className:"hcBrand"},e.createElement(n.Link,{to:"/"},e.createElement("div",{className:"hcTitle"},t.title))))),e.createElement("div",{className:"hcContentContainer pageHeaderAfter"}))}l(".hcPageHeaderSimple {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    font-size: 0.9rem;\n    width: 100%;\n}\n\n.hcPageHeaderSimple > * {\n    height: 100%;\n    display: flex;\n    align-items: center;\n}\n\n.hcBrand {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    height: 100%;\n}\n\n.hcTitle {\n    display: inline-block;\n    font-weight: bold;\n    font-size: 24px;\n    padding-top: 18px;\n}\n\n.pageHeader {\n    margin-bottom: 1rem;\n    background-color: #082045;\n    color: #fff;\n}\n\n.pageHeader a {\n    color: #fff;\n}\n\n.pageHeaderAfter {\n    margin-bottom: 5rem;\n    border-bottom: 1px solid #ededed;\n}");function o(t){return document.title=t.title,e.createElement("div",{className:"hcContentContainer"},e.createElement("h2",null,t.title),t.description&&e.createElement("p",null,t.description),e.createElement(n.Link,{to:"search/"},"Browse"))}function s(t){return e.createElement(e.Fragment,null,t.header,e.createElement(n.Outlet,null),t.footer)}l('@import url("https://fonts.googleapis.com/css?family=Roboto:300,300i,700,700i");\n\nhtml,\nbody {\n    padding: 0;\n    margin: 0;\n}\n\n* {\n    box-sizing: border-box;\n}\n\na {\n    color: #0087d4;\n    text-decoration: none;\n}\n\nhtml {\n    font-size: 100%;\n}\n\nbody {\n    font-family: "Roboto", sans-serif;\n    font-weight: 300;\n    font-size: 18px;\n    line-height: 140%;\n    font-style: normal;\n    background-color: #fff;\n    color: #3e3e3e;\n    margin: 0;\n    padding: 0;\n}\n\nh1 {\n    font-size: 1.5em;\n    line-height: 130%;\n    font-weight: 700;\n}\n\nh2 {\n    font-size: 1.3em;\n    line-height: 130%;\n    font-weight: 700;\n}\n\nh1, h2 {\n    margin-top: 0;\n    margin-bottom: 0.3em;\n}\n\n@media (min-width: 600px) {\n    body {\n        font-size: 18px;\n        line-height: 150%;\n    }\n\n    h1 {\n        font-size: 2em;\n    }\n\n    h1, h2 {\n        line-height: 150%;\n    }\n\n    span.hcSelectedFacet, span.hcSelectedFacetType {\n        display: flex;\n        flex-direction: row;\n        align-items: baseline;\n        padding-right: 1rem;\n    }\n}\n\n.hcContentContainer p {\n    margin-top: 0;\n    margin-bottom: 1em;\n}\n\n.hcFacet button, .hcButton {\n    font-size: 0.7rem;\n    padding: 0.5rem;\n    border-radius: 4px;\n    background-color: rgba(0, 0, 0, 0.07);\n    border: 1px solid rgba(0, 0, 0, 0.09);\n    cursor: pointer;\n    font-weight: 700;\n    margin: 0 0.3rem;\n    max-height: 40px;\n}\n\n.hcFacet input, .hcPageSelector select {\n    width: 100%;\n    padding: 0.5rem;\n    border: 1px solid #e1ebf3;\n    border-radius: 4px;\n    font-size: 1rem;\n    font-weight: 300;\n    color: #3e3e3e;\n    height: 40px;\n}\n\n.hcFacetSearch input::placeholder {\n    color: gray;\n    font-style: italic;\n    font-size: 0.85rem;\n}\n\n.hcContentContainer {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n}\n\n.hcTxtColorGreyMid {\n    color: #666666;\n}\n\n.hcSmallTxt {\n    font-size: 0.85rem;\n}\n\n.hcBasicSideMargin {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n\n.hcMarginBottom1 {\n    margin-bottom: 1rem;\n}\n\n.hcMarginBottom2 {\n    margin-bottom: 2rem;\n}\n\n.hcResultsHeader {\n    display: flex;\n    justify-content: space-between;\n}\n\n.hcContentContainer > * {\n    width: 100%;\n    max-width: 1200px;\n}\n\n.hcLayoutFacet-Result {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n}\n\n.hcLayoutFacets {\n    width: 100%;\n}\n\n.hcLayoutResults {\n    width: 100%;\n}\n\n.hcLayoutFacetsToggel {\n    display: flex;\n    height: 230px;\n    flex-direction: row;\n    overflow-x: auto;\n    background-color: #fafafa;\n}\n\n.hcLayoutFacetsToggel div {\n    width: 250px;\n    margin-right: 3rem;\n}\n\n@media (min-width: 800px) {\n    .hcLayoutFacet-Result {\n        flex-direction: row;\n    }\n\n    .hcLayoutFacets {\n        width: 350px;\n    }\n\n    .hcLayoutResults {\n        width: calc(100% - 350px);\n    }\n\n    .hcLayoutFacetsToggel {\n        display: block;\n        overflow-x: none;\n        height: auto;\n        flex-direction: column;\n        background: none;\n    }\n\n    .hcLayoutFacetsToggel div {\n        width: 100%;\n        margin-right: auto;\n    }\n}\n\n.hcFacet {\n    margin-bottom: 1rem;\n    max-width: 250px;\n    font-size: 0.85rem;\n}\n\n.hcFacetItems {\n    display: flex;\n    flex-direction: column;\n}\n\n.hcFacetItem {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.hcFacetItem .hcFacetItemSpan {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    height: 15px;\n}\n\n.hcFacetItem .hcFacetItemSpan input[type=checkbox] {\n    width: 15px;\n    background-color: #eee090;\n}\n\n.hcFacetItemSelected {\n    font-weight: 700;\n}\n\n.hcFacetTitle {\n    text-transform: uppercase;\n    font-size: 0.85rem;\n    font-weight: 700;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    cursor: pointer;\n}\n\n.hcFacetCount {\n    color: #666666;\n}\n\n.hcFacetSearch {\n    display: flex;\n    justify-content: space-between;\n}\n\n.hcFacetSearch input {\n    border-radius: 4px 0 0 4px;\n    border-right: 0;\n}\n\n.hcFacetSearch button {\n    margin: 0;\n    border-radius: 0 4px 4px 0;\n}\n\n.hcSelectedFacet {\n    font-size: 0.85rem;\n    padding: 0.2rem 0.5rem;\n    background-color: #f6f6f6;\n    border-radius: 3px;\n    margin: 0 0.5rem 0.5rem 0;\n    cursor: pointer;\n}\n\n.hcSelectedFacet:after {\n    margin-left: 0.3rem;\n    opacity: 0.4;\n}\n\n.hcSelectedFacetType {\n    color: rgba(0, 0, 0, 0.4);\n    font-style: italic;\n    margin-right: 0.3rem;\n}\n\n.hcFacetFilter input {\n    padding: 0.3rem;\n    font-size: 0.85rem;\n    height: auto;\n    border: 1px solid #ebebeb;\n}\n\n.hcFacetFilter input::placeholder {\n    font-style: italic;\n    color: rgba(0, 0, 0, 0.4);\n}\n\n.hcFacetHelp {\n    display: none;\n    position: absolute;\n    background-color: #25a39a;\n    padding: 0.5rem;\n    width: 250px;\n}\n\n.hcPagination {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n}\n\n.hcPagination > * {\n    margin: 0 0.5rem;\n}\n\n.hcPagination a {\n    padding: 0.5rem;\n}\n\n.hcTxtColorGreyMid {\n    color: #999999;\n}\n\n.hcSmallTxt {\n    font-size: 0.9rem;\n}\n\n.hcClickable {\n    color: #0087d4;\n    cursor: pointer;\n    display: inline;\n}\n\n.hcPageSelector {\n    height: 36px;\n    font-size: 12px !important;\n}\n\n.hcFacetItem {\n    cursor: pointer;\n}\n\n.hcFacetReset {\n    float: right;\n}\n\n.hcFacetValues {\n    margin-right: 4px;\n}\n'),exports.BrowserBase=function(l){const d=t(l.searchUrl,l.pageLength,l.sortOrder),m=e.createElement(a,{title:l.title,noIndexPage:l.noIndexPage,withPaging:l.withPaging,facetsComponent:l.facetsComponent,resultItemComponent:l.resultItemComponent,headersElement:l.headersElement}),h={path:"/",element:e.createElement(s,{header:l.headerElement||e.createElement(i,{title:l.title}),footer:l.footerElement}),children:[...l.childRoutes||[],{index:!0,loader:l.noIndexPage?d:void 0,element:l.noIndexPage?m:l.rootElement||e.createElement(o,{title:l.title,description:l.description})},{path:l.noIndexPage?":code":"search/:code",loader:d,element:m},{path:"detail/:id",loader:c(l.getFetchUrl),element:e.createElement(r,{title:l.title,detailComponent:l.detailComponent})}]};return e.createElement(n.RouterProvider,{router:n.createBrowserRouter([h])})},exports.Detail=r,exports.FreeTextFacet=function(n){const[t,a]=e.useState(""),[c,r]=e.useState(!0);function l(){""!==t&&(n.add({facet:"Free text",field:"FREE_TEXT",candidate:t}),r(!c))}return e.useEffect((()=>{a("")}),[c]),e.createElement("div",{className:"hcFacet"},e.createElement("div",{className:"hcFacetTitle"},"Text search"),e.createElement("div",{className:"hcFacetSearch"},e.createElement("input",{type:"text",value:t,placeholder:"Press ENTER to search",onChange:function(e){a(e.currentTarget.value)},onKeyUp:function(e){"Enter"===e.key&&l()}}),e.createElement("button",{type:"button",name:"button",onClick:()=>{l()}},"Search")))},exports.ListFacet=function(n){const[t,a]=e.useState([]),[c,r]=e.useState(n.url+"?name="+n.field+"&amount=10"),[l,i]=e.useState(!0),[o,s]=e.useState(!0),[d,m]=e.useState(!0);return e.useEffect((()=>{!async function(){const e=await fetch(c),n=await e.json();a(n),i(!1)}()}),[c]),e.createElement("div",{className:"hcFacet"},e.createElement("div",{className:"hcFacetTitle",onClick:()=>m(!d)},e.createElement("span",null,n.name),e.createElement("span",{className:"hcIconHelp"},d?"+":"-")),!d&&e.createElement("div",{className:"hcFacetItems"},l?e.createElement("div",null,"Loading..."):e.createElement("div",null,t.map(((t,a)=>e.createElement("div",{key:a,className:"hcFacetItem",onClick:()=>{return e=t.key,void n.parentCallback({facet:n.name,field:n.field,candidate:e});var e}},e.createElement("div",{className:"checkBoxLabel"}," ",t.key," (",t.doc_count,")")))),e.createElement("div",{className:"hcClickable",onClick:function(){r(o?n.url+"?name="+n.field+"&amount=500":n.url+"?name="+n.field+"&amount=10"),s(!o)}},o?e.createElement("div",null,"More..."):e.createElement("div",null,"Less...")))))},exports.Search=a,exports.createDetailLoader=c,exports.createSearchLoader=t;
