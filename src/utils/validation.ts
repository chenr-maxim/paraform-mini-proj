export const validateField = (
  name: string,
  value: string | File | null
): string | null => {
  switch (name) {
    case "firstName":
      if (!value || value.toString().trim() === "") {
        return "This field is required.";
      }
    case "lastName":
      if (!value || value.toString().trim() === "") {
        return "This field is required.";
      }
      break;
    case "email":
      if (!value || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toString())) {
        return "Please enter a valid email address.";
      }
      break;
    case "phoneNumber":
      if (value && !/^[0-9]{10}$/.test(value.toString())) {
        return "Please enter a valid 10-digit phone number.";
      }
      break;
    default:
      break;
  }

  return null;
};
