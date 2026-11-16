// Gupta Accessories88 demo interactions
// Add the shop's real WhatsApp number below in international format, digits only.
// Example for India: 919876543210 (do not include + or spaces).
const WHATSAPP_NUMBER = "";

const products = [
  {id:1,name:"Minimal Matte Phone Case",category:"Covers",price:299,image:"https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=700&q=80",tag:"EVERYDAY"},
  {id:2,name:"Fast Charge Adapter",category:"Charging",price:499,image:"https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=700&q=80",tag:"POWER"},
  {id:3,name:"Wireless Earbuds",category:"Audio",price:899,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80",tag:"AUDIO"},
  {id:4,name:"Screen Guard",category:"Protection",price:149,image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",tag:"PROTECT"},
  {id:5,name:"Compact Power Bank",category:"Power",price:799,image:"https://images.unsplash.com/photo-1609592424853-3b4c1c4a3c2c?auto=format&fit=crop&w=700&q=80",tag:"ON THE GO"},
  {id:6,name:"USB-C Charging Cable",category:"Charging",price:199,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",tag:"ESSENTIAL"},
  {id:7,name:"Mobile Replacement Parts",category:"Parts",price:599,image:"https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=700&q=80",tag:"COMPONENT"},
  {id:8,name:"Premium Neckband",category:"Audio",price:699,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",tag:"LISTEN"}
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("productSearch");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";

function money(amount){ return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount); }
function renderProducts(){
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p => (activeCategory==="All" || p.category===activeCategory) && (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)));
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-label">${p.tag}</span></div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="product-bottom"><span class="product-price">${money(p.price)}<small>DEMO PRICE</small></span>
          <div class="product-actions"><button type="button" data-detail="${p.id}">Details</button><button type="button" data-enquire="${p.id}">Enquire ↗</button></div>
        </div>
      </div>
    </article>`).join("");
  emptyState.hidden = visible.length !== 0;
}
function setCategory(category){
  activeCategory = category;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.toggle("selected",btn.dataset.filter===category));
  renderProducts();
}
document.getElementById("filterList").addEventListener("click",e=>{
  const btn=e.target.closest("[data-filter]");
  if(btn) setCategory(btn.dataset.filter);
});
document.querySelector(".category-grid").addEventListener("click",e=>{
  const card=e.target.closest("[data-filter]");
  if(card){setCategory(card.dataset.filter);document.getElementById("products").scrollIntoView({behavior:"smooth"});}
});
searchInput.addEventListener("input",renderProducts);
productGrid.addEventListener("click",e=>{
  const detail=e.target.closest("[data-detail]");
  const enquire=e.target.closest("[data-enquire]");
  if(detail){const p=products.find(x=>x.id===Number(detail.dataset.detail));showToast(`${p.name} · Demo listing. Ask the shop to confirm availability and price.`);}
  if(enquire){const p=products.find(x=>x.id===Number(enquire.dataset.enquire));openWhatsApp(`Hello Gupta Accessories88, I would like to enquire about ${p.name}. Please confirm availability and price.`);}
});

function openWhatsApp(message){
  if(!WHATSAPP_NUMBER){showToast("WhatsApp number not added yet. Please contact the shop through Instagram.");return;}
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank","noopener");
}
document.querySelectorAll(".whatsapp-link").forEach(link=>{
  link.addEventListener("click",e=>{e.preventDefault();openWhatsApp(link.dataset.message || "Hello Gupta Accessories88, I would like to enquire.");});
});
function showToast(message){
  const toast=document.getElementById("toast");
  toast.textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),3200);
}

const menuToggle=document.getElementById("menuToggle");
const mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));

document.getElementById("searchTrigger").addEventListener("click",()=>{
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>searchInput.focus(),450);
});
document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

renderProducts();