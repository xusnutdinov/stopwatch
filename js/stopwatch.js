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

  #init() {
    this.stopwatch = document.createElement('div');
    this.stopwatch.classList.add('cg-stopwatch');
    this.stopwatch.innerHTML = getTemplate();

    this.selector.append(this.stopwatch);
  }

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

  stopTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    // TODO: reset timer
    clearInterval(this.interval);
    this.time.minutes = 0;
    this.time.seconds = 0;
    this.#setTimer();
  }

  #setTimer() {
    let stringTime = `${this.time.minutes < 10 ? '0' + this.time.minutes.toString() : this.time.minutes}:${
      this.time.seconds < 10 ? '0' + this.time.seconds.toString() : this.time.seconds
    }`;
    this.stopwatch.querySelector('span').innerText = `${stringTime}`;
  }

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
