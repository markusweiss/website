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

const repoOwner = 'markusweiss';
const repoName = 'website';
const readmePath = 'README.md';

const readmeUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${readmePath}`;

async function getReadme() {
  try {
    const response = await fetch(readmeUrl);

    if (!response.ok) {
      throw new Error('Unable to fetch README.md file.');
    }

    const readmeContent = await response.text();
    return readmeContent;
  } catch (error) {
    console.error('Error fetching README.md:', error);
    return null;
  }
}

function convertToHtml(markdownText) {
  return marked(markdownText);
}
async function displayReadmeAsHtml() {
  const readmeContent = await getReadme();
  if (readmeContent) {
    const htmlContent = convertToHtml(readmeContent);
    const readmeContainer = document.getElementById('readme-container');
    readmeContainer.innerHTML = htmlContent;
  }
}

document.addEventListener('DOMContentLoaded', displayReadmeAsHtml);

document.addEventListener('DOMContentLoaded', fadeText);
