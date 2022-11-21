
export type PageRoute = {
  path: string;
  element: React.ReactNode;
  title: string;
  children?: PageRoute[];
};
