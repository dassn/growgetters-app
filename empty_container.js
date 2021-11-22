let harvests = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('h_data=')).split('=')[1]);

function goToHome(){
    window.location.href = "/growgetters-app";
}

function emptyContainer(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let container = urlParams.get('shape');

    harvests[container][0]="";
    harvests[container][1]={};
    document.cookie = 'h_data=' + JSON.stringify(harvests);

    goToHome();
}
