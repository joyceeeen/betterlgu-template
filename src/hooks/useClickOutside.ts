import { useEffect, type RefObject } from 'react';

/**
 * Hook that detects clicks outside of specified elements and calls the handler.
 * @param refs - Array of refs to elements that should not trigger the handler
 * @param handler - Callback function to call when clicking outside
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  handler: () => void,
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target = event.target as Node;
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(target),
      );

      if (isOutside) {
        handler();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [refs, handler]);
}
