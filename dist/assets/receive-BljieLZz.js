import{cr as y,cs as v,ct as N,cu as k,cv as $,cw as C,cx as u,cN as c,cH as h,d4 as m,cB as R,d5 as x,cY as A,cL as S,cM as I,cG as T,cP as O,d6 as f}from"./index-BW9rm6a1.js";const _=y`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[4]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    border: none;
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:active:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-text {
    flex: 1;
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-flex {
    width: auto;
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e["01"]};
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .network-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[4]};
    overflow: hidden;
    margin-left: -8px;
  }

  .network-icon:first-child {
    margin-left: 0px;
  }

  .network-icon:after {
    position: absolute;
    inset: 0;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }
`;var b=function(e,t,o,i){var s=arguments.length,r=s<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(s<3?n(r):s>3?n(t,o,r):n(t,o))||r);return s>3&&r&&Object.defineProperty(t,o,r),r};let p=class extends C{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return u`
      <button>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
        <wui-flex>
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="inherit"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const t=this.networkImages.slice(0,5);return u` <wui-flex class="networks">
      ${t==null?void 0:t.map(o=>u` <wui-flex class="network-icon"> <wui-image src=${o}></wui-image> </wui-flex>`)}
    </wui-flex>`}};p.styles=[v,N,_];b([k({type:Array})],p.prototype,"networkImages",void 0);b([k()],p.prototype,"text",void 0);p=b([$("wui-compatible-network")],p);const E=y`
  wui-compatible-network {
    margin-top: ${({spacing:e})=>e[4]};
    width: 100%;
  }

  wui-qr-code {
    width: unset !important;
    height: unset !important;
  }

  wui-icon {
    align-items: normal;
  }
`;var w=function(e,t,o,i){var s=arguments.length,r=s<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,o):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(s<3?n(r):s>3?n(t,o,r):n(t,o))||r);return s>3&&r&&Object.defineProperty(t,o,r),r};let d=class extends C{constructor(){var t,o;super(),this.unsubscribe=[],this.address=(t=c.getAccountData())==null?void 0:t.address,this.profileName=(o=c.getAccountData())==null?void 0:o.profileName,this.network=c.state.activeCaipNetwork,this.unsubscribe.push(c.subscribeChainProp("accountState",i=>{i?(this.address=i.address,this.profileName=i.profileName):h.showError("Account not found")}),c.subscribeKey("activeCaipNetwork",i=>{i!=null&&i.id&&(this.network=i)}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const t=m.getNetworkImage(this.network);return u` <wui-flex
      flexDirection="column"
      .padding=${["0","4","4","4"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${R.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${t||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["4","0","0","0"]}
        alignItems="center"
        gap="4"
      >
        <wui-qr-code
          size=${232}
          theme=${x.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${A(x.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="lg-regular" color="primary" align="center">
          Copy your address or scan this QR code
        </wui-text>
        <wui-button @click=${this.onCopyClick.bind(this)} size="sm" variant="neutral-secondary">
          <wui-icon slot="iconLeft" size="sm" color="inherit" name="copy"></wui-icon>
          <wui-text variant="md-regular" color="inherit">Copy address</wui-text>
        </wui-button>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){var a;const t=c.getAllRequestedCaipNetworks(),o=c.checkIfSmartAccountEnabled(),i=c.state.activeCaipNetwork,s=t.filter(l=>(l==null?void 0:l.chainNamespace)===(i==null?void 0:i.chainNamespace));if(S(i==null?void 0:i.chainNamespace)===I.ACCOUNT_TYPES.SMART_ACCOUNT&&o)return i?u`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[m.getNetworkImage(i)??""]}
      ></wui-compatible-network>`:null;const n=((a=s==null?void 0:s.filter(l=>{var g;return(g=l==null?void 0:l.assets)==null?void 0:g.imageId}))==null?void 0:a.slice(0,5)).map(m.getNetworkImage).filter(Boolean);return u`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${n}
    ></wui-compatible-network>`}onReceiveClick(){T.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(O.copyToClopboard(this.address),h.showSuccess("Address copied"))}catch{h.showError("Failed to copy")}}};d.styles=E;w([f()],d.prototype,"address",void 0);w([f()],d.prototype,"profileName",void 0);w([f()],d.prototype,"network",void 0);d=w([$("w3m-wallet-receive-view")],d);export{d as W3mWalletReceiveView};
