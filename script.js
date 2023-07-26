const fadeText = () => {
  const text1 = document.querySelector('.text1');
  const text2 = document.querySelector('.text2');
  const wrapper = document.querySelector('.wrapper');

  const fadeIn = () => {
    text1.style.opacity = 0;
    text2.style.opacity = 1;
  };

  const fadeOut = () => {
    text1.style.opacity = 1;
    text2.style.opacity = 0;
  };

  let intervalId = setInterval(() => {
    if (text1.style.opacity === '0') {
      fadeOut();
    } else {
      fadeIn();
    }
  }, 4000);

  text2.addEventListener('mouseover', () => {
    clearInterval(intervalId);
  });

  text2.addEventListener('mouseout', () => {
    intervalId = setInterval(() => {
      if (text1.style.opacity === '0') {
        fadeOut();
      } else {
        fadeIn();
      }
    }, 4000);
  });

  text2.addEventListener('click', () => {
    shakeElement(wrapper);
  });
};

function shakeElement(element) {
  const maxShakes = 3;
  const shakeDuration = 50;
  const shakeDistance = 7;

  let shakes = 0;

  function applyShake() {
    if (shakes < maxShakes) {
      shakes++;
      element.style.transform = `translateX(${shakeDistance}px)`;
      setTimeout(() => {
        element.style.transform = 'translateX(0)';
        setTimeout(applyShake, shakeDuration);
      }, shakeDuration);
    }
  }
  applyShake();
}

document.addEventListener('DOMContentLoaded', fadeText);
