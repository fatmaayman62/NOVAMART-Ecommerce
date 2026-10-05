import React, { useEffect } from "react";
import useTokenStore from "../Store/authTokenStore";
import useCartStore from "../Store/cartStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmOrders } from "../Services/DataServices";
import toast from "react-hot-toast";

// FIX 1: Changed `z` to `zod` and replaced deprecated `.nonempty()` with `.min(1)`
const schema = zod.object({
  details: zod.string().min(1, "Is Required"),
  phone: zod
    .string()
    .min(1, "Is Required")
    .regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  city: zod.string().min(1, "Is Required"),
});

function Cart() {
  const tokenAuth = useTokenStore((state) => state.token);
  const cart = useCartStore((state) => state.cart) || []; // Added fallback to prevent reduce errors
  const setCart = useCartStore((state) => state.setCart) || []; // Added fallback to prevent reduce errors
  const cartId = useCartStore((state) => state.cartId);
  const removeCart = useCartStore((state) => state.removeCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCart = useCartStore((state) => state.updateCart);
  const { isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  }); 

  async function confirmOrder(values) {
    console.log(cartId)
    const res = await confirmOrders(cartId, tokenAuth, values);
    if(res.status === "success"){
       onClose();
       toast.success('Order send successfully');
       setCart([]);
       window.location.href=res.session.url;
    }
    console.log(res);
  }

  // Calculate total price dynamically
  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <div className="py-8 font-sans">
      {/* Header & Clear All Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-blue-200 pb-4 gap-4">
        <h2 className="text-2xl font-bold text-blue-900">
          Shopping Cart ({cart.length} {cart.length === 1 ? "Item" : "Items"})
        </h2>
        {cart.length > 0 && (
          <button
            onClick={async () => await removeCart(tokenAuth)}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition-colors"
          >
            Remove All Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-8 rounded-xl text-center font-medium">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Products List */}
          <div className="space-y-4">
            {cart.map((item) => {
              const productItem = item.product;
              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow gap-4"
                >
                  {/* Product Image & Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={productItem.imageCover}
                      alt={productItem.title}
                      className="w-20 h-20 object-cover rounded-lg border border-blue-200"
                    />
                    <div>
                      <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
                        {productItem.brand?.name} - {productItem.category?.name}
                      </span>
                      <h3 className="text-lg font-bold text-blue-900 mt-0.5">
                        {productItem.title}
                      </h3>
                      <div className="text-sm font-semibold text-blue-600 mt-1">
                        {item.price} EGP
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-blue-100">
                    <div className="flex items-center border border-blue-300 rounded-lg overflow-hidden bg-blue-50/50">
                      <button
                        onClick={async () =>
                          await updateCart(
                            item.product._id,
                            item.count - 1,
                            tokenAuth
                          )
                        }
                        className="px-3 py-1 text-blue-600 hover:bg-blue-500 hover:text-white font-bold cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 text-sm font-bold text-blue-900">
                        {item.count}
                      </span>
                      <button
                        onClick={async () =>
                          await updateCart(
                            item.product._id,
                            item.count + 1,
                            tokenAuth
                          )
                        }
                        className="px-3 py-1 text-blue-600 hover:bg-blue-500 hover:text-white font-bold cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={async () =>
                        await removeFromCart(item.product._id, tokenAuth)
                      }
                      className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary Card */}
          <div className="bg-blue-500 text-white rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
            <div>
              <h4 className="font-bold text-lg">Cart Summary</h4>
              <p className="text-xs text-blue-100">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs text-blue-100 block">
                  Total Price:
                </span>
                <span className="text-2xl font-black">
                  {totalCartPrice} EGP
                </span>
              </div>
              <Button
                onPress={onOpen}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-6 py-2.5 rounded-lg shadow transition-colors"
              >
                Checkout
              </Button>

              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    // FIX 3: Wrapped inputs in a form to handle submission properly
                    <form
                      onSubmit={handleSubmit((values) => {
                        confirmOrder(values);
                        // Closes modal ONLY if validation passes
                      })}
                    >
                      <ModalHeader className="flex flex-col gap-1 font-bold text-blue-900">
                        Add Shipping Address
                      </ModalHeader>

                      <ModalBody className="gap-4">
                        <Input
                          label="Details of Title"
                          placeholder="Enter street or apartment details"
                          type="text"
                          variant="bordered"
                          {...register("details")}
                          isInvalid={Boolean(errors.details)}
                          // FIX 2: Added optional chaining (?) to prevent crash
                          errorMessage={errors.details?.message} 
                        />
                        <Input
                          label="Phone"
                          placeholder="Enter phone number"
                          type="tel"
                          variant="bordered"
                          {...register("phone")}
                          isInvalid={Boolean(errors.phone)}
                          errorMessage={errors.phone?.message}
                        />
                        <Input
                          label="City"
                          placeholder="Enter city"
                          type="text"
                          variant="bordered"
                          {...register("city")}
                          isInvalid={Boolean(errors.city)}
                          errorMessage={errors.city?.message}
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" type="submit">
                          Send Order
                        </Button>
                      </ModalFooter>
                    </form>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;