import type {PropsWithChildren} from "react";

function PageLayout({ children }:PropsWithChildren) {
  return (
		<main className="mt-20 mr-20 p-4">
			{children}
		</main>
  );
}

export default PageLayout;