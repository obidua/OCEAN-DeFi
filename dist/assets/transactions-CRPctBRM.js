import{b as f,i as a,x as d,a as p}from"./web3-BUWRdaQP.js";import"./index-030keZS_.js";import"./charts-BK1r30At.js";import"./vendor-CpL4RcAy.js";const u=f`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;var w=function(n,t,i,o){var r=arguments.length,e=r<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(n,t,i,o);else for(var s=n.length-1;s>=0;s--)(l=n[s])&&(e=(r<3?l(e):r>3?l(t,i,e):l(t,i))||e);return r>3&&e&&Object.defineProperty(t,i,e),e};let c=class extends a{render(){return d`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="3">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};c.styles=u;c=w([p("w3m-transactions-view")],c);export{c as W3mTransactionsView};
