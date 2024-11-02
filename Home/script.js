function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if (parts.length == 2) return parts.pop().split(';').shift();
    return null;
}

const roleValue = getCookie("role");

switch(roleValue){
    case "patient":
        document.getElementById("item3").classList.add("hidden");
        document.getElementById("item6").classList.add("hidden");
        break;
    case "doctor":
        document.getElementById("item2").classList.add("hidden");
        document.getElementById("item4").classList.add("hidden");
        document.getElementById("item5").classList.add("hidden");
        break;
    default:
        document.getElementById("item2").classList.add("hidden");
        document.getElementById("item3").classList.add("hidden");
        document.getElementById("item6").classList.add("hidden");
}