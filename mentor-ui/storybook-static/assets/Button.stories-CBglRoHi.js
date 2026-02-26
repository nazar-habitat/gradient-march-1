import{R as E,j as e,r as j}from"./iframe-t51pLfio.js";import"./preload-helper-PPVm8Dsz.js";const L={xl:{height:"64px",paddingInline:"24px",paddingBlock:"20px",gap:"10px",borderRadius:"16px"},md:{height:"40px",paddingInline:"16px",paddingBlock:"10px",gap:"8px",borderRadius:"12px"},sm:{height:"32px",paddingInline:"12px",paddingBlock:"8px",gap:"6px",borderRadius:"8px"}},q={xl:"w-6 h-6",md:"w-5 h-5",sm:"w-5 h-5"},w={xl:"text-base font-semibold leading-6",md:"text-sm font-medium leading-5",sm:"text-[13px] font-medium leading-4"},W={default:"text-white",success:"text-[#26ea5d]",warning:"text-orange-500",error:"text-[#fa7054]"},A={default:"#5452f5",success:"#26ea5d",warning:"#ffae19",error:"#fa7054"};function M(r,a){r.matches(":focus-visible")&&(r.style.outline=`1.5px solid ${a}`,r.style.outlineOffset="2px")}function V(r){r.style.outline="none",r.style.outlineOffset="0px"}const n=E.forwardRef(({variant:r="primary",size:a="md",intent:h="default",leadingIcon:g,trailingIcon:f,disabled:z,className:I="",style:C,onFocus:F,onBlur:N,children:v,...T},P)=>{const k=r==="primary"?"#5452f5":A[h],D="relative inline-flex items-center justify-center cursor-pointer select-none transition-colors duration-150 disabled:cursor-not-allowed";let y="";r==="primary"&&(y=[w[a],"text-white","bg-purple-500 hover:bg-purple-600 active:bg-purple-700","disabled:bg-neutral-800 disabled:text-neutral-600"].join(" ")),r==="secondary"&&(y=[w[a],W[h],"bg-neutral-900 border border-neutral-800","hover:bg-neutral-850 active:bg-neutral-800","disabled:bg-transparent disabled:border-neutral-600 disabled:text-neutral-600"].join(" "));const B=q[a];return e.jsxs("button",{ref:P,disabled:z,style:{outline:"none",...L[a],...C},className:[D,y,I].filter(Boolean).join(" "),onFocus:s=>{M(s.currentTarget,k),F?.(s)},onBlur:s=>{V(s.currentTarget),N?.(s)},...T,children:[g&&e.jsx("span",{className:["shrink-0 inline-flex items-center justify-center",B].join(" "),"aria-hidden":"true",children:g}),v&&e.jsx("span",{className:"whitespace-nowrap",children:v}),f&&e.jsx("span",{className:["shrink-0 inline-flex items-center justify-center",B].join(" "),"aria-hidden":"true",children:f})]})});n.displayName="Button";n.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'xl' | 'md' | 'sm'",elements:[{name:"literal",value:"'xl'"},{name:"literal",value:"'md'"},{name:"literal",value:"'sm'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},intent:{required:!1,tsType:{name:"union",raw:"'default' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"Only applies to `secondary` — `primary` always uses purple",defaultValue:{value:"'default'",computed:!1}},leadingIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},trailingIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const t=({children:r,label:a})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[a&&e.jsx("span",{style:{color:"#636363",fontSize:12,width:56,flexShrink:0,textTransform:"capitalize"},children:a}),r]}),x=({children:r})=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:r}),b=r=>{const a=j.useRef(null);return j.useEffect(()=>{a.current?.focus()},[]),e.jsx(n,{ref:a,...r})},S=()=>e.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",width:"100%",height:"100%",children:e.jsx("path",{d:"M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z"})}),R=()=>e.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",width:"100%",height:"100%",children:e.jsx("path",{fillRule:"evenodd",d:"M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),X={title:"UI/Button",component:n,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{variant:{control:"select",options:["primary","secondary"]},size:{control:"select",options:["xl","md","sm"]},intent:{control:"select",options:["default","success","warning","error"]},disabled:{control:"boolean"},children:{control:"text"}}},i={args:{variant:"primary",size:"md",intent:"default",children:"Action",disabled:!1}},o={render:()=>e.jsxs(t,{children:[e.jsx(n,{variant:"primary",children:"Primary"}),e.jsx(n,{variant:"secondary",children:"Secondary"}),e.jsx(n,{variant:"secondary",intent:"success",children:"Success"}),e.jsx(n,{variant:"secondary",intent:"warning",children:"Warning"}),e.jsx(n,{variant:"secondary",intent:"error",children:"Error"})]})},l={render:()=>e.jsxs(t,{children:[e.jsx(n,{variant:"primary",size:"xl",children:"XLarge"}),e.jsx(n,{variant:"primary",size:"md",children:"Medium"}),e.jsx(n,{variant:"primary",size:"sm",children:"Small"})]})},c={name:"States · Primary",render:()=>e.jsxs(t,{children:[e.jsx(n,{variant:"primary",children:"Default"}),e.jsx(n,{variant:"primary",disabled:!0,children:"Disabled"})]})},d={name:"States · Secondary",render:()=>e.jsx(x,{children:["default","success","warning","error"].map(r=>e.jsxs(t,{label:r,children:[e.jsx(n,{variant:"secondary",intent:r,children:"Default"}),e.jsx(n,{variant:"secondary",intent:r,disabled:!0,children:"Disabled"})]},r))})},u={name:"States · Focus",render:()=>e.jsxs(x,{children:[e.jsx(t,{label:"primary",children:["xl","md","sm"].map(r=>e.jsx(b,{variant:"primary",size:r,children:"Action"},r))}),["default","success","warning","error"].map(r=>e.jsx(t,{label:r,children:["xl","md","sm"].map(a=>e.jsx(b,{variant:"secondary",intent:r,size:a,children:"Action"},a))},r))]})},m={name:"Layout · Icons",render:()=>e.jsx(x,{children:["xl","md","sm"].map(r=>e.jsxs(t,{label:r,children:[e.jsx(n,{size:r,children:"No icon"}),e.jsx(n,{size:r,leadingIcon:e.jsx(S,{}),children:"Leading"}),e.jsx(n,{size:r,trailingIcon:e.jsx(R,{}),children:"Trailing"}),e.jsx(n,{size:r,leadingIcon:e.jsx(S,{}),trailingIcon:e.jsx(R,{}),children:"Both"})]},r))})},p={name:"Full matrix",render:()=>e.jsx(x,{children:["xl","md","sm"].map(r=>e.jsxs(t,{label:r,children:[e.jsx(n,{variant:"primary",size:r,children:"Primary"}),e.jsx(n,{variant:"secondary",size:r,children:"Secondary"}),e.jsx(n,{variant:"secondary",size:r,intent:"success",children:"Success"}),e.jsx(n,{variant:"secondary",size:r,intent:"warning",children:"Warning"}),e.jsx(n,{variant:"secondary",size:r,intent:"error",children:"Error"})]},r))})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    intent: 'default',
    children: 'Action',
    disabled: false
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Row>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" intent="success">Success</Button>
      <Button variant="secondary" intent="warning">Warning</Button>
      <Button variant="secondary" intent="error">Error</Button>
    </Row>
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Row>
      <Button variant="primary" size="xl">XLarge</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="sm">Small</Button>
    </Row>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'States · Primary',
  render: () => <Row>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </Row>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'States · Secondary',
  render: () => <Col>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => <Row key={intent} label={intent}>
          <Button variant="secondary" intent={intent}>Default</Button>
          <Button variant="secondary" intent={intent} disabled>Disabled</Button>
        </Row>)}
    </Col>
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'States · Focus',
  render: () => <Col>
      <Row label="primary">
        {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => <FocusedButton key={size} variant="primary" size={size}>
            Action
          </FocusedButton>)}
      </Row>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => <Row key={intent} label={intent}>
          {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => <FocusedButton key={size} variant="secondary" intent={intent} size={size}>
              Action
            </FocusedButton>)}
        </Row>)}
    </Col>
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Layout · Icons',
  render: () => <Col>
      {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => <Row key={size} label={size}>
          <Button size={size}>No icon</Button>
          <Button size={size} leadingIcon={<PlusIcon />}>Leading</Button>
          <Button size={size} trailingIcon={<ChevronIcon />}>Trailing</Button>
          <Button size={size} leadingIcon={<PlusIcon />} trailingIcon={<ChevronIcon />}>Both</Button>
        </Row>)}
    </Col>
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Full matrix',
  render: () => <Col>
      {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => <Row key={size} label={size}>
          <Button variant="primary" size={size}>Primary</Button>
          <Button variant="secondary" size={size}>Secondary</Button>
          <Button variant="secondary" size={size} intent="success">Success</Button>
          <Button variant="secondary" size={size} intent="warning">Warning</Button>
          <Button variant="secondary" size={size} intent="error">Error</Button>
        </Row>)}
    </Col>
}`,...p.parameters?.docs?.source}}};const H=["Playground","Types","Sizes","PrimaryStates","SecondaryStates","FocusStates","WithIcons","FullMatrix"];export{u as FocusStates,p as FullMatrix,i as Playground,c as PrimaryStates,d as SecondaryStates,l as Sizes,o as Types,m as WithIcons,H as __namedExportsOrder,X as default};
