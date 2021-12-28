class Stopwatch {
  constructor(selector) {
    this.selector = document.querySelector(selector);
    this.interval = null;
    this.#init();
    this.#clickHandler();
    this.time = {
      minutes: 0,
      seconds: 0,
    };
  }

  // Инициализация блока секндомера в DOM-дереве
  #init() {
    this.stopwatch = document.createElement('div');
    this.stopwatch.classList.add('cg-stopwatch');
    this.stopwatch.innerHTML = getTemplate();
    this.selector.append(this.stopwatch);
  }

  // Запустить секундомер
  startTimer() {
    this.interval = setInterval(() => {
      if (this.time.seconds === 59) {
        this.time.seconds = 0;
        this.time.minutes += 1;
      } else {
        this.time.seconds += 1;
      }
      this.#setTimer();
    }, 1000);
  }

  // Остановить секундомер
  stopTimer() {
    clearInterval(this.interval);
  }

  // Сбросить секундомер
  resetTimer() {
    clearInterval(this.interval);
    this.time.minutes = 0;
    this.time.seconds = 0;
    this.#setTimer();
  }

  // Записать в span новое значение
  #setTimer() {
    this.stopwatch.querySelector('span').innerText = `${this.#getStringTime()}`;
  }

  // Получить строковую запись времени
  #getStringTime() {
    let stringTime = `${this.time.minutes < 10 ? '0' + this.time.minutes.toString() : this.time.minutes}:${
      this.time.seconds < 10 ? '0' + this.time.seconds.toString() : this.time.seconds
    }`;
    return stringTime;
  }

  // Обработчики событий
  #clickHandler() {
    this.stopwatch.querySelector('[data-stopwatch="start"]').addEventListener('click', (e) => {
      this.startTimer();
    });

    this.stopwatch.querySelector('[data-stopwatch="stop"]').addEventListener('click', (e) => {
      this.stopTimer();
    });

    this.stopwatch.querySelector('[data-stopwatch="reset"]').addEventListener('click', (e) => {
      this.resetTimer();
    });
  }
}

// HTML-шаблон секундомера
function getTemplate() {
  return `
    <div class="cg-stopwatch__top"><span>00:00<span></div>
    <div class="cg-stopwatch__buttons">
      <button type="button" class="cg-stopwatch__btn" data-stopwatch="start">Start</button>
      <button type="button" class="cg-stopwatch__btn" data-stopwatch="stop">Stop</button>
      <button type="button" class="cg-stopwatch__btn" data-stopwatch="reset">Reset</button>
    </div>
  `;
}

export { Stopwatch };
