import{r as a,j as e}from"./iframe-t51pLfio.js";import{T as L}from"./TextButton-BXvviUOp.js";import"./preload-helper-PPVm8Dsz.js";const R=a.createContext(null);function O(){const t=a.useContext(R);if(!t)throw new Error("Menu components must be used within Menu.Root");return t}function d(...t){return t.filter(Boolean).join(" ")}function T({children:t,className:n,width:u=348,selectionMode:s="single",actionsMode:l="auto",selectedId:c,defaultSelectedId:m=null,onSelectionChange:o,onItemAction:i}){const[h,f]=a.useState(m),b=c!==void 0,g=b?c??null:h,S=p=>{s!=="none"&&(b||f(p),o?.(p))},x=a.useMemo(()=>({selectionMode:s,actionsMode:l,selectedId:g,selectItem:S,onItemAction:i}),[l,i,g,s]);return e.jsx(R.Provider,{value:x,children:e.jsx("div",{className:d("flex flex-col rounded-xl border border-neutral-800 bg-black shadow-[0px_8px_12px_-2px_rgba(87,87,87,0.12)]",n),style:{width:u},children:t})})}function P({children:t,className:n}){return e.jsx("div",{className:d("rounded-t-xl border-b border-neutral-800 bg-neutral-950 px-2 pb-2 pt-2.5",n),children:e.jsx("div",{className:"flex items-center gap-2 px-1.5 text-sm font-medium leading-6 text-neutral-400",children:t})})}function W({children:t,className:n}){return e.jsx("div",{className:d("flex flex-col p-2",n),children:t})}function q({children:t,className:n}){return e.jsx("div",{className:d("rounded-b-xl border-t border-neutral-800 bg-neutral-950 px-2 pb-3 pt-2",n),children:e.jsx("div",{className:"flex items-center",children:t})})}function U({actions:t,disabled:n=!1,onActionSelect:u,ariaLabel:s="Item actions"}){const[l,c]=a.useState(!1),m=a.useRef(null);return a.useEffect(()=>{if(!l)return;const o=i=>{m.current&&!m.current.contains(i.target)&&c(!1)};return document.addEventListener("mousedown",o),()=>document.removeEventListener("mousedown",o)},[l]),t.length===0?null:e.jsxs("div",{ref:m,className:"relative",children:[e.jsx("button",{type:"button",onClick:o=>{o.stopPropagation(),n||c(i=>!i)},disabled:n,"aria-label":s,"aria-haspopup":"menu","aria-expanded":l,className:d("flex items-center justify-center rounded-lg p-2 transition-colors duration-150",n?"cursor-not-allowed text-neutral-600":"cursor-pointer text-white hover:bg-neutral-900 active:bg-neutral-850"),children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"8",cy:"3.67",r:"0.67",fill:"currentColor"}),e.jsx("circle",{cx:"8",cy:"8",r:"0.67",fill:"currentColor"}),e.jsx("circle",{cx:"8",cy:"12.33",r:"0.67",fill:"currentColor"})]})}),l&&!n&&e.jsx("div",{role:"menu",className:"absolute right-0 top-10 z-10 min-w-[152px] rounded-lg border border-neutral-800 bg-neutral-950 p-1 shadow-[0px_8px_12px_-2px_rgba(87,87,87,0.2)]",children:t.map(o=>e.jsx("button",{type:"button",role:"menuitem",disabled:o.disabled,onClick:i=>{i.stopPropagation(),o.disabled||u(o.key),c(!1)},className:d("w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-neutral-900",o.tone==="danger"?"text-red-400":"text-white",o.disabled?"cursor-not-allowed text-neutral-600 hover:bg-transparent":"cursor-pointer"),children:o.label},o.key))})]})}function X({itemId:t,children:n,className:u,disabled:s=!1,interactive:l=!0,selected:c,showCheckmark:m,showActions:o,selectOnClick:i,trailing:h,actions:f=[],actionAriaLabel:b,onClick:g,onActionSelect:S}){const{selectionMode:x,actionsMode:p,selectedId:E,selectItem:H,onItemAction:_}=O(),M=c??(x==="single"&&E===t),k=m??x==="single",A=i??x==="single",B=o!==void 0?o:p==="always"?!0:p==="never"?!1:f.length>0,F=N=>{S?.(N),_?.(t,N)},D=()=>{s||(g?.(),l&&A&&H(t))},y=d("flex h-8 flex-1 items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors duration-150",s?M?"bg-neutral-900":"bg-transparent":M?"bg-neutral-900":l?"bg-transparent hover:bg-neutral-900 active:bg-neutral-850":"bg-transparent",s?"cursor-not-allowed text-neutral-600":l?"cursor-pointer":"cursor-default"),w=d("flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal leading-5",s?"text-neutral-600":"text-white");return e.jsxs("div",{className:d("flex h-9 w-full items-center gap-0.5",u),children:[l?e.jsxs("button",{type:"button",disabled:s,onClick:D,className:y,children:[e.jsx("span",{className:w,children:n}),h,k&&M&&e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none","aria-hidden":"true",className:"shrink-0 text-white",children:e.jsx("path",{d:"M4.79175 10.7221L6.95004 13.6782C7.62651 14.6047 9.01499 14.5867 9.66721 13.643L15.2084 5.625",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}):e.jsxs("div",{className:y,children:[e.jsx("span",{className:w,children:n}),h,k&&M&&e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none","aria-hidden":"true",className:"shrink-0 text-white",children:e.jsx("path",{d:"M4.79175 10.7221L6.95004 13.6782C7.62651 14.6047 9.01499 14.5867 9.66721 13.643L15.2084 5.625",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),B&&e.jsx(U,{actions:f,disabled:s,onActionSelect:F,ariaLabel:b})]})}const r={Root:T,Header:P,List:W,Item:X,Footer:q},z=[{key:"rename",label:"Rename"},{key:"setDefault",label:"Set as default"},{key:"delete",label:"Delete",tone:"danger"}],J={title:"UI/Menu",component:r.Root,parameters:{layout:"centered"}},I={render:()=>{const[t,n]=a.useState("preset-1"),u=a.useMemo(()=>[{id:"preset-1",label:"Critical issues in Site A"},{id:"preset-2",label:"High impact chilled-water group"},{id:"preset-3",label:"Overnight instability alerts"}],[]);return e.jsxs(r.Root,{selectedId:t,onSelectionChange:n,onItemAction:(s,l)=>{console.log("action",{itemId:s,actionKey:l})},children:[e.jsx(r.Header,{children:"Filter presets"}),e.jsx(r.List,{children:u.map(s=>e.jsx(r.Item,{itemId:s.id,actions:z,children:s.label},s.id))}),e.jsx(r.Footer,{children:e.jsx(L,{intent:"default",disabled:!t,onClick:()=>{n("preset-1")},children:"Reset to default"})})]})}},j={render:()=>{const t=[{id:"item-1",label:"Cooling baseline"},{id:"item-2",label:"Energy trend summary"},{id:"item-3",label:"Water usage weekly report"}];return e.jsx(r.Root,{selectionMode:"none",actionsMode:"never",children:e.jsx(r.List,{children:t.map(n=>e.jsx(r.Item,{itemId:n.id,interactive:!1,showCheckmark:!1,children:n.label},n.id))})})}},v={render:()=>{const[t,n]=a.useState("site-1");return e.jsxs(r.Root,{selectedId:t,onSelectionChange:n,actionsMode:"never",children:[e.jsx(r.Header,{children:"Select site"}),e.jsxs(r.List,{children:[e.jsx(r.Item,{itemId:"site-1",children:"Chicago DC"}),e.jsx(r.Item,{itemId:"site-2",children:"Denver DC"}),e.jsx(r.Item,{itemId:"site-3",disabled:!0,children:"Boston DC (disabled)"})]})]})}},C={render:()=>e.jsxs(r.Root,{selectionMode:"none",actionsMode:"never",children:[e.jsx(r.Header,{children:"Filter presets"}),e.jsx(r.List,{children:e.jsx("div",{className:"px-2 py-1.5 text-sm leading-5 text-neutral-700",children:"No saved presets yet. Save filters to access them quickly."})}),e.jsx(r.Footer,{children:e.jsx(L,{disabled:!0,children:"Reset to default"})})]})};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('preset-1');
    const items = useMemo(() => [{
      id: 'preset-1',
      label: 'Critical issues in Site A'
    }, {
      id: 'preset-2',
      label: 'High impact chilled-water group'
    }, {
      id: 'preset-3',
      label: 'Overnight instability alerts'
    }], []);
    return <Menu.Root selectedId={selectedId} onSelectionChange={setSelectedId} onItemAction={(itemId, actionKey) => {
      console.log('action', {
        itemId,
        actionKey
      });
    }}>
        <Menu.Header>Filter presets</Menu.Header>

        <Menu.List>
          {items.map(item => <Menu.Item key={item.id} itemId={item.id} actions={COMPLEX_ACTIONS}>
              {item.label}
            </Menu.Item>)}
        </Menu.List>

        <Menu.Footer>
          <TextButton intent="default" disabled={!selectedId} onClick={() => {
          setSelectedId('preset-1');
        }}>
            Reset to default
          </TextButton>
        </Menu.Footer>
      </Menu.Root>;
  }
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items = [{
      id: 'item-1',
      label: 'Cooling baseline'
    }, {
      id: 'item-2',
      label: 'Energy trend summary'
    }, {
      id: 'item-3',
      label: 'Water usage weekly report'
    }];
    return <Menu.Root selectionMode="none" actionsMode="never">
        <Menu.List>
          {items.map(item => <Menu.Item key={item.id} itemId={item.id} interactive={false} showCheckmark={false}>
              {item.label}
            </Menu.Item>)}
        </Menu.List>
      </Menu.Root>;
  }
}`,...j.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('site-1');
    return <Menu.Root selectedId={selectedId} onSelectionChange={setSelectedId} actionsMode="never">
        <Menu.Header>Select site</Menu.Header>
        <Menu.List>
          <Menu.Item itemId="site-1">Chicago DC</Menu.Item>
          <Menu.Item itemId="site-2">Denver DC</Menu.Item>
          <Menu.Item itemId="site-3" disabled>
            Boston DC (disabled)
          </Menu.Item>
        </Menu.List>
      </Menu.Root>;
  }
}`,...v.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Menu.Root selectionMode="none" actionsMode="never">
      <Menu.Header>Filter presets</Menu.Header>
      <Menu.List>
        <div className="px-2 py-1.5 text-sm leading-5 text-neutral-700">
          No saved presets yet. Save filters to access them quickly.
        </div>
      </Menu.List>
      <Menu.Footer>
        <TextButton disabled>Reset to default</TextButton>
      </Menu.Footer>
    </Menu.Root>
}`,...C.parameters?.docs?.source}}};const Q=["Complex","Simple","SelectableNoActions","EmptyState"];export{I as Complex,C as EmptyState,v as SelectableNoActions,j as Simple,Q as __namedExportsOrder,J as default};
