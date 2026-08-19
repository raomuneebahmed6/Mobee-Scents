const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

const CART_KEY='mobeeScentsCart';
let cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');

const refs={drawer:$('.cart-drawer'),overlay:$('.overlay'),count:$('.cart-count'),body:$('.cart-body'),total:$('.cart-total strong')};
function format(n){return 'Rs. '+Number(n).toLocaleString('en-PK')}
function save(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart()}
function renderCart(){
  if(!refs.count)return;
  refs.count.textContent=cart.reduce((a,b)=>a+b.qty,0);
  if(!cart.length){refs.body.innerHTML='<div class="cart-empty"><div style="font-size:34px">♡</div><p>Your bag is empty.</p><a href="shop.html" class="text-link">Discover fragrances <span>→</span></a></div>';refs.total.textContent='Rs. 0';return}
  refs.body.innerHTML=cart.map((i,idx)=>`<div class="cart-item"><img src="${i.img}" alt="${i.name}"><div><b>${i.name}</b><small>${i.size||'50ml'} · Qty ${i.qty}</small><small>${format(i.price)}</small></div><button class="icon-btn remove-item" data-i="${idx}" aria-label="Remove">×</button></div>`).join('');
  refs.total.textContent=format(cart.reduce((a,b)=>a+b.price*b.qty,0));
  $$('.remove-item').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.i,1);save()});
}
function openCart(){refs.drawer?.classList.add('open');refs.overlay?.classList.add('show');document.body.classList.add('menu-open')}
function closeAll(){refs.drawer?.classList.remove('open');$('.mobile-nav')?.classList.remove('open');refs.overlay?.classList.remove('show');document.body.classList.remove('menu-open')}
$('.cart-open')?.addEventListener('click',openCart);$('.cart-close')?.addEventListener('click',closeAll);refs.overlay?.addEventListener('click',closeAll);
$('.menu-btn')?.addEventListener('click',()=>{$('.mobile-nav')?.classList.add('open');refs.overlay?.classList.add('show');document.body.classList.add('menu-open')});$('.mobile-close')?.addEventListener('click',closeAll);

function toast(msg){const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
$$('.quick-add,.add-to-cart').forEach(btn=>btn.addEventListener('click',e=>{
  e.preventDefault();const el=btn.closest('[data-product]')||btn;const qty=+($('#qtyValue')?.textContent||1);const item={name:el.dataset.name||btn.dataset.name||'Mobee Scents Eau de Parfum',price:+(el.dataset.price||btn.dataset.price||2490),img:el.dataset.img||btn.dataset.img||'assets/img/santal-33-bottle.jpg',size:$('.size-btn.active')?.textContent||'50ml',qty};
  const found=cart.find(x=>x.name===item.name&&x.size===item.size);found?found.qty+=qty:cart.push(item);save();toast('Added to your bag');openCart();
}));

$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{ $$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active'); const f=btn.dataset.filter; $$('.product-card').forEach(c=>c.style.display=(f==='all'||c.dataset.cat?.includes(f))?'block':'none') }));

$$('.acc-head').forEach(h=>h.onclick=()=>h.parentElement.classList.toggle('open'));
$$('.size-btn').forEach(b=>b.onclick=()=>{$$('.size-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
$('#minus')?.addEventListener('click',()=>{const v=$('#qtyValue');v.textContent=Math.max(1,+v.textContent-1)});$('#plus')?.addEventListener('click',()=>{const v=$('#qtyValue');v.textContent=+v.textContent+1});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(x=>io.observe(x));

$$('.newsletter-form,.contact-form,.track-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();toast(f.classList.contains('track-form')?'Demo tracking request submitted':'Thank you — we received it.');f.reset()}));

renderCart();
