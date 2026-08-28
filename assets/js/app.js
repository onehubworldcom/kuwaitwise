const n=v=>Number(v)||0;
const fmt=v=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v);
const money=v=>`KWD ${fmt(v)}`;
const by=id=>document.getElementById(id);
const bind=(id,fn)=>{const el=by(id); if(el) el.onclick=fn;};

bind('budgetCalc',()=>{const x=n(by('income').value)-n(by('rent').value)-n(by('other').value);by('budgetResult').textContent=`Estimated monthly balance: ${money(x)} ${x>=0?'remaining after entered expenses':'short of the entered expenses'}.`;});
bind('rentCalc',()=>{const i=n(by('rentIncome').value),r=n(by('rentAmount').value);by('rentResult').textContent=i>0?`Rent is ${fmt(r/i*100)}% of the entered monthly income. After rent: ${money(i-r)}.`:'Please enter a monthly income greater than zero.';});
bind('salaryCalc',()=>{const basic=n(by('basic').value),allow=n(by('allow').value),ded=n(by('ded').value);const gross=basic+allow,net=gross-ded;by('salaryResult').textContent=`Gross monthly pay: ${money(gross)} | Estimated take-home after entered deductions: ${money(net)} | Annual equivalent: ${money(net*12)}.`;});
bind('savingsCalc',()=>{const goal=n(by('goal').value),current=n(by('current').value),monthly=n(by('monthly').value),rate=n(by('rate').value)/100/12;let months=0,b=current;if(goal<=current){by('savingsResult').textContent='Your current amount already meets the entered goal.';return;} if(monthly<=0){by('savingsResult').textContent='Enter a monthly contribution greater than zero.';return;} while(b<goal&&months<1200){b=b*(1+rate)+monthly;months++;} by('savingsResult').textContent=months<1200?`Estimated time: ${months} months (${fmt(months/12)} years). Estimated balance then: ${money(b)}.`:'The entered goal could not be reached with these figures.';});
bind('gratuityCalc',()=>{const pay=n(by('gPay').value),years=n(by('gYears').value),rate=n(by('gRate').value);if(pay<=0||years<=0||rate<=0){by('gratuityResult').textContent='Enter monthly pay, years and the rate you want to use.';return;}const estimate=pay*years*rate;by('gratuityResult').textContent=`Planning estimate: ${money(estimate)} based on ${fmt(years)} years × ${money(pay)} monthly pay × ${fmt(rate)} month(s) of pay per year. This is a user-input estimate, not a legal entitlement calculation.`;});
bind('currencyCalc',()=>{const amount=n(by('amount').value),rate=n(by('fxrate').value);by('currencyResult').textContent=amount>0&&rate>0?`${money(amount)} × ${fmt(rate)} = ${fmt(amount*rate)} in the target currency (using the rate you entered).`:'Enter an amount and exchange rate.';});
const menu=by('menu');if(menu)menu.onclick=()=>by('links').classList.toggle('open');

// Lightweight visual polish: reveal content as it enters the viewport.
if('IntersectionObserver' in window){
  const items=[...document.querySelectorAll('.card,.guide h2,.officiallinks a')];
  items.forEach(el=>{el.style.transition='opacity .45s ease, transform .45s ease';el.style.opacity='0';el.style.transform='translateY(14px)'});
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';io.unobserve(e.target)}}),{threshold:.08});
  items.forEach(el=>io.observe(el));
}
