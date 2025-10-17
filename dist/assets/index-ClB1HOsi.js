import{cr as d,cs as c,ct as m,cu as r,cv as f,cw as v,cy as y,cz as b,cx as h,cA as g,cB as w}from"./index-BW9rm6a1.js";const x=d`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([data-error='true']) > input {
    color: ${({tokens:t})=>t.core.textError};
  }

  :host([data-error='false']) > input {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  input {
    background: transparent;
    height: auto;
    box-sizing: border-box;
    color: ${({tokens:t})=>t.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: ${({textSize:t})=>t.h4};
    caret-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    line-height: ${({typography:t})=>t["h4-regular-mono"].lineHeight};
    letter-spacing: ${({typography:t})=>t["h4-regular-mono"].letterSpacing};
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  :host([data-width-variant='auto']) input {
    width: 100%;
  }

  :host([data-width-variant='fit']) input {
    width: 1ch;
  }

  .wui-input-amount-fit-mirror {
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-size: var(--local-font-size);
    line-height: 130%;
    letter-spacing: -1.28px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-input-amount-fit-width {
    display: inline-block;
    position: relative;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }
`;var a=function(t,e,n,s){var p=arguments.length,o=p<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,n):s,u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,n,s);else for(var l=t.length-1;l>=0;l--)(u=t[l])&&(o=(p<3?u(o):p>3?u(e,n,o):u(e,n))||o);return p>3&&o&&Object.defineProperty(e,n,o),o};let i=class extends v{constructor(){super(...arguments),this.inputElementRef=y(),this.disabled=!1,this.value="",this.placeholder="0",this.widthVariant="auto",this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize="h4",this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty("--local-font-size",b.textSize[this.fontSize]),this.resizeInput()}render(){var e;return this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),(e=this.inputElementRef)!=null&&e.value&&this.value&&(this.inputElementRef.value.value=this.value),this.widthVariant==="auto"?this.inputTemplate():h`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `}inputTemplate(){return h`<input
      ${g(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=w.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if(this.widthVariant==="fit"){const e=this.inputElementRef.value;if(e){const n=e.previousElementSibling;n&&(n.textContent=e.value||"0",e.style.width=`${n.offsetWidth}px`)}}}};i.styles=[c,m,x];a([r({type:Boolean})],i.prototype,"disabled",void 0);a([r({type:String})],i.prototype,"value",void 0);a([r({type:String})],i.prototype,"placeholder",void 0);a([r({type:String})],i.prototype,"widthVariant",void 0);a([r({type:Number})],i.prototype,"maxDecimals",void 0);a([r({type:Number})],i.prototype,"maxIntegers",void 0);a([r({type:String})],i.prototype,"fontSize",void 0);a([r({type:Boolean})],i.prototype,"error",void 0);i=a([f("wui-input-amount")],i);
