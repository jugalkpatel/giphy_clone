import { useEffect, useRef, useState } from "react";
function useIntersect() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.5,
    });

    const currentNode = containerRef.current;

    if (currentNode) observer.observe(currentNode);

    return () => {
      if (currentNode) observer.disconnect();
    };
  }, [containerRef]);

  return [containerRef, isVisible] as const;
}

export { useIntersect };
