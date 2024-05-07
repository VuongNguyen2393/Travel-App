const departDate = document.getElementById('departing');
if(departDate){
    departDate.addEventListener('change',()=>{
        const departDay = new Date (new Date(departDate.value).toDateString());
        console.log('depart:',departDay);
        const today = new Date(new Date().toDateString());
        console.log('today:',today);
        const remainDays = (departDay - today)/(3600000*24);
        console.log('remain:',remainDays);
        updateUI(remainDays);
    }) 
}

function updateUI(days){
    const remainDays = document.getElementById('remainDays');
    if(days > 0){
        remainDays.innerHTML = `${days} days away`;
    }else{
        remainDays.innerHTML = `${Math.abs(days)} days over`;
    }
}