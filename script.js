const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

const WHATSAPP_NUMBER='923006622266';
const FREE_DELIVERY_MIN=3500;
const DELIVERY_FEE=200;

const CART_KEY='mobeeScentsCart';
let cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');

const refs={drawer:$('.cart-drawer'),overlay:$('.overlay'),count:$('.cart-count'),body:$('.cart-body'),total:$('.cart-total strong'),
  pageBody:$('.cart-page-items'),pageTotal:$('.cart-page-total'),
  checkoutBody:$('.checkout-items'),checkoutSubtotal:$('.checkout-subtotal'),checkoutDelivery:$('.checkout-delivery'),checkoutTotal:$('.checkout-total strong')};

function format(n){return 'Rs. '+Number(n).toLocaleString('en-PK')}
function subtotal(){return cart.reduce((a,b)=>a+b.price*b.qty,0)}
function deliveryFee(){const s=subtotal();return s===0||s>=FREE_DELIVERY_MIN?0:DELIVERY_FEE}
function save(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart()}

function renderCart(){
  if(refs.count) refs.count.textContent=cart.reduce((a,b)=>a+b.qty,0);

  if(refs.body&&refs.total){
    if(!cart.length){refs.body.innerHTML='<div class="cart-empty"><div style="font-size:34px">♡</div><p>Your bag is empty.</p><a href="shop.html" class="text-link">Discover fragrances <span>→</span></a></div>';refs.total.textContent='Rs. 0'}
    else{
      refs.body.innerHTML=cart.map((i,idx)=>`<div class="cart-item"><img src="${i.img}" alt="${i.name}"><div><b>${i.name}</b><small>${i.size||'50ml'} · Qty ${i.qty}</small><small>${format(i.price*i.qty)}</small></div><button class="icon-btn remove-item" data-i="${idx}" aria-label="Remove">×</button></div>`).join('');
      refs.total.textContent=format(subtotal());
      $$('.remove-item',refs.body).forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.i,1);save()});
    }
  }

  if(refs.pageBody&&refs.pageTotal){
    if(!cart.length){refs.pageBody.innerHTML='<div class="cart-empty"><div style="font-size:40px">♡</div><p>Your bag is empty.</p><a href="shop.html" class="btn wine">Discover fragrances</a></div>';refs.pageTotal.textContent='Rs. 0'}
    else{
      refs.pageBody.innerHTML=cart.map((i,idx)=>`<div class="cart-row"><img src="${i.img}" alt="${i.name}"><div class="cart-row-info"><b>${i.name}</b><small>${i.size||'50ml'}</small><div class="qty-stepper"><button class="qty-dec" data-i="${idx}" aria-label="Decrease">−</button><span>${i.qty}</span><button class="qty-inc" data-i="${idx}" aria-label="Increase">+</button></div></div><div class="cart-row-price">${format(i.price*i.qty)}</div><button class="icon-btn remove-item-page" data-i="${idx}" aria-label="Remove">×</button></div>`).join('');
      refs.pageTotal.textContent=format(subtotal());
      $$('.qty-inc',refs.pageBody).forEach(b=>b.onclick=()=>{cart[+b.dataset.i].qty++;save()});
      $$('.qty-dec',refs.pageBody).forEach(b=>b.onclick=()=>{const it=cart[+b.dataset.i];it.qty=Math.max(1,it.qty-1);save()});
      $$('.remove-item-page',refs.pageBody).forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.i,1);save()});
    }
  }

  if(refs.checkoutBody){
    if(!cart.length){refs.checkoutBody.innerHTML='<p style="color:var(--muted);font-size:13px;margin:0">Your bag is empty. <a href="shop.html" class="text-link">Shop fragrances <span>→</span></a></p>'}
    else{refs.checkoutBody.innerHTML=cart.map(i=>`<div class="checkout-item"><img src="${i.img}" alt="${i.name}"><div><b>${i.name}</b><small>${i.size||'50ml'} · Qty ${i.qty}</small></div><span>${format(i.price*i.qty)}</span></div>`).join('')}
    if(refs.checkoutSubtotal) refs.checkoutSubtotal.textContent=format(subtotal());
    if(refs.checkoutDelivery) refs.checkoutDelivery.textContent=cart.length?(deliveryFee()?format(deliveryFee()):'Free'):'—';
    if(refs.checkoutTotal) refs.checkoutTotal.textContent=format(subtotal()+deliveryFee());
  }
}

