import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import { Select } from "./components/ui/Select";
import { ProductName } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  function openEdit() {
    setIsOpenEdit(true);
  }

  function closeEdit() {
    setIsOpenEdit(false);
  }
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  function onChangeHundler(e: ChangeEvent<HTMLInputElement>) {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }
  function onChangeEditHundler(e: ChangeEvent<HTMLInputElement>) {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  const renderProductList = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      IsOpenEdit={openEdit}
      idx={index}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[1px] text-sm font-medium text-gray-700"
      >
        {input.Label}
      </label>
      <Input
        type="text"
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={onChangeHundler}
      />

      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((c) => c !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((c) => c !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
        setErrors((prev) => ({ ...prev, colors: "" }));
      }}
    />
  ));

  const renderProdctEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[1px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          name={name}
          id={id}
          value={productToEdit[name]}
          onChange={onChangeEditHundler}
        />

        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price,
      colors: tempColors,
    });
    const hasErrorMsg =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price,
      colors: productToEdit.colors.concat(tempColors),
    });

    const hasErrorMsg =
      Object.values(errors).some((val) => val === "") &&
      Object.values(errors).every((val) => val === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };

    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEdit();
    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    close();
  };
  console.log("productList:", productList);

  return (
    <main className="container mx-auto">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto mt-10 px-10 font-medium"
        onClick={open}
        width="w-fit"
      >
        Add New Product
      </Button>
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md ">
        {renderProductList}
      </div>
      <MyModal isOpen={isOpen} close={close} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputs}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex items-center my-4 space-x-2">
            {renderProductColors}
          </div>

          <div className="flex items-center my-4 space-x-2">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <ErrorMessage msg={errors.colors} />

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 ">Submit</Button>
            <Button className="bg-gray-700 " onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>

      <MyModal isOpen={isOpenEdit} close={closeEdit} title="Edit Product">
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProdctEditWithErrorMsg("title", "Product Title", "title")}
          {renderProdctEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProdctEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProdctEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center flex-wrap space-x-1">
            {renderProductColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 text-xs rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 ">Submit</Button>
            <Button className="bg-gray-700 " onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>

      <MyModal
        isOpen={isOpenConfirmModal}
        close={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Confirm
          </Button>
          <Button
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </MyModal>

      <Toaster />
    </main>
  );
}

export default App;

//sm=> md=> lg => xl
