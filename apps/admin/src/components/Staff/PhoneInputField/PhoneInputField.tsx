import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

interface PhoneInputFieldProps {
  phoneNumberFieldName: string;
  phonePrefixFieldName: string;
}

const PhoneInputField: FC<PhoneInputFieldProps> = ({
  phoneNumberFieldName,
  phonePrefixFieldName,
}) => {
  const { setValue, watch } = useFormContext();

  const phoneNumberValue = watch(phoneNumberFieldName);
  const phonePrefixValue = watch(phonePrefixFieldName);

  return (
    <>
      <FormItem>
        <FormLabel>Phone Number</FormLabel>
        <FormControl>
          {/* <Input placeholder="+973 12345678" {...field} /> */}
          <PhoneInput
            placeholder="Placeholder"
            defaultCountry="BH"
            // onChange={ (value) =>{value.}}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};

export default PhoneInputField;
