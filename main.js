const questions = [
	{
		question: "Сколько сотрудников ЕЦПП надо чтобы закрутить лампочку?",
		answers: ["один оператор битрикса", "этот вопрос надо эскалировать выше", "А зачем?", "два, оператор и координатор"],
		correct: 2,
	},
	{
		question: "Когда на обед?",
		answers: [
			"После планерки",
			"После общего собрания",
			"Что такое обед?",
			"Хто я?!",
		],
		correct: 4,
	},
	{
		question: "Чем занимается группа финансы?",
		answers: [
			"Формируют сверку и контролят ПДЗ клиентов",
			"Продают риобу и грунт",
			"Выращивают цветы и создают фото зону из шариков!",
			"Хто я?",
		],
		correct: 3,
	},
	{
		question: "Кто такой Мартин Шумахер",
		answers: ["Наш вождь и отец НаЦИИИ", "Гонщик формулы 1", "Он вроде семечки делает", "Спасибо метро за это"],
		correct: 2,
	},
];

//находим элементы
const headerContainer = document.querySelector ('#header');
const listContainer = document.querySelector ('#list');
const submitBtn = document.querySelector ('#submit');

//Переменные игры
let score = 0; // количесто правильных ответов 
let questionIndex = 0; //текущий вопрос 

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer;
//Метод innerHTML возвращает нам вложенный элемент, мы очищаем разметку таким образом
function clearPage () {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}
//функция рендер вопроса 
function showQuestion () {
//questionIndex- переменная, она идет без ковычек, question - строка 
//вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`; 
  
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
  
  headerContainer.innerHTML = title;
  
  //варианты ответов
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    
    const questionTemplate = 
    `<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
      
    let answerHTML = questionTemplate
    												.replace('%answer%', answerText)
                            .replace('%number%', answerNumber); 
    
    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

//кнопка

function checkAnswer() {
	console.log("start");
  //находим выбранную радио кнопку
	const checkedRadio = listContainer.querySelector('input:checked');
  	console.log(checkedRadio);
    //Если ответ не выбран- выход из функции
    if (!checkedRadio) {
    submitBtn.blur();
    return
    }
    //parseInt перевод строку в число
    //узнаем номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value)
    
    //Если ответ верен, увеличиваем счет
   console.log(questions[questionIndex] ['correct']);
    
    if (userAnswer == questions[questionIndex] ['correct']) {
    	score++
    }
    console.log("score =", score);
    //проверка последний вопрос или нет. Если не последний- очищаем страницу и выводим следующий вопрос
    if (questionIndex !== questions.length - 1) {
    	console.log("это не последний вопрос");
      questionIndex++;
      clearPage();
      showQuestion();
      return;
    } else {
    	console.log("это не последний вопрос");
      clearPage();
      showResults();
    }
    
}
// функция выводит результаты викторины
function showResults () {
	console.log ("showResults started");
  console.log(score);
  //Вводим переменную в которую записан код html
  const resultsTemplate = `
  		<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
      `;
      
  let title, message;
  //Варианты заголовков и текста
  if (score === questions.length) {
  	title = 'Поздравляем!';
    message = 'Вы ответили верно на все вопросы!';
  } else if ((score * 100) / questions.length >= 50) {
  	title = 'Неплохой результат';
    message = 'Меньше половины правильных ответов'
  
  } else {
  	title = "стоит постараться";
    message = "Пока у вас меньше половины правильных ответов";
  }
  // результат
 let result = `${score} из ${questions.length}`;
 
 //формируем финальный ответ 
 const finalMessage = resultsTemplate
 								.replace('%title%', title)
                .replace('%message%', message)
                .replace('%result%', result)
 console.log(finalMessage);
                
 headerContainer.innerHTML = finalMessage;
 
 //меняем кнопку на "Играть снова"
 submitBtn.blur();
 submitBtn.innerText = "играть заново";
 submitBtn.onclick = () => history.go();
                
}

