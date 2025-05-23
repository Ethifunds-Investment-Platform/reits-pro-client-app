import * as React from "react";
import classnames from "classnames";

type MaximumProps = {
  children?: any
  className?: string
}
export default React.memo(function Maximum({ children, className }: MaximumProps) {
  const maximum = classnames("flex flex-col flex-1", className);
  return (
    <div className={maximum}>
      {children}
    </div>
  )
});


