import { ProductProp } from './Interfaces/Interfaces';

const Product = ({ title, description, price, innerRef }: ProductProp) => {
  return (
    <div className="flex flex-col justify-between m-8 p-4 h-40 border-gray-600 border rounded-lg">
      <div className="" ref={innerRef}>
        {title}
      </div>
      <div className="">{description}</div>
      <div className="">${price}</div>
    </div>
  );
};

export default Product;
