import { IProduct } from "../interfaces";
import { formatPrice, txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  IsOpenEdit: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  IsOpenEdit,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: IProps) => {
  const { colors } = product;
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  const onEdit = () => {
    setProductToEdit(product);
    IsOpenEdit();
    setProductToEditIdx(idx);
  };
  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };
  return (
    <div className="border mx-auto max-w-sm md:max-w-lg md:mx-0 rounded-md  p-2 flex flex-col">
      <Image
        imageURL={product.imageURL}
        alt={"product Name"}
        className="rounded-md mb-2 lg:object-cover h-60 w-full"
      />
      <h3>{product.title}</h3>
      <p>{txtSlicer(product.description)}</p>
      <div className="flex items-center my-4 space-x-2">
        {colors.length === 0 ? (
          <p className="text-gray-500">No colors</p>
        ) : (
          renderProductColors
        )}
      </div>

      <div className="flex items-center justify-between">
        <span>{formatPrice(product.price)}</span>
        <div className="flex items-center space-x-2">
          <p>{product.category.name}</p>
          <Image
            imageURL={product.category.imageURL}
            alt={"product Name"}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          width="w-full"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Destroy
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
