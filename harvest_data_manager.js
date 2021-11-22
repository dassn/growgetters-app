

function resetCookieData(){
    let empty_data = `h_data={"circle": ["", {}], "triangle": ["", {}], "square": ["", {}], "pentagon": ["", {}]}`;
    dt.setDate(dt.getDate()+1000);
    empty_data += " expires=" + dt + "; path=/;";
    document.cookie=empty_data;
}

let data = document.cookie.split('; ').find(row => row.startsWith('h_data='));
if(typeof data=='undefined'){
    resetCookieData();
    data = document.cookie.split('; ').find(row => row.startsWith('h_data='));
}
data = data.split('=')[1];

console.log(data);

try{
    harvests = JSON.parse(data);
}
catch(error){
    resetCookieData();    
    harvests = JSON.parse(document.cookie);
}

let shapes = ['circle', 'triangle', 'square', 'pentagon'];
for(let shp of shapes){
    if(harvests[shp][0]!=""){
        let exp_date = new Date(Date.parse(harvests[shp][1]));
        let days_left = (exp_date - (new Date()))/1000/60/60/24;
        let info_string = "";
        if(days_left>0) info_string = "Contains " + harvests[shp][0] + " and will expire in " + days_left.toFixed(1) + " days";
        else info_string = "Your " + harvests[shp][0] + " has expired!";
        let elem = document.getElementById(shp+"-info")
        elem.innerText = info_string;
        elem.parentElement.setAttribute("href", "/growgetters-app/empty_container.html?shape="+shp);
        if(days_left<=0){
            elem.parentElement.style.backgroundColor = "#dcafc8";
        }
    }
    else{
        document.getElementById(shp+"-info").innerText = "This container is empty";
    }
}
