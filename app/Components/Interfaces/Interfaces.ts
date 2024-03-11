export type ProductProp = {
  id: number;
  title: string;
  price: number;
  description: string;
  innerRef?: React.Ref<HTMLParagraphElement>;
};

export type ProductProps = ProductProp[];
