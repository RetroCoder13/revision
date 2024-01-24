async function signIn(email,password){
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    var { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if(error){
        document.getElementById('error').innerHTML = "Incorrect username or password"
    } else {
        location.href="../../"
    }
}

async function signUp(){
    username = document.getElementById('username').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    var { data, emailError } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    })
    
    try {
        var { data, error } = await supabaseClient
            .from('users')
            .insert({id:JSON.parse(localStorage.getItem("sb-hxfnilmbkorrzhhnohzp-auth-token"))["user"]["id"], username:username, correct:0, incorrect:0})
        
        location.href="../../"
    } catch {
        document.getElementById('error').innerHTML = "User already exists"
    }
}