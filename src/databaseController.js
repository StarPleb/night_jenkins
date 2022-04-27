export function postState(state){
    // data will contain the name field and the json object
    let data = {
        ...state,
        "token_list": "test123",
        "background_list": "2131241"
    };
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            if(this.status === 400) {
                alert('User does not exist')
            }if(this.status === 200) {
                alert('User\'s gamestate was saved')
            }
        }
    });
    xhr.open("POST", "state");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

export function getState(data){
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    let game_state = {}
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            game_state = this.responseText
            console.log(this.responseText);
            if(this.status === 400) {
                alert('User does not exists')
            }if(this.status === 200) {
                alert('User\'s gamestate was retreived')
            }
        }
    });
    xhr.open("POST", "state/retreive");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let temp = {
        username: data
    }
    xhr.send(temp);
    return (game_state)
}