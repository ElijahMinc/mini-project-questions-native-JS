// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkPe78rZmv81FnSqp1bnghDfIaCKTdofo

export const authModalAuthorization = () => {
   return `
   <form class="mui-form" id="form-auth">
      <div class="mui-textfield mui-textfield--float-label">
         <input type="email" id="input-email" required">
         <label for="input-email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
         <input type="password" id="input-password" required>
         <label for="input-password">Password</label>
      </div>
      <button type="submit" class="mui-btn mui-btn--primary" id="btn-auth">Войти</button>
   </form>
   `
}


export const authFetchEmailAndPassword = (email, password) => {
   return fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkPe78rZmv81FnSqp1bnghDfIaCKTdofo', {
      method: 'POST',
      body: JSON.stringify({
         email, password,
         returnSecureToken: true
      }),
      headers: {
         'Content-type': 'application/json'
      }
   })
      .then(response => response.json())
      .then(response => response.idToken)
}