// One inventory for the old scenes, the kitchen and the persistent box shortcut.
(()=>{
 const dialog=document.createElement('dialog');dialog.id='box-inventory';
 dialog.setAttribute('aria-labelledby','box-inventory-title');
 dialog.innerHTML='<button type="button" class="inventory-close">Volver al recorrido ×</button><h2 id="box-inventory-title">Lo que guardaste en la caja</h2><p class="inventory-intro">Los objetos se guardan arrastrándolos hasta la caja. Un clic no los agrega.</p><p class="inventory-empty">Todavía está vacía. Durante el recorrido vas a encontrar objetos para llevarte.</p><ul></ul>';
 document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();
 function paint(){const list=dialog.querySelector('ul');list.replaceChildren();E.caja.forEach(c=>{const item=COSAS[c.id];if(!item)return;const li=document.createElement('li'),img=document.createElement('img'),name=document.createElement('p');img.src=item.src;img.alt='';name.textContent=item.nombre;li.append(img,name);list.append(li)});dialog.querySelector('.inventory-empty').hidden=E.caja.length>0}
 window.casaInventory=open=>{if(!open){if(dialog.open)dialog.close();return}paint();if(!dialog.open)dialog.showModal()};
 // Stop journey navigation, while preserving native dialog and form scrolling.
 ['wheel','touchstart','touchmove','keydown'].forEach(type=>dialog.addEventListener(type,e=>e.stopPropagation(),{passive:type!=='keydown'}));
 document.addEventListener('touchstart',e=>{if(e.target.closest('[data-guardable]'))e.stopPropagation()},{capture:true,passive:true});
 const offers=[
  {id:'cucharitas',a:3.1,b:4.2,x:17,y:63},
  {id:'dibujo',a:7.7,b:8.6,x:71,y:65},
  {id:'glicina',a:8.7,b:10,x:22,y:68},
  {id:'laurel',a:11,b:12.3,x:68,y:58},
  {id:'botella',a:12.7,b:13.5,x:23,y:66},
  {id:'plato',a:15.6,b:16.5,x:72,y:66},
  {id:'aluminio',a:17.8,b:19.1,x:20,y:73},
  {id:'mora',a:20,b:21.3,x:64,y:70}
 ];
 const layer=document.createElement('div');layer.id='journey-objects';document.body.append(layer);
 offers.forEach(o=>{const item=COSAS[o.id],b=document.createElement('button');b.type='button';b.className='journey-object';b.style.left=o.x+'%';b.style.top=o.y+'%';b.innerHTML='<img alt=""><span></span>';b.querySelector('img').src=item.src;b.querySelector('span').textContent='Arrastrá a la caja';b.setAttribute('aria-label',item.nombre+'. Arrastrá a la caja');layer.append(b);o.el=b;hacerGuardable(b,o.id,{alGuardar:()=>{b.hidden=true}})});
 const oldPaint=pintarCaja;pintarCaja=function(){oldPaint();if(dialog.open)paint()};
 const previous=window.casaRender;
 window.casaRender=function(now,dt){previous(now,dt);const inside=document.body.classList.contains('inhabited')&&!document.body.classList.contains('reentering')&&!document.body.classList.contains('closing-outside');offers.forEach(o=>{o.el.hidden=!inside||current<o.a||current>=o.b||enCaja(o.id)});const box=$('fh-model-box');if(box)box.setAttribute('aria-label',current>=2.62?'Abrir inventario de la caja: '+E.caja.length+' objetos':'La caja de zapatillas')};
})();