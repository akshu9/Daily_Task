const checkboxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const progress = document.querySelector('.progress-bar');
const progressLabel = document.querySelector('.progress-label');
const progressValue = document.querySelector('.progress-value');

const allGoals = JSON.parse(localStorage.getItem('AllGoals')) || {};


const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Wow! You just completed all the goals, time for chill :D',
]

// Initialize goals if not present in local storage
inputFields.forEach((input) => {
  if (!allGoals[input.id]) {
    allGoals[input.id] = { name: input.value || '', completed: false };
  }
});

let completedGoalsCount = Object.values(allGoals).filter(goal => goal.completed).length;
progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText= `${completedGoalsCount}/${inputFields.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]


checkboxList.forEach((element) => {
  element.addEventListener('click', (e) => {
    const allFieldsFilled = [...inputFields].every(input => input.value.trim());

    if (allFieldsFilled) {
      element.parentElement.classList.toggle('completed');
      const inputID = element.nextElementSibling.id;
      allGoals[inputID].completed = !allGoals[inputID].completed;

      // Recalculate completed goals count and update progress bar
      completedGoalsCount = Object.values(allGoals).filter(goal => goal.completed).length;
      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText= `${completedGoalsCount}/${inputFields.length} completed`
      progressLabel.innerText = allQuotes[completedGoalsCount]

      localStorage.setItem('AllGoals', JSON.stringify(allGoals));
    } else {
      errorLabel.parentElement.classList.add('show-error');
    }
  });
});

inputFields.forEach((ele) => {
  ele.value = allGoals[ele.id].name;
  if (allGoals[ele.id].completed) {
    ele.parentElement.classList.add('completed');
  }

  ele.addEventListener('focus', (e) => {
    errorLabel.parentElement.classList.remove('show-error');
  });

  ele.addEventListener('input', (e) => {
    if(allGoals[ele.id].completed){
      ele.value=allGoals[ele.id].name
      return
    }
    allGoals[ele.id].name = ele.value;
    if (!ele.value.trim()) {
      allGoals[ele.id].completed = false; // Unmark as completed if input is cleared
    }
    localStorage.setItem('AllGoals', JSON.stringify(allGoals));
  });
});
