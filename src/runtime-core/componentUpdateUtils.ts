export function shouldUpdateComponent(prevChild, nextChild) {
  const { props: prevProps } = prevChild;
  const { props: nextProps } = nextChild;
  for (const key in nextProps) {
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
