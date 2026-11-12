'use strict';

const room = document.getElementById('room');
const handle = document.getElementById('stringHandle');
const cordPath = document.getElementById('cordPath');
const dustMotes = document.getElementById('dustMotes');
const loginForm = document.getElementById('loginForm');
const loginGate = document.getElementById('loginGate');
const lampCaption = document.getElementById('lampCaption');
const pullHelp = document.getElementById('pullHelp');
const formMessage = document.getElementById('formMessage');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const forgotPasswordButton = document.getElementById('forgotPassword');

let isOn = false;
let isDragging = false;
let startX = 0;
let startY = 0;
let dragX = 0;
let dragY = 0;

const PULL_THRESHOLD = 54;
const MAX_PULL_DISTANCE = 155;

function setLamp(on) {
  isOn = Boolean(on);
  room.classList.toggle('is-on', isOn);
  handle.setAttribute('aria-pressed', String(isOn));
  handle.setAttribute(
    'aria-label',
    isOn
      ? 'Pull the lamp cord down to switch off the lamp'
      : 'Pull the lamp cord down to switch on the lamp'
  );

  // Keep the hidden sign-in form out of the keyboard and screen-reader flow.
  loginForm.inert = !isOn;
  loginForm.setAttribute('aria-hidden', String(!isOn));
  loginGate.setAttribute('aria-hidden', String(isOn));

  lampCaption.textContent = isOn
    ? 'The light is on. Your sign-in is ready.'
    : 'A calmer start is just one pull away.';
  pullHelp.textContent = isOn
    ? 'Pull the lamp cord down again to switch off the lamp. Press Enter or Space to toggle it.'
    : 'Pull the lamp cord down to switch on the lamp and reveal the sign-in form. Press Enter or Space to toggle it.';

  if (isOn) {
    createDustMotes();
  } else {
    dustMotes.replaceChildren();
  }
}

function updateCord(x, y) {
  const endX = 12 + (x * 0.28);
  const controlX = 14 + (x * 0.16);
  const controlY = 45 + (y * 0.36);
  cordPath.setAttribute('d', `M 12 0 Q ${controlX} ${controlY} ${endX} ${100 + y}`);
}

function resetHandle() {
  handle.style.transform = 'translate(0px, 0px)';
  updateCord(0, 0);
  dragX = 0;
  dragY = 0;
}

function startPull(event) {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) {
    return;
  }

  event.preventDefault();
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  dragX = 0;
  dragY = 0;
  handle.classList.add('dragging');

  try {
    handle.setPointerCapture(event.pointerId);
  } catch (error) {
    // Pointer capture is a convenience; the interaction still works without it.
  }
}

function movePull(event) {
  if (!isDragging) return;

  dragX = Math.max(-30, Math.min(30, (event.clientX - startX) * 0.25));
  dragY = Math.max(0, Math.min(MAX_PULL_DISTANCE, event.clientY - startY));

  handle.style.transform = `translate(${dragX}px, ${dragY}px)`;
  updateCord(dragX, dragY);
}

function finishPull(event, shouldToggle) {
  if (!isDragging) return;

  const completedPull = shouldToggle && dragY >= PULL_THRESHOLD;
  isDragging = false;
  handle.classList.remove('dragging');
  resetHandle();

  if (completedPull) {
    setLamp(!isOn);
  }

  if (event && handle.hasPointerCapture?.(event.pointerId)) {
    try {
      handle.releasePointerCapture(event.pointerId);
    } catch (error) {
      // The browser may already have released the pointer.
    }
  }
}

handle.addEventListener('pointerdown', startPull);
handle.addEventListener('pointermove', movePull);
handle.addEventListener('pointerup', (event) => finishPull(event, true));
handle.addEventListener('pointercancel', (event) => finishPull(event, false));

// Native button activation gives keyboard and assistive-technology users an
// equivalent way to operate the pull cord. Pointer users must physically drag.
handle.addEventListener('click', (event) => {
  if (event.detail === 0) {
    setLamp(!isOn);
  }
});

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createDustMotes() {
  dustMotes.replaceChildren();
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 13; index += 1) {
    const mote = document.createElement('span');
    mote.className = 'dust-mote';
    mote.style.left = `${randomBetween(15, 85)}%`;
    mote.style.top = `${randomBetween(34, 83)}%`;
    mote.style.setProperty('--mote-size', `${randomBetween(2, 5)}px`);
    mote.style.setProperty('--mote-duration', `${randomBetween(6, 11)}s`);
    mote.style.setProperty('--mote-delay', `${randomBetween(0, 5)}s`);
    mote.style.setProperty('--mote-drift', `${randomBetween(-24, 24)}px`);
    fragment.appendChild(mote);
  }

  dustMotes.appendChild(fragment);
}

function showFormMessage(message) {
  formMessage.textContent = message;
  formMessage.classList.add('is-visible');
}

passwordToggle.addEventListener('click', () => {
  const shouldShow = passwordInput.type === 'password';
  passwordInput.type = shouldShow ? 'text' : 'password';
  passwordToggle.setAttribute('aria-pressed', String(shouldShow));
  passwordToggle.setAttribute('aria-label', shouldShow ? 'Hide password' : 'Show password');
});

forgotPasswordButton.addEventListener('click', () => {
  showFormMessage('Password reset is not connected in this front-end demo yet.');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showFormMessage('The interface is ready, but real sign-in needs to be connected to an authentication service.');
});

document.querySelectorAll('[data-provider]').forEach((button) => {
  button.addEventListener('click', () => {
    const provider = button.dataset.provider;
    showFormMessage(`${provider} sign-in is a visual placeholder until its authentication flow is connected.`);
  });
});

setLamp(false);
