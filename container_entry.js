function makeEntry(form){
    let food = form.food_name.value.toLowerCase();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let container = urlParams.get('shape');

    alert("You put " + food + " in " + container);

    let harvests = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('h_data=')).split('=')[1]);
    harvests[container][0]=food;
    let expiration = new Date();
    if(food!="greenx") expiration.setDate(expiration.getDate()+7);
    else expiration = new Date(Date.now()+20*1000);
    harvests[container][1] = expiration;
    let cookie_end = new Date();
    cookie_end.setDate(expiration.getDate()+993);
    document.cookie = 'h_data=' + JSON.stringify(harvests) + "; expires=" + cookie_end + "; path=/;";
    
    document.location.href="/growgetters-app";
}
