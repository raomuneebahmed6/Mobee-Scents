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
$$('.add-to-cart').forEach(btn=>btn.addEventListener('click',e=>{
  e.preventDefault();const el=btn.closest('[data-product]')||btn;const qty=+($('#qtyValue')?.textContent||1);const item={name:el.dataset.name||btn.dataset.name||'Mobee Scents Eau de Parfum',price:+(el.dataset.price||btn.dataset.price||2490),img:el.dataset.img||btn.dataset.img||'assets/img/dior-sauvage.png',size:el.dataset.size||btn.dataset.size||$('.size-btn.active')?.textContent||'50ml',qty};
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

function renderProductPage(){
  const titleEl=$('#pTitle');
  if(!titleEl||typeof PRODUCTS==='undefined') return;
  const params=new URLSearchParams(location.search);
  let slug=params.get('slug')||'dior-sauvage';
  const testerMatch=slug.match(/^(.+)-(5|10)ml$/);
  let mode,data,base,size,price,name;

  if(BOXES[slug]){
    mode='box';data=BOXES[slug];name=data.name;price=data.price;size=data.size;
  }else if(testerMatch&&PRODUCTS[testerMatch[1]]&&TESTER_SIZES[testerMatch[1]]&&TESTER_SIZES[testerMatch[1]][+testerMatch[2]]){
    mode='tester';base=testerMatch[1];size=testerMatch[2]+'ml';data=PRODUCTS[base];name=data.name+' — '+size+' Tester';price=TESTER_SIZES[base][+testerMatch[2]];
  }else if(PRODUCTS[slug]){
    mode='full';base=slug;data=PRODUCTS[slug];name=data.name;price=data.price;size='50ml';
  }else{
    mode='full';base='dior-sauvage';slug='dior-sauvage';data=PRODUCTS['dior-sauvage'];name=data.name;price=data.price;size='50ml';
  }

  document.title=name+' — Mobee Scents';
  $('#pCrumbs').textContent='Home / '+(mode==='full'?'Shop':'Testers')+' / '+name;
  $('#pEyebrow').textContent=mode==='box'?'Discovery box · Eau de parfum':mode==='tester'?'Tester · Eau de parfum':data.badge+' · Eau de parfum';
  titleEl.textContent=mode==='tester'?data.name+' — Tester':name;
  $('#pRating').textContent=mode==='box'?'4.8 · 96 reviews':data.rating+' · '+data.reviews+' reviews';
  $('#pLead').textContent=mode==='box'?'Not sure where to start? This set bundles four of our signature fragrances in '+size+' testers — the easiest way to find your favourite before buying full-size.':data.lead;
  $('#pPrice').textContent=format(price);
  const mainImg=mode==='box'?PRODUCTS[data.includes[0]].img:data.img;
  $('#pImg').src=mainImg;$('#pImg').alt=name;
  const thumbImgs=mode==='box'?data.includes.slice(0,3).map(s=>PRODUCTS[s].img):[data.img,'assets/img/dior-sauvage-2.png','assets/img/dior-sauvage-3.png'];
  $$('#pThumbs img').forEach((t,i)=>t.src=thumbImgs[i]||mainImg);

  if(mode==='box'){
    $('#pNotesGrid').style.display='none';
    $('#pIncludedWrap').style.display='';
    $('#pIncluded').innerHTML=data.includes.map(s=>`<div class="note-card"><b>${PRODUCTS[s].name}</b><span>${PRODUCTS[s].sub}</span></div>`).join('');
    $('#pSizeBlock').style.display='none';
    $('#pScentMeter').style.display='none';
    $('#pAccTitle1').textContent='What\'s inside the box';
    $('#pAccBody1').textContent='Four '+size+' testers, one of each: '+data.includes.map(s=>PRODUCTS[s].name).join(', ')+'. Perfect for gifting or for anyone still deciding on a signature scent.';
    $('#pAccTitle2').textContent='Tester credit *';
    $('#pAccBody2').textContent='Message us on WhatsApp with your order number when you upgrade any of these to a full-size bottle within 30 days, and we\'ll credit that tester\'s price toward it.';
  }else{
    $('#pNotesGrid').style.display='';
    $('#pIncludedWrap').style.display='none';
    $('#pNotesGrid').innerHTML=`<div class="note-card"><b>Top</b><span>${data.top}</span></div><div class="note-card"><b>Heart</b><span>${data.heart}</span></div><div class="note-card"><b>Base</b><span>${data.base}</span></div>`;
    $('#pScentMeter').style.display='';
    const longevityBand=v=>v>=85?'10+ hrs':v>=70?'8–10 hrs':v>=50?'5–7 hrs':'3–4 hrs';
    const strengthBand=v=>v>=75?'Strong':v>=55?'Moderate':'Soft';
    const sweetBand=v=>v>=65?'Sweet':v>=40?'Medium':'Dry';
    const freshBand=v=>v>=65?'Fresh':v>=40?'Balanced':'Warm';
    $('#mLongevity').style.width=data.longevity+'%';$('#mLongevityLabel').textContent=longevityBand(data.longevity);
    $('#mProjection').style.width=data.projection+'%';$('#mProjectionLabel').textContent=strengthBand(data.projection);
    $('#mSweetness').style.width=data.sweetness+'%';$('#mSweetnessLabel').textContent=sweetBand(data.sweetness);
    $('#mFreshness').style.width=data.freshness+'%';$('#mFreshnessLabel').textContent=freshBand(data.freshness);

    $('#pSizeBlock').style.display='';
    if(mode==='tester'){
      $('#pSizeLabel').textContent='Choose tester size';
      $('#pSizeRow').innerHTML=[5,10].map(n=>`<button class="size-btn${(n+'ml'===size)?' active':''}" data-goto="${base}-${n}ml">${n}ml</button>`).join('');
      $$('#pSizeRow .size-btn').forEach(b=>b.onclick=()=>location.href='product.html?slug='+b.dataset.goto);
      $('#pAccTitle1').textContent='Why try a tester first?';
      $('#pAccBody1').textContent='Fragrance wears differently on every skin. A tester lets you experience the full development — top, heart and base notes — over real days before investing in a 50ml or 100ml bottle.';
      $('#pAccTitle2').textContent='Tester credit *';
      $('#pAccBody2').textContent='Message us on WhatsApp with your tester order number when you upgrade to a full-size bottle within 30 days, and we\'ll deduct the tester price from your total.';
    }else{
      $('#pSizeLabel').textContent='Choose size';
      $('#pSizeRow').innerHTML=['30ml','50ml','100ml'].map(s=>`<button class="size-btn${s==='50ml'?' active':''}">${s}</button>`).join('');
      $$('#pSizeRow .size-btn').forEach(b=>b.onclick=()=>{$$('#pSizeRow .size-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
      $('#pAccTitle1').textContent='How it smells';
      $('#pAccBody1').textContent=data.smells;
      $('#pAccTitle2').textContent='Best time to wear';
      $('#pAccBody2').textContent=data.wear;
    }
  }

  const addBtn=$('#pAddBtn');
  addBtn.dataset.name=name;addBtn.dataset.price=price;addBtn.dataset.img=mainImg;addBtn.dataset.size=size;
  addBtn.textContent='Add to bag — '+format(price);

  let related=[];
  if(mode==='box'){
    $('#pRelatedTitle').textContent='More to explore';
    const boxPrefix=slug.replace(/-(5|10)ml$/,'');
    const otherBox=boxPrefix+'-'+(slug.endsWith('5ml')?'10ml':'5ml');
    if(BOXES[otherBox])related.push({slug:otherBox,name:BOXES[otherBox].name,price:BOXES[otherBox].price,img:PRODUCTS[BOXES[otherBox].includes[0]].img,sub:'4 fragrances, one box'});
    data.includes.slice(0,2).forEach(k=>related.push({slug:k,name:PRODUCTS[k].name,price:PRODUCTS[k].price,img:PRODUCTS[k].img,sub:PRODUCTS[k].sub}));
  }else if(mode==='tester'){
    $('#pRelatedTitle').textContent='Other testers & boxes';
    const otherN=size==='5ml'?10:5;
    related.push({slug:base+'-'+otherN+'ml',name:data.name+' — '+otherN+'ml Tester',price:TESTER_SIZES[base][otherN],img:data.img,sub:data.sub});
    const ownBox=Object.keys(BOXES).find(b=>BOXES[b].includes.includes(base)&&BOXES[b].size==='5ml')||'tester-box-5ml';
    related.push({slug:ownBox,name:BOXES[ownBox].name,price:BOXES[ownBox].price,img:PRODUCTS[BOXES[ownBox].includes[0]].img,sub:'4 fragrances, one box'});
  }else{
    $('#pRelatedTitle').textContent='Similar profiles';
    Object.keys(PRODUCTS).filter(k=>k!==base).slice(0,2).forEach(k=>related.push({slug:k,name:PRODUCTS[k].name,price:PRODUCTS[k].price,img:PRODUCTS[k].img,sub:PRODUCTS[k].sub}));
  }
  $('#pRelated').innerHTML=related.map(r=>`<article class="product-card" data-product data-name="${r.name}" data-price="${r.price}" data-img="${r.img}"><div class="product-media"><a href="product.html?slug=${r.slug}"><img src="${r.img}" alt="${r.name}"></a><a href="product.html?slug=${r.slug}" class="quick-add">View Details</a></div><div class="product-info"><h3 class="product-title"><a href="product.html?slug=${r.slug}">${r.name}</a></h3><div class="product-sub">${r.sub}</div><div class="price">${format(r.price)}</div></div></article>`).join('');
}
renderProductPage();

renderCart();
