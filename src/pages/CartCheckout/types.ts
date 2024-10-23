import { CartData } from "../../slices/types";

interface CartItemProps {
    product: CartData, 
    setSubtotal: React.Dispatch<React.SetStateAction<number>>, 
    setShipping: React.Dispatch<React.SetStateAction<number>>, 
    handleRemove: (arg0: HandleRemoveArgs) => void
}

interface CartProps {
    cart: CartData[],
    subtotal: number,
    shipping: number,
    setSubtotal: React.Dispatch<React.SetStateAction<number>>, 
    setShipping: React.Dispatch<React.SetStateAction<number>>, 
    handleRemove: (args: HandleRemoveArgs) => void
}

interface CheckoutProps {
    cart: CartData[], 
    setCart: React.Dispatch<React.SetStateAction<CartData[]>>,
    subtotal: number, 
    shipping: number
}

interface FormData {
    "First Name": string,
    "Last Name": string,
    "Country / Region": string,
    "Company Name"?: string,
    "Street Address": string,
    "Apt, suite, unit"?: string,
    "City": string,
    "State": string,
    "Postal Code": string,
    "Phone": string
}

interface FormInputs {
    type: string,
    placeholder: string,
    required: boolean,
    options?: string[]
}

interface HandleRemoveArgs {
    event: React.MouseEvent, 
    product: CartData, 
    itemSubtotal: number, 
    itemShipping: number
}

interface InputProps {
    disabled: string[],
    name: string,
    label: string,
    type: string, 
    placeholder: string, 
    required: boolean, 
    setFormData: React.Dispatch<React.SetStateAction<FormData>>, 
    setDisabled: React.Dispatch<React.SetStateAction<string[]>>
}

interface OrderData {
    id: string,
    formData: FormData,
    clothes: CartData[],
    totalSum: string,
    orderDate: string,
    deliveryDate: string,
    orderStatus: string,
    paymentMethod: string
}

export type { CartItemProps, CartProps, CheckoutProps, FormData, FormInputs, InputProps, HandleRemoveArgs, OrderData };