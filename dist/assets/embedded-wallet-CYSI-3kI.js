import{b as U,i as h,M as k,O as H,x as c,p as V,T as D,Z as F,a as f,c as R,r as P,e as M,D as E,$ as w,j as $,m as I,B as z,y as C,l as _,W as A,k as Y,a0 as K,R as G}from"./web3-Jk9Si5VG.js";import{r as y,n as l,o as L,e as X,H as T,a as q}from"./index-CDPAe0jG.js";import"./charts-BK1r30At.js";import"./vendor-CpL4RcAy.js";const Z=U`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var B=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};const N=600,W=360,Q=64;let S=class extends h{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(k.subscribeKey("open",t=>{t||this.onHideIframe()}),k.subscribeKey("shake",t=>{t?this.iframe.style.animation="w3m-shake 500ms var(--apkt-easings-ease-out-power-2)":this.iframe.style.animation="none"}))}disconnectedCallback(){var t;this.onHideIframe(),this.unsubscribe.forEach(i=>i()),(t=this.bodyObserver)==null||t.unobserve(window.document.body)}async firstUpdated(){var i;await this.syncTheme(),this.iframe.style.display="block";const t=(i=this==null?void 0:this.renderRoot)==null?void 0:i.querySelector("div");this.bodyObserver=new ResizeObserver(n=>{var s,a;const r=(s=n==null?void 0:n[0])==null?void 0:s.contentBoxSize,o=(a=r==null?void 0:r[0])==null?void 0:a.inlineSize;this.iframe.style.height=`${N}px`,t.style.height=`${N}px`,H.state.enableEmbedded?this.updateFrameSizeForEmbeddedMode():o&&o<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset",this.onShowIframe()):(this.iframe.style.width=`${W}px`,this.iframe.style.left=`calc(50% - ${W/2}px)`,this.iframe.style.top=`calc(50% - ${N/2}px + ${Q/2}px)`,this.iframe.style.bottom="unset",this.onShowIframe())}),this.bodyObserver.observe(window.document.body)}render(){return c`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){const t=window.innerWidth<=430;this.ready=!0,this.iframe.style.animation=t?"w3m-iframe-zoom-in-mobile 200ms var(--apkt-easings-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--apkt-easings-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--apkt-easings-ease-out-power-2)"}async syncTheme(){const t=V.getAuthConnector();if(t){const i=D.getSnapshot().themeMode,n=D.getSnapshot().themeVariables;await t.provider.syncTheme({themeVariables:n,w3mThemeVariables:F(n,i)})}}async updateFrameSizeForEmbeddedMode(){var n;const t=(n=this==null?void 0:this.renderRoot)==null?void 0:n.querySelector("div");await new Promise(r=>{setTimeout(r,300)});const i=this.getBoundingClientRect();t.style.width="100%",this.iframe.style.left=`${i.left}px`,this.iframe.style.top=`${i.top}px`,this.iframe.style.width=`${i.width}px`,this.iframe.style.height=`${i.height}px`,this.onShowIframe()}};S.styles=Z;B([y()],S.prototype,"ready",void 0);S=B([f("w3m-approve-transaction-view")],S);const J=R`
  a {
    border: none;
    border-radius: ${({borderRadius:e})=>e[20]};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, box-shadow, border;
  }

  /* -- Variants --------------------------------------------------------------- */
  a[data-type='success'] {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    color: ${({tokens:e})=>e.core.textSuccess};
  }

  a[data-type='error'] {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  a[data-type='warning'] {
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
    color: ${({tokens:e})=>e.core.textWarning};
  }

  /* -- Sizes --------------------------------------------------------------- */
  a[data-size='sm'] {
    height: 24px;
  }

  a[data-size='md'] {
    height: 28px;
  }

  a[data-size='lg'] {
    height: 32px;
  }

  a[data-size='sm'] > wui-image,
  a[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  a[data-size='md'] > wui-image,
  a[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  a[data-size='lg'] > wui-image,
  a[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
    padding-right: ${({spacing:e})=>e[1]};
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[3]};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    a[data-type='success']:not(:disabled):hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({tokens:e})=>e.core.borderSuccess};
    }

    a[data-type='error']:not(:disabled):hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({tokens:e})=>e.core.borderError};
    }

    a[data-type='warning']:not(:disabled):hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
      box-shadow: 0px 0px 0px 1px ${({tokens:e})=>e.core.borderWarning};
    }
  }

  a[data-type='success']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({tokens:e})=>e.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  a[data-type='error']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({tokens:e})=>e.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  a[data-type='warning']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${({tokens:e})=>e.core.backgroundAccentPrimary},
      0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  a:disabled {
    opacity: 0.5;
  }
`;var g=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};const ee={sm:"md-regular",md:"lg-regular",lg:"lg-regular"},te={success:"sealCheck",error:"warning",warning:"exclamationCircle"};let d=class extends h{constructor(){super(...arguments),this.type="success",this.size="md",this.imageSrc=void 0,this.disabled=!1,this.href="",this.text=void 0}render(){return c`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-type=${this.type}
        data-size=${this.size}
      >
        ${this.imageTemplate()}
        <wui-text variant=${ee[this.size]} color="inherit">${this.text}</wui-text>
      </a>
    `}imageTemplate(){return this.imageSrc?c`<wui-image src=${this.imageSrc} size="inherit"></wui-image>`:c`<wui-icon
      name=${te[this.type]}
      weight="fill"
      color="inherit"
      size="inherit"
      class="image-icon"
    ></wui-icon>`}};d.styles=[P,M,J];g([l()],d.prototype,"type",void 0);g([l()],d.prototype,"size",void 0);g([l()],d.prototype,"imageSrc",void 0);g([l({type:Boolean})],d.prototype,"disabled",void 0);g([l()],d.prototype,"href",void 0);g([l()],d.prototype,"text",void 0);d=g([f("wui-semantic-chip")],d);var ie=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let j=class extends h{render(){return c`
      <wui-flex flexDirection="column" alignItems="center" gap="5" padding="5">
        <wui-text variant="md-regular" color="primary">Follow the instructions on</wui-text>
        <wui-semantic-chip
          icon="externalLink"
          variant="fill"
          text=${E.SECURE_SITE_DASHBOARD}
          href=${E.SECURE_SITE_DASHBOARD}
          imageSrc=${E.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-semantic-chip>
        <wui-text variant="sm-regular" color="secondary">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};j=ie([f("w3m-upgrade-wallet-view")],j);const oe=R`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[4]};
  }

  .name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      cursor: pointer;
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
      border-radius: ${({borderRadius:e})=>e[6]};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button:focus-visible:enabled {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`;var v=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let m=class extends h{constructor(){super(...arguments),this.name="",this.registered=!1,this.loading=!1,this.disabled=!1}render(){return c`
      <button ?disabled=${this.disabled}>
        <wui-text class="name" color="primary" variant="md-regular">${this.name}</wui-text>
        ${this.templateRightContent()}
      </button>
    `}templateRightContent(){return this.loading?c`<wui-loading-spinner size="lg" color="primary"></wui-loading-spinner>`:this.registered?c`<wui-tag variant="info" size="sm">Registered</wui-tag>`:c`<wui-tag variant="success" size="sm">Available</wui-tag>`}};m.styles=[P,M,oe];v([l()],m.prototype,"name",void 0);v([l({type:Boolean})],m.prototype,"registered",void 0);v([l({type:Boolean})],m.prototype,"loading",void 0);v([l({type:Boolean})],m.prototype,"disabled",void 0);m=v([f("wui-account-name-suggestion-item")],m);const ne=R`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .base-name {
    position: absolute;
    right: ${({spacing:e})=>e[4]};
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[1]};
  }
