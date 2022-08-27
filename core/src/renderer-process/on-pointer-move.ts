const HOVERED_CLASS = 'hoveredSyno';

export default (event: PointerEvent): void => {
  document.querySelectorAll(`.${HOVERED_CLASS}`).forEach(syno => {
    syno.classList.remove(HOVERED_CLASS);
  });

  if (
    event.target instanceof Element
    && event.target.classList.contains('syno')
  ) {
    event.target.classList.add(HOVERED_CLASS);
  }
};
