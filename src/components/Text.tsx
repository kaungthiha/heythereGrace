import { Fragment } from 'react';

const TODO = /(\[KT:[^\]]*\])/g;

export const isPlaceholder = (text: string | undefined | null) => !!text && text.includes('[KT:');

/**
 * Renders content copy. Any "[KT: …]" inside it is shown as a highlighted TODO note so missing
 * content is impossible to miss (run `npm run todo` to list them all).
 */
export function T({ children }: { children?: string | null }) {
  if (!children) return null;
  if (!children.includes('[KT:')) return <>{children}</>;
  return (
    <>
      {children.split(TODO).map((part, i) =>
        part.startsWith('[KT:') ? (
          <span key={i} className="todo">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
