/* Prevent native selection/drag on scenery, without disabling editing or focus. */
(()=>{'use strict';
  const cursors=document.createElement('script');
  cursors.src=new URL('living-cursors.js',document.currentScript.src).href;
  document.head.append(cursors);
 function editable(node){
  const element=node instanceof Element?node:node?.parentElement;
  return !!element&&(element.isContentEditable||!!element.closest('input,textarea'));
 }
 document.addEventListener('selectstart',event=>{if(!editable(event.target))event.preventDefault()});
 document.addEventListener('dragstart',event=>{
  if(!editable(event.target)&&event.target.closest('img,video,canvas,a'))event.preventDefault();
 });
})();