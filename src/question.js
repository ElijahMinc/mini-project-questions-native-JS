//https://mini-project-practice-default-rtdb.firebaseio.com/questions.json

export class Question {
   static createQuestion(question) {
      return fetch('https://mini-project-practice-default-rtdb.firebaseio.com/questions.json', {
         method: 'POST',
         body: JSON.stringify(question),
         headers: {
            'Content-type': 'application/json'
         }
      })
         .then(response => response.json())
   }

   static fetch(token) {
      console.log(token)
      if (!token) {
         return Promise.resolve('<p> У вас нет токена!</p>')
      }
      return fetch(`https://mini-project-practice-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
         .then(response => response.json())
         .then(response => {
            if (response === null || response.error) {
               return '<h2>Список пока что пуст</h2>'
            }
            console.log(Object.keys(response).map(id => {
               return response[id]
            }))
            return response
               ?
               Object.keys(response).map(id => {
                  return response[id]
               })
               :
               []
         })
   }
}