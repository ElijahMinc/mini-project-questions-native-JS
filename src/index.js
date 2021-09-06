import './style.css';
import { isValid, createModal } from './utils';
import { Question } from './question';
import { authModalAuthorization, authFetchEmailAndPassword } from './auth'



const form = document.querySelector('#form-question')
const input = form.querySelector('#input-question')
const submitBtn = form.querySelector('#btn-question')
const openModalBtn = document.querySelector("#open-modal-btn")
const attentionModal = document.querySelector('#attention-modal')
const questionBlock = document.querySelector('#question-block')

window.addEventListener('DOMContentLoaded', () => {
   questionBlock.innerHTML = `<h1>Авторизируйтесь, чтобы посмотреть все актуальные вопросы</h1>`
})

form.addEventListener('submit', formSubmitHandler)
input.addEventListener('input', (event) => {
   submitBtn.disabled = !isValid(event.target.value) ? true : false // если length меньше 10 ? true : false
})
openModalBtn.addEventListener('click', openModal)

function formSubmitHandler(event) {
   event.preventDefault();

   if (isValid(input.value)) {

      submitBtn.disabled = true

      //async function
      Question.createQuestion(input.value)
         .then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
            createAttentionModalWhenSendMessage(true)
         })
   }
}

function openModal() {
   createModal('Авторизация', authModalAuthorization())

   document.querySelector('#form-auth')
      .addEventListener('submit', authorization, { once: true })
}

function authorization(event) {
   event.preventDefault();

   const email = event.target.querySelector('#input-email').value
   const password = event.target.querySelector('#input-password').value

   authFetchEmailAndPassword(email, password)
      .then(Question.fetch)
      .then(questions => {
         document.querySelector('.modal').remove()
         document.querySelector('#mui-overlay').remove()
         if (!questions || questions === undefined) {
            console.log(typeof questions)
            return questionBlock.innerHTML = "Вопросов пока нет"
         }
         console.log(questions)
         questionBlock.innerHTML = questions.map((q, index) => {
            return toCard({ q, index })
         })
            .join(' ')
      })
}

function createAttentionModalWhenSendMessage(statusRequest) {
   let status = ``

   if (statusRequest) {
      status = 'Вопрос отправлен!'
   } else {
      status = 'Произошла ошибка'
   }

   attentionModal.innerHTML = status
   attentionModal.classList.add('show')

   setTimeout(() => {
      attentionModal.classList.remove('show')
   }, 2000)
}


function toCard(content) {
   return `
   <div class="question-block__item">
      <h2 class="mui--text-headline">Question № ${content.index + 1}</h2>
      <h4 class="mui--text-black-54">
         1 week ago
      </h4>
      <p>
      ${content.q}
      </p>
   </div>
   `
}