`;var x=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let p=class extends h{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return c`
      <wui-input-text
        value=${L(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        icon="search"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      ></wui-input-text>
    `}};p.styles=[P,ne];x([l()],p.prototype,"errorMessage",void 0);x([l({type:Boolean})],p.prototype,"disabled",void 0);x([l()],p.prototype,"value",void 0);x([l({type:Boolean})],p.prototype,"loading",void 0);x([l({attribute:!1})],p.prototype,"onKeyDown",void 0);p=x([f("wui-ens-input")],p);const re=R`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .suggestion:hover:not(:disabled) {
    cursor: pointer;
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[6]};
    padding: ${({spacing:e})=>e[4]};
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 22px;
    transform: translateY(-50%);
    right: 10px;
  }
`;var b=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let u=class extends h{constructor(){var t;super(),this.formRef=X(),this.usubscribe=[],this.name="",this.error="",this.loading=w.state.loading,this.suggestions=w.state.suggestions,this.profileName=(t=$.getAccountData())==null?void 0:t.profileName,this.onDebouncedNameInputChange=I.debounce(i=>{i.length<4?this.error="Name must be at least 4 characters long":T.isValidReownName(i)?(this.error="",w.getSuggestions(i)):this.error="The value is not a valid username"}),this.usubscribe.push(w.subscribe(i=>{this.suggestions=i.suggestions,this.loading=i.loading}),$.subscribeChainProp("accountState",i=>{this.profileName=i==null?void 0:i.profileName,i!=null&&i.profileName&&(this.error="You already own a name")}))}firstUpdated(){var t;(t=this.formRef.value)==null||t.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){var t;super.disconnectedCallback(),this.usubscribe.forEach(i=>i()),(t=this.formRef.value)==null||t.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["1","3","4","3"]}
      >
        <form ${q(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){const t=this.suggestions.find(n=>{var r,o;return((o=(r=n.name)==null?void 0:r.split("."))==null?void 0:o[0])===this.name&&n.registered});if(this.loading)return c`<wui-loading-spinner
        class="input-loading-spinner"
        color="secondary"
      ></wui-loading-spinner>`;const i=`${this.name}${z.WC_NAME_SUFFIX}`;return c`
      <wui-icon-link
        ?disabled=${!!t}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${t?"default":"accent-primary"}
        @click=${()=>this.onSubmitName(i)}
      >
      </wui-icon-link>
    `}onNameInputChange(t){const i=T.validateReownName(t.detail||"");this.name=i,this.onDebouncedNameInputChange(i)}onKeyDown(t){t.key.length===1&&!T.isValidReownName(t.key)&&t.preventDefault()}templateSuggestions(){return!this.name||this.name.length<4||this.error?null:c`<wui-flex flexDirection="column" gap="1" alignItems="center">
      ${this.suggestions.map(t=>c`<wui-account-name-suggestion-item
            name=${t.name}
            ?registered=${t.registered}
            ?loading=${this.loading}
            ?disabled=${t.registered||this.loading}
            data-testid="account-name-suggestion"
            @click=${()=>this.onSubmitName(t.name)}
          ></wui-account-name-suggestion-item>`)}
    </wui-flex>`}isAllowedToSubmit(t){var r;const i=(r=t.split("."))==null?void 0:r[0],n=this.suggestions.find(o=>{var s,a;return((a=(s=o.name)==null?void 0:s.split("."))==null?void 0:a[0])===i&&o.registered});return!this.loading&&!this.error&&!this.profileName&&i&&w.validateName(i)&&!n}async onSubmitName(t){try{if(!this.isAllowedToSubmit(t))return;C.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:_($.state.activeChain)===A.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t}}),await w.registerName(t),C.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:_($.state.activeChain)===A.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t}})}catch(i){Y.showError(i.message),C.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:_($.state.activeChain)===A.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:t,error:I.parseError(i)}})}}onEnterKey(t){if(t.key==="Enter"&&this.name&&this.isAllowedToSubmit(this.name)){const i=`${this.name}${z.WC_NAME_SUFFIX}`;this.onSubmitName(i)}}};u.styles=re;b([l()],u.prototype,"errorMessage",void 0);b([y()],u.prototype,"name",void 0);b([y()],u.prototype,"error",void 0);b([y()],u.prototype,"loading",void 0);b([y()],u.prototype,"suggestions",void 0);b([y()],u.prototype,"profileName",void 0);u=b([f("w3m-register-account-name-view")],u);const se=U`
  .continue-button-container {
    width: 100%;
  }
`;var ae=function(e,t,i,n){var r=arguments.length,o=r<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,i):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o};let O=class extends h{render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0","0","4","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{I.openHref(K.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return c` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0","6","0","6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box size="xl" color="success" icon="checkmark"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="md-medium" color="primary">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return c`<wui-flex
      .padding=${["0","4","0","4"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){G.replace("Account")}};O.styles=se;O=ae([f("w3m-register-account-name-success-view")],O);export{S as W3mApproveTransactionView,O as W3mRegisterAccountNameSuccess,u as W3mRegisterAccountNameView,j as W3mUpgradeWalletView};
