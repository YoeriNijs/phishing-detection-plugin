function getRandomNumber(): number {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

const btnEl: HTMLButtonElement = document.querySelector('button');
if (btnEl) {
  btnEl.addEventListener('click', () => {
    const code = getRandomNumber(); // We need a better solution to make it more unattractive to unblock the page
    const answer = prompt(
      `Type the following code to whitelist the current webpage: ${code}`
    );
    if (`${answer}` === `${code}`) {
      alert('Not implemented yet!');
    } else {
      alert('Invalid code. Try again.');
    }
  });
}
