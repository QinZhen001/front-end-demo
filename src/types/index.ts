export type PageRoute = {
  path?: string;
  element: React.ReactNode
  title: string;
  hidden?: boolean;
  index?: boolean;
  children?: PageRoute[];
};
