import{j as e,r as x}from"./iframe-t51pLfio.js";import{T as t}from"./TextButton-BXvviUOp.js";import"./preload-helper-PPVm8Dsz.js";const r=({children:n,label:s})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"},children:[s&&e.jsx("span",{style:{color:"#636363",fontSize:12,width:56,flexShrink:0,textTransform:"capitalize"},children:s}),n]}),u=({children:n})=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:n}),h=n=>{const s=x.useRef(null);return x.useEffect(()=>{s.current?.focus()},[]),e.jsx(t,{ref:s,...n})},m=()=>e.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",width:"100%",height:"100%",children:e.jsx("path",{d:"M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z"})}),p=()=>e.jsx("svg",{viewBox:"0 0 20 20",fill:"currentColor",width:"100%",height:"100%",children:e.jsx("path",{fillRule:"evenodd",d:"M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),T={title:"UI/TextButton",component:t,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{size:{control:"select",options:["xl","md","sm"]},intent:{control:"select",options:["default","success","warning","error"]},disabled:{control:"boolean"},children:{control:"text"}}},o={args:{size:"md",intent:"default",children:"Action",disabled:!1}},a={render:()=>e.jsxs(r,{children:[e.jsx(t,{intent:"default",children:"Default"}),e.jsx(t,{intent:"success",children:"Success"}),e.jsx(t,{intent:"warning",children:"Warning"}),e.jsx(t,{intent:"error",children:"Error"})]})},i={render:()=>e.jsxs(r,{children:[e.jsx(t,{size:"xl",children:"XLarge"}),e.jsx(t,{size:"md",children:"Medium"}),e.jsx(t,{size:"sm",children:"Small"})]})},c={render:()=>e.jsx(u,{children:["default","success","warning","error"].map(n=>e.jsxs(r,{label:n,children:[e.jsx(t,{intent:n,children:"Default"}),e.jsx(t,{intent:n,disabled:!0,children:"Disabled"})]},n))})},l={name:"States · Focus",render:()=>e.jsx(u,{children:["default","success","warning","error"].map(n=>e.jsx(r,{label:n,children:["xl","md","sm"].map(s=>e.jsx(h,{intent:n,size:s,children:"Action"},s))},n))})},d={name:"Layout · Icons",render:()=>e.jsx(u,{children:["xl","md","sm"].map(n=>e.jsxs(r,{label:n,children:[e.jsx(t,{size:n,children:"No icon"}),e.jsx(t,{size:n,leadingIcon:e.jsx(m,{}),children:"Leading"}),e.jsx(t,{size:n,trailingIcon:e.jsx(p,{}),children:"Trailing"}),e.jsx(t,{size:n,leadingIcon:e.jsx(m,{}),trailingIcon:e.jsx(p,{}),children:"Both"})]},n))})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    intent: 'default',
    children: 'Action',
    disabled: false
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Row>
      <TextButton intent="default">Default</TextButton>
      <TextButton intent="success">Success</TextButton>
      <TextButton intent="warning">Warning</TextButton>
      <TextButton intent="error">Error</TextButton>
    </Row>
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <Row>
      <TextButton size="xl">XLarge</TextButton>
      <TextButton size="md">Medium</TextButton>
      <TextButton size="sm">Small</TextButton>
    </Row>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Col>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => <Row key={intent} label={intent}>
          <TextButton intent={intent}>Default</TextButton>
          <TextButton intent={intent} disabled>Disabled</TextButton>
        </Row>)}
    </Col>
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'States · Focus',
  render: () => <Col>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => <Row key={intent} label={intent}>
          {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => <FocusedTextButton key={size} intent={intent} size={size}>
              Action
            </FocusedTextButton>)}
        </Row>)}
    </Col>
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Layout · Icons',
  render: () => <Col>
      {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => <Row key={size} label={size}>
          <TextButton size={size}>No icon</TextButton>
          <TextButton size={size} leadingIcon={<PlusIcon />}>Leading</TextButton>
          <TextButton size={size} trailingIcon={<ChevronIcon />}>Trailing</TextButton>
          <TextButton size={size} leadingIcon={<PlusIcon />} trailingIcon={<ChevronIcon />}>Both</TextButton>
        </Row>)}
    </Col>
}`,...d.parameters?.docs?.source}}};const f=["Playground","Intents","Sizes","States","FocusStates","WithIcons"];export{l as FocusStates,a as Intents,o as Playground,i as Sizes,c as States,d as WithIcons,f as __namedExportsOrder,T as default};
