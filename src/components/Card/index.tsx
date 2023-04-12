import { h, type ComponentChildren } from 'preact';

type CardProps = {
  key: string;
  testId: string;
  children: ComponentChildren;
};

function Card({ key, testId, children }: CardProps) {
  return (
    <div key={key} data-testid={testId}>
      {children}
    </div>
  );
}

export default Card;
