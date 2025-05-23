import classNames from "classnames";
import ErrorBoundary from "../error-boundary";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AppContainer({ children, className }: ContainerProps) {
  const cn = classNames(
		"px-5 lg:px-5 py-5 md:max-w-4xl lg:max-w-6xl",
		className
	);
  return (
    <div className={cn}>
      <ErrorBoundary> {children}</ErrorBoundary>
    </div>
  );
}