function openCart(){refs.drawer?.classList.add('open');refs.overlay?.classList.add('show');document.body.classList.add('menu-open')}
function closeAll(){refs.drawer?.classList.remove('open');$('.mobile-nav')?.classList.remove('open');refs.overlay?.classList.remove('show');document.body.classList.remove('menu-open')}
$('.cart-open')?.addEventListener('click',openCart);$('.cart-close')?.addEventListener('click',closeAll);refs.overlay?.addEventListener('click',closeAll);
$('.menu-btn')?.addEventListener('click',()=>{$('.mobile-nav')?.classList.add('open');refs.overlay?.classList.add('show');document.body.classList.add('menu-open')});$('.mobile-close')?.addEventListener('click',closeAll);

function toast(msg){const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}
$$('.quick-add,.add-to-cart').forEach(btn=>btn.addEventListener('click',e=>{
  e.preventDefault();const el=btn.closest('[data-product]')||btn;const qty=+($('#qtyValue')?.textContent||1);const item={name:el.dataset.name||btn.dataset.name||'Mobee Scents Eau de Parfum',price:+(el.dataset.price||btn.dataset.price||2490),img:el.dataset.img||btn.dataset.img||'assets/img/santal-33-bottle.jpg',size:el.dataset.size||btn.dataset.size||$('.size-btn.active')?.textContent||'50ml',qty};
  const found=cart.find(x=>x.name===item.name&&x.size===item.size);found?found.qty+=qty:cart.push(item);save();toast('Added to your bag');openCart();
}));

$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{ $$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active'); const f=btn.dataset.filter; $$('.product-card').forEach(c=>c.style.display=(f==='all'||c.dataset.cat?.includes(f))?'block':'none') }));

$$('.acc-head').forEach(h=>h.onclick=()=>h.parentElement.classList.toggle('open'));
$$('.size-btn').forEach(b=>b.onclick=()=>{$$('.size-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
$('#minus')?.addEventListener('click',()=>{const v=$('#qtyValue');v.textContent=Math.max(1,+v.textContent-1)});$('#plus')?.addEventListener('click',()=>{const v=$('#qtyValue');v.textContent=+v.textContent+1});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(x=>io.observe(x));

$$('.newsletter-form,.contact-form:not(.checkout-form),.track-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();toast(f.classList.contains('track-form')?'Demo tracking request submitted':'Thank you — we received it.');f.reset()}));

$('.checkout-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  if(!cart.length){toast('Your bag is empty');return}
  const f=e.target;
  const name=f.name.value.trim(),phone=f.phone.value.trim(),address=f.address.value.trim(),city=f.city.value.trim(),notes=f.notes.value.trim();
  if(!name||!phone||!address){toast('Please fill in your name, phone and address');return}
  const fee=deliveryFee();
  const lines=[
    'New order — Mobee Scents','',
    ...cart.map(i=>`• ${i.name} (${i.size||'50ml'}) x${i.qty} — ${format(i.price*i.qty)}`),'',
    `Subtotal: ${format(subtotal())}`,
    `Delivery: ${fee?format(fee):'Free'}`,
    `Total: ${format(subtotal()+fee)}`,'',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}${city?', '+city:''}`,
    notes?`Notes: ${notes}`:'','',
    'Payment: Cash on Delivery'
  ].filter(l=>l!=='');
  const url='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(lines.join('\n'));
  window.open(url,'_blank');
  cart=[];save();
  toast('Order sent! Confirm it on WhatsApp.');
  f.reset();
});

renderCart();